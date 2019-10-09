import React, { useState, useEffect } from 'react';

import './Autocomplete.scss';

import Autosuggest from 'react-autosuggest';

const Autocomplete = ({ placeholder, label, options = [], field = '', onSelect, clear, afterClear, disabled }) => {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const getSuggestions = (val) => {
    const escapedValue = val.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    if (escapedValue === '') {
      return [];
    }

    const regex = new RegExp(`^${escapedValue}`, 'i');

    return options.filter(language => regex.test(language[field]));
  };

  const onChange = (event, sla) => {
    setValue(sla.newValue);
  };

  const inputProps = { placeholder, value, onChange, disabled };

  useEffect(() => {
    if (clear) {
      setValue('');
      afterClear();
    }
  }, [clear, afterClear]);

  return (
    <div className="autocomplete-wrapper">
      <span className="label">
        {label}
      </span>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={e => setSuggestions(getSuggestions(e.value))}
        onSuggestionsClearRequested={() => setSuggestions([])}
        getSuggestionValue={suggestion => suggestion[field]}
        renderSuggestion={suggestion => <span>{suggestion[field]}</span>}
        inputProps={inputProps}
        onSuggestionSelected={onSelect}
        disabled={disabled}
      />
    </div>
  );
};

export default Autocomplete;

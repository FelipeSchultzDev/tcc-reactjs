import React from 'react';

import './LoadButton.scss';

const Button = ({ title, background, loading }) => (
  <button className={`LoadButton ${loading ? 'loading' : ''}`} type="submit" style={{ backgroundColor: background }}>
    {!loading && title}
    {loading && <div className="spinner" />}
  </button>
);

export default Button;

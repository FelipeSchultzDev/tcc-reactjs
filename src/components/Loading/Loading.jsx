import React from 'react';
import Loader from 'react-loader-spinner';

import './Loading.scss';

const loader = (state) => {
  if (state === true) {
    return (
      <div className="loading-wrapper">
        <div className="loading">
          <Loader type="Triangle" color="#6FCF97" height={200} width={200} />
        </div>
      </div>
    );
  }
  return <div />;
};

export default loader;

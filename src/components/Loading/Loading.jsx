import React from 'react';

import './Loading.css';
import loading from '../../Assets/giphy.gif';

export default function Loading() {
  return (
    <div className="loading-container">
      <div className="loading-content">
        <img src={loading} alt="" />
      </div>
    </div>
  );
}

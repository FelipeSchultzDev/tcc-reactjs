import React from 'react';

import './Label.scss';

const Label = ({ children }) => (
  <div className="label-detail">
    <span>
      {children}
    </span>
  </div>
);

export default Label;

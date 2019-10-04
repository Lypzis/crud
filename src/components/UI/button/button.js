import React from 'react';

import './button.css';

const button = props => (
    <button {...props}>{props.children}</button>
);

export default button;
import React from 'react';
import './Button.css';

const Button = ({ className, value, onClick }) => {
  return (
    <button className={`button ${className}`} onClick={() => onClick(value)}>
      {value}
    </button>
  );
};

export default Button;

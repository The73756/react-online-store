import styles from './Input.module.scss';

import React from 'react';

const Input = ({ value, onChange, placeholder, required, type, unFocused, ...props }) => {
  return (
    <input
      {...props}
      type={type || 'text'}
      className={`${styles.root} ${unFocused ? styles.unFocused : ''}`}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required || false}
    />
  );
};

export default Input;

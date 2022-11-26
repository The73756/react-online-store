import styles from './Textarea.module.scss';

import React from 'react';

const Textarea = ({
  value,
  onChange,
  placeholder,
  required,
  type,
  resize,
  unFocused,
  ...props
}) => {
  const classesMap = {
    vertical: styles.vertical,
    horizontal: styles.horizontal,
    none: styles.none,
  };
  return (
    <textarea
      {...props}
      className={`${styles.root} ${unFocused ? styles.unFocused : ''} ${classesMap[resize]}`}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required || false}
    />
  );
};

export default Textarea;

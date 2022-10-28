import styles from './Button.module.scss';

const Button = ({
  children,
  onClick,
  disabled = false,
  variant = 'outline', // outline / primary / secondary
  className = '',
  hover = true,
  padding = '10px 20px',
}) => {
  const classesMap = {
    outline: styles.outline,
    primary: styles.primary,
    secondary: styles.secondary,
  };

  return (
    <button
      style={{ padding: padding }}
      className={`${styles.btn} ${className} ${disabled ? styles.disabled : ''} ${
        !hover ? styles.unHovered : ''
      } ${classesMap[variant]}`}
      onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;

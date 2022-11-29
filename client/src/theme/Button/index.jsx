import styles from './Button.module.scss';

const Button = ({
  children,
  onClick,
  disabled = false,
  variant = 'outline', // outline / primary / secondary
  className = '',
  hover = true,
  type = 'button',
  active = false,
  isLoading = false,
  ...props
}) => {
  const classesMap = {
    outline: styles.outline,
    primary: styles.primary,
    secondary: styles.secondary,
    danger: styles.danger,
    success: styles.success,
  };

  return (
    <button
      {...props}
      type={type}
      className={`${styles.root} ${className} ${disabled ? styles.disabled : ''} ${
        !hover ? styles.unHovered : ''
      } ${classesMap[variant]} ${active ? styles.active : ''} ${isLoading ? styles.loading : ''}`}
      onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;

import styles from './Button.module.css';

function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  fullWidth = false,
  loading = false,
  width,
  style,
  type = 'button',
  className = '',
  ...rest
}) {
  const buttonClass = [
    styles.button,
    styles[variant],
    styles[size],
    className,
    fullWidth ? styles.fullWidth : '',
  ]
    .filter((item) => Boolean(item))
    .join(' ');

  const combinedStyle = {
    ...(width ? { width } : {}),
    ...style,
  };

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={type}
      className={buttonClass}
      style={combinedStyle}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;

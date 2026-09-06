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

  const handleClick = (e) => {
    if (disabled || loading) {
      e.preventDefault();
      return;
    }
    onClick?.(e);
  };

  return (
    <button
      disabled={disabled || loading}
      onClick={handleClick}
      type={type}
      className={buttonClass}
      style={combinedStyle}
      {...rest}
    >
      {loading ? <span className={styles.spinner}>...</span> : children}
    </button>
  );
}

export default Button;

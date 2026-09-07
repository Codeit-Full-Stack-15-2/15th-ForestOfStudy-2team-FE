import { BeatLoader } from 'react-spinners';
import styles from './BaseButton.module.css';

function BaseButton({
  children,
  onClick,
  variant = 'primary', // primary, outline, text, textGray
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
      {loading ? (
        <BeatLoader
          size={8}
          color={variant === 'primary' ? '#ffffff' : '#99c08e'}
        />
      ) : (
        children
      )}
    </button>
  );
}

export default BaseButton;

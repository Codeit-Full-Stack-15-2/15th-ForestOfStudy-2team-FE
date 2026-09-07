import { useState } from 'react';
import visibilityOn from '@/assets/ic_visibility_on.svg';
import visibilityOff from '@/assets/ic_visibility_off.svg';
import styles from '@/components/PasswordInput.module.css';

function PasswordInput({ placeholder, value, onChange, error }) {
  const [isVisible, setIsVisible] = useState(false);
  const handleToggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <div className={styles.wrapper}>
      <div className={error ? styles.inputBoxError : styles.inputBox}>
        <input
          className={styles.input}
          type={isVisible ? 'text' : 'password'}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />

        <button
          className={styles.visibilityButton}
          type="button"
          onClick={handleToggleVisibility}
        >
          <img
            className={styles.visibilityIcon}
            src={isVisible ? visibilityOff : visibilityOn}
            alt=""
          />
        </button>
      </div>

      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
}

export default PasswordInput;

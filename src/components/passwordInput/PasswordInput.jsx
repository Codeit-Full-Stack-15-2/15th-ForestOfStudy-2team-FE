import { useEffect, useRef, useState } from 'react';
import visibilityOn from '@/assets/common/ic_visibility_on.svg';
import visibilityOff from '@/assets/common/ic_visibility_off.svg';
import styles from './PasswordInput.module.css';

function PasswordInput({
  id,
  label = '비밀번호',
  placeholder,
  value,
  onChange,
  onKeyDown,
  error,
  isFocus = false,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const passwordInputRef = useRef(null);
  const handleToggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  const isTypingInvalid = Boolean(value && value.length < 4);

  const displayError =
    error || (isTypingInvalid ? '*비밀번호는 4자 이상 입력해 주세요.' : '');

  const hasError = Boolean(displayError);

  useEffect(() => {
    if (isFocus && passwordInputRef.current) {
      passwordInputRef.current.focus();
    }
  }, [isFocus]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.fieldGroup}>
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>

        <div
          className={`${styles.inputBox} ${hasError ? styles.inputBoxError : ''}`}
        >
          <input
            ref={passwordInputRef}
            id={id}
            className={styles.input}
            type={isVisible ? 'text' : 'password'}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
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
      </div>

      {hasError && <p className={styles.errorMessage}>{displayError}</p>}
    </div>
  );
}

export default PasswordInput;

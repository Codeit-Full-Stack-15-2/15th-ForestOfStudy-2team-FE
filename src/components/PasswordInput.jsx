import visibilityOff from '@/assets/btn_visibility_off.svg';
import visibilityOn from '@/assets/btn_visibility_on.svg';
import { useEffect, useRef, useState } from 'react';
import styles from './PasswordInput.module.css';

function PasswordInput({
  isFocus = true,
  value,
  onChange,
  onKeyDown,
  errorMessage,
  id = 'studyPassword',
}) {
  const [showPassword, setShowPassword] = useState(false);
  const passwordInputRef = useRef(null);

  const isTypingInvalid = Boolean(value && value.length < 4);

  const displayError =
    errorMessage ||
    (isTypingInvalid ? '*비밀번호는 4자 이상 입력해주세요.' : '');
  const hasError = Boolean(displayError);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  useEffect(() => {
    if (isFocus && passwordInputRef.current) {
      passwordInputRef.current.focus();
    }
  }, [isFocus]);

  return (
    <div className={styles.container}>
      <label htmlFor={id}>비밀번호</label>
      <div className={styles.inputContainer}>
        <input
          ref={passwordInputRef}
          id={id}
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder="비밀번호를 입력해 주세요"
          className={hasError ? styles.errorBorder : ''}
        />
        <button
          type="button"
          onClick={handleTogglePassword}
          className={styles.visibilityBtn}
        >
          <img src={showPassword ? visibilityOff : visibilityOn} />
        </button>
      </div>
      {hasError && <p className={styles.errorMessage}>{displayError}</p>}
    </div>
  );
}

export default PasswordInput;

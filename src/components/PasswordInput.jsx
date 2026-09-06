import styles from './PasswordInput.module.css';

function PasswordInput() {
  return (
    <div className={styles.container}>
      <label htmlFor="studyPassword">비밀번호</label>
      <input id="studyPassword" placeholder="비밀번호를 입력해 주세요" />
    </div>
  );
}

export default PasswordInput;

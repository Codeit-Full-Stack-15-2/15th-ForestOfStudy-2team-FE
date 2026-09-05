import Button from './Button';
import styles from './PasswordVerificationModal.module.css';

function PasswordVerificationModal() {
  return (
    <div className={styles.container}>
      <div className={styles.modalContainer}>
        <div className={styles.modalHeader}>
          <p className={styles.title}>연우의 개발공장</p>
          <p className={styles.description}>권한이 필요해요!</p>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.inputContainer}>
            <label htmlFor="studyPassword">비밀번호</label>
            <input id="studyPassword" placeholder="비밀번호를 입력해 주세요" />
          </div>
        </div>
        <div className={styles.modalFooter}>
          <Button fullWidth={true}>수정하러 가기</Button>
          <div className={styles.textButtonContainer}>
            <Button variant="text" size="small">
              나가기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PasswordVerificationModal;

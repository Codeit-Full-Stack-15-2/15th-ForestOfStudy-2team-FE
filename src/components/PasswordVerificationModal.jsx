import Button from './Button';
import styles from './PasswordVerificationModal.module.css';

function PasswordVerificationModal({
  open = true,
  title,
  description,
  onOk,
  onCancel,
}) {
  if (!open) return null;

  return (
    <div className={styles.container}>
      <div className={styles.modalContainer}>
        <div className={styles.modalHeader}>
          <p className={styles.title}>{title}</p>
          <p className={styles.description}>{description}</p>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.inputContainer}>
            <label htmlFor="studyPassword">비밀번호</label>
            <input id="studyPassword" placeholder="비밀번호를 입력해 주세요" />
          </div>
        </div>
        <div className={styles.modalFooter}>
          <Button onClick={onOk} fullWidth={true}>
            수정하러 가기
          </Button>
          <div className={styles.textButtonContainer}>
            <Button onClick={onCancel} variant="text" size="small">
              나가기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PasswordVerificationModal;

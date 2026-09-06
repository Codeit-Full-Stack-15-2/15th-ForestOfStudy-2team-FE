import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import Button from './Button';
import styles from './PasswordVerificationModal.module.css';

function PasswordVerificationModal({
  open = false,
  title,
  description,
  okText = '확인',
  onOk,
  onCancel,
}) {
  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div className={styles.dimOverlay} onClick={onCancel}>
      <div
        className={styles.modalContainer}
        onClick={(e) => e.stopPropagation()}
      >
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
            {okText}
          </Button>
          <div className={styles.textButtonContainer}>
            <Button onClick={onCancel} variant="text" size="small">
              나가기
            </Button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default PasswordVerificationModal;

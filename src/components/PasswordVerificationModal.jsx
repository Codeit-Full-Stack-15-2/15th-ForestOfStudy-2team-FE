import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Button from './Button';
import PasswordInput from './PasswordInput';
import styles from './PasswordVerificationModal.module.css';

function PasswordVerificationModal({
  open = false,
  title,
  description,
  okText = '확인',
  onOk,
  onCancel,
}) {
  const [password, setPassword] = useState('');
  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleOnkeyDownPassword = () => {
    onOk();
  };

  if (!open) return null;

  return createPortal(
    <div className={styles.dimOverlay} onClick={onCancel}>
      <div
        className={styles.modalContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          <p className={styles.title}>{title}</p>
          <p className={styles.description}>{description}</p>
        </div>
        <div className={styles.body}>
          <PasswordInput
            value={password}
            onChange={handleChangePassword}
            onKeyDown={handleOnkeyDownPassword}
          />
        </div>
        <div className={styles.footer}>
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

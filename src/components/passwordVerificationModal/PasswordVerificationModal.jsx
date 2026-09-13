import BaseButton from '@/components/baseButton/BaseButton';
import PasswordInput from '@/components/passwordInput/PasswordInput';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './PasswordVerificationModal.module.css';

function PasswordVerificationModal({
  open = false,
  title,
  description,
  okText = '확인',
  onOk,
  modalButtonLoading,
  onCancel,
}) {
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const modalRef = useRef(null);

  const handleOnCancelModal = useCallback(() => {
    onCancel();
    setPassword('');
    setErrorMessage('');
  }, [onCancel]);

  useEffect(() => {
    if (!open) return;
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleOnCancelModal();
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [open, handleOnCancelModal]);

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
    if (errorMessage) {
      setErrorMessage('');
    }
  };

  const handleConfirm = () => {
    if (!password.trim()) {
      setErrorMessage('*비밀번호를 입력해 주세요.');
      return;
    }

    if (password.length < 4) {
      setErrorMessage('*비밀번호는 4자 이상 입력해 주세요.');
      return;
    }

    setErrorMessage('');
    onOk(password);
  };

  if (!open) return null;

  return createPortal(
    <div className={styles.dimOverlay}>
      <div ref={modalRef} className={styles.modalContainer}>
        <div className={styles.header}>
          <p className={styles.title}>{title}</p>
          <p className={styles.description}>{description}</p>
        </div>
        <div className={styles.body}>
          <PasswordInput
            value={password}
            placeholder="비밀번호를 입력해 주세요"
            error={errorMessage}
            onChange={handleChangePassword}
            onKeyDown={(event) => event.key === 'Enter' && handleConfirm()}
          />
        </div>
        <div className={styles.footer}>
          <BaseButton
            onClick={handleConfirm}
            fullWidth={true}
            loading={modalButtonLoading}
          >
            {okText}
          </BaseButton>
          <div className={styles.textButtonContainer}>
            <BaseButton
              onClick={handleOnCancelModal}
              variant="text"
              size="none"
            >
              나가기
            </BaseButton>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default PasswordVerificationModal;

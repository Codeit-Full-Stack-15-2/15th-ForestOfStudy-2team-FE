import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import BaseButton from '@/components/baseButton/BaseButton';
import styles from './ConfirmModal.module.css';

function ConfirmModal({
  open = false,
  title,
  description,
  cancelText = '취소',
  confirmText = '확인',
  onCancel,
  onConfirm,
  loading = false,
}) {
  const modalRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onCancel();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [open, onCancel]);

  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  if (!open) {
    return null;
  }

  return createPortal(
    <div className={styles.dimOverlay}>
      <div ref={modalRef} className={styles.modalContainer}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.description}>{description}</p>
        </div>

        <div className={styles.buttonArea}>
          <BaseButton
            type="button"
            variant="outline"
            onClick={onCancel}
            fullWidth
          >
            {cancelText}
          </BaseButton>

          <BaseButton
            type="button"
            onClick={onConfirm}
            loading={loading}
            fullWidth
          >
            {confirmText}
          </BaseButton>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default ConfirmModal;

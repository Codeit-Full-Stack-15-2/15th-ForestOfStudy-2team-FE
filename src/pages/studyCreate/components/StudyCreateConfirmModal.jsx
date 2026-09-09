import BaseButton from '@/components/baseButton/BaseButton';
import styles from './StudyCreateConfirmModal.module.css';

function StudyCreateConfirmModal({ open, onCancel, onConfirm }) {
  if (!open) {
    return null;
  }

  return (
    <div className={styles.dimOverlay}>
      <div className={styles.modalContainer}>
        <div className={styles.header}>
          <h2 className={styles.title}>비밀번호를 꼭 기억해 주세요.</h2>
          <p className={styles.description}>비밀번호는 변경할 수 없습니다.</p>
        </div>

        <div className={styles.buttonArea}>
          <BaseButton
            type="button"
            variant="outline"
            onClick={onCancel}
            fullWidth
          >
            취소
          </BaseButton>

          <BaseButton type="button" onClick={onConfirm} fullWidth>
            확인
          </BaseButton>
        </div>
      </div>
    </div>
  );
}

export default StudyCreateConfirmModal;

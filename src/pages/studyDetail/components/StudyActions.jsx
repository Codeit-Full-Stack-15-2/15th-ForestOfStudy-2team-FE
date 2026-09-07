import BaseButton from '@/components/baseButton/BaseButton';
import styles from './StudyActions.module.css';

function StudyActions({ onShare, onEdit, onRemove }) {
  return (
    <div className={styles.container}>
      <BaseButton variant="text" size="none" onClick={onShare}>
        공유하기
      </BaseButton>
      |
      <BaseButton variant="text" size="none" onClick={onEdit}>
        수정하기
      </BaseButton>
      |
      <BaseButton variant="textGray" size="none" onClick={onRemove}>
        스터디 삭제하기
      </BaseButton>
    </div>
  );
}

export default StudyActions;

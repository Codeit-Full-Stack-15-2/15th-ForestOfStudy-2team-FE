import Button from '@/components/Button';
import styles from './StudyActions.module.css';

function StudyActions({ onShare, onEdit, onRemove }) {
  return (
    <div className={styles.container}>
      <Button variant="text" size="none" onClick={onShare}>
        공유하기
      </Button>
      |
      <Button variant="text" size="none" onClick={onEdit}>
        수정하기
      </Button>
      |
      <Button variant="textGray" size="none" onClick={onRemove}>
        스터디 삭제하기
      </Button>
    </div>
  );
}

export default StudyActions;

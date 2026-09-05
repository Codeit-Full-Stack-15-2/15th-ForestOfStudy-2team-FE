import styles from './StudyActions.module.css';

function StudyActions({ onShare, onEdit, onRemove }) {
  return (
    <div className={styles.container}>
      <button onClick={onShare}>공유하기</button>|
      <button onClick={onEdit}>수정하기</button>|
      <button onClick={onRemove}>스터디 삭제하기</button>
    </div>
  );
}

export default StudyActions;

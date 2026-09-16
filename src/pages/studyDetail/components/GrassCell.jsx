import styles from './GrassCell.module.css';

function GrassCell({ date, record }) {
  const isCompleted = Boolean(record);
  const statusText = isCompleted ? '달성' : '미달성';
  const tooltipText = `${date}: ${statusText}`;

  return (
    <div
      data-tooltip={tooltipText}
      className={`${styles.grassCell} ${
        isCompleted ? styles.completed : styles.uncompleted
      }`}
    >
      <span className={styles.srOnly}>{tooltipText}</span>{' '}
    </div>
  );
}

export default GrassCell;

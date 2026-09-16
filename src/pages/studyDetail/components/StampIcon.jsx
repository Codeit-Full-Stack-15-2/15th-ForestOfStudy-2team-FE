import icnActive from '@/assets/studyDetailPage/subtract_active.svg';
import icnDefault from '@/assets/studyDetailPage/subtract_default.svg';
import styles from './StampIcon.module.css';

function StampIcon({ date, habitId, record, onClick }) {
  const isCompleted = Boolean(record);
  return (
    <div className={styles.container}>
      {isCompleted ? (
        <img
          onClick={() => onClick({ habitId, date })}
          src={icnActive}
          alt="습관 달성 이미지"
        />
      ) : (
        <img
          onClick={() => onClick({ habitId, date })}
          src={icnDefault}
          alt="습관 미달성 이미지"
        />
      )}
    </div>
  );
}

export default StampIcon;

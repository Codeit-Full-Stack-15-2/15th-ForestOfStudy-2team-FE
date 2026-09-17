import icnActive from '@/assets/studyDetailPage/subtract_active.svg';
import icnDefault from '@/assets/studyDetailPage/subtract_default.svg';
import dayjs from '@/utils/dayjs';
import styles from './StampIcon.module.css';

function StampIcon({ date, habitStatus, habitId, record, onClick }) {
  const isCompleted = Boolean(record);
  const isDeletedHabit = Boolean(habitStatus);

  const targetDate = dayjs(date);
  const today = dayjs().startOf('day');
  const isSameOrAfter =
    targetDate.isSame(today, 'day') || targetDate.isAfter(today, 'day');

  const showActive = isCompleted;
  const hideDefaultIcon = isDeletedHabit && isSameOrAfter;
  const handleClick = () => onClick({ habitId, date });

  return (
    <div className={styles.container}>
      {showActive ? (
        <img onClick={handleClick} src={icnActive} alt="습관 달성 이미지" />
      ) : hideDefaultIcon ? null : (
        <img onClick={handleClick} src={icnDefault} alt="습관 미달성 이미지" />
      )}
    </div>
  );
}

export default StampIcon;

import icPoint from '@/assets/common/ic_point.svg';
import styles from './PointBadge.module.css';
import clsx from 'clsx';

function PointBadge({ points = 0, label = '현재까지 획득한 포인트', className = '' }) {
  const formattedPoints = Number(points).toLocaleString();

  return (
    <div className={clsx(styles.pointContainer, className)}>
      {label && <p className={styles.label}>{label}</p>}
      <div className={styles.pointAmount}>
        <img src={icPoint} alt="포인트 아이콘" className={styles.pointIcon} />
        <span>{formattedPoints}P 획득</span>
      </div>
    </div>
  );
}

export default PointBadge;
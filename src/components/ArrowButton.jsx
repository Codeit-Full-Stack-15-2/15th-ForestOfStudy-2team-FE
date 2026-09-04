import arrowAright from '@/assets/ic_arrow_right.svg';
import styles from '@/components/ArrowButton.module.css';
import { Link } from 'react-router';

function ArrowButton({ children, onClick, ...props }) {
  if (props.to) {
    return (
      <Link className={styles.arrowButton} to={props.to}>
        <span>{children}</span>
        <img src={arrowAright} alt="우측 화살표 아이콘" />
      </Link>
    );
  }
  return (
    <button className={styles.arrowButton} onClick={onClick} {...props}>
      <span>{children}</span>
      <img src={arrowAright} alt="우측 화살표 아이콘" />
    </button>
  );
}

export default ArrowButton;

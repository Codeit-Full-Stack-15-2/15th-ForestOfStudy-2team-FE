import { Link } from 'react-router';
import styles from './Home.module.css';

function Home() {
  return (
    <div className={styles.test_class} style={{ fontFamily: 'JejuStoneWall' }}>
      홈<Link to="study-detail">스터디 페이지</Link>
    </div>
  );
}

export default Home;

import logo from '@/assets/logo.svg';
import styles from '@/components/GlobalHeader.module.css';
import { Link, useNavigate } from 'react-router';

function GlobalHeader() {
  const navigate = useNavigate();

  const handleMakeStudy = () => {
    //  TODO: 스터디 만들기 페이지 경로 필요
    navigate('/');
  };

  return (
    <nav className={styles.container}>
      <div className={styles.wrapper}>
        <Link to="/">
          <img src={logo} />
        </Link>
        <button onClick={handleMakeStudy}>
          <span>스터디 만들기</span>
        </button>
      </div>
    </nav>
  );
}

export default GlobalHeader;

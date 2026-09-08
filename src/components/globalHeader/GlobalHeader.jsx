import logo from '@/assets/common/logo.svg';
import styles from './GlobalHeader.module.css';
import { Link, useLocation, useNavigate } from 'react-router';

function GlobalHeader() {
  const navigate = useNavigate();
  const path = useLocation();

  const handleMakeStudy = () => {
    //  TODO: 스터디 만들기 페이지 경로 필요
    navigate('/studies/new');
  };
  return (
    <nav className={styles.container}>
      <div className={styles.wrapper}>
        <Link to="/">
          <img src={logo} />
        </Link>
        {path.pathname === '/' && (
          <button onClick={handleMakeStudy}>
            <span>스터디 만들기</span>
          </button>
        )}
      </div>
    </nav>
  );
}

export default GlobalHeader;

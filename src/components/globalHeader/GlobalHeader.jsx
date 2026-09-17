import logo from '@/assets/common/logo.svg';
import { Link, useLocation, useNavigate } from 'react-router';
import styles from './GlobalHeader.module.css';

function GlobalHeader() {
  const navigate = useNavigate();
  const path = useLocation();

  const handleMakeStudy = () => {
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

import searchIcon from '../../assets/search.svg';
import styles from './Home.module.css';

function Home() {
  return (
    <main className={styles.home}>
      <section className={styles.recentStudies}>
        <h2 className={styles.sectionTitle}>최근 조회한 스터디</h2>

        <ul className={styles.recentStudyList}>
          <li>스터디 카드</li>
        </ul>
      </section>

      <section className={styles.studyBrowse}>
        <h2 className={styles.sectionTitle}>스터디 둘러보기</h2>

        <div className={styles.studyControls}>
          <div className={styles.searchBox}>
            <img src={searchIcon} alt="" />
            <input
              className={styles.searchInput}
              type="search"
              placeholder="검색"
              aria-label="스터디 검색"
            />
          </div>
          <select className={styles.sortSelect} aria-label="스터디 정렬">
            <option value="recent">최근 순</option>
            <option value="oldest">오래된 순</option>
            <option value="highPoint">많은 포인트 순</option>
            <option value="lowPoint">작은 포인트 순</option>
          </select>
        </div>

        <ul className={styles.studyList}>
          <li className={styles.studyCard}>
            <article className={styles.cardContent}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>이유디의 UX 스터디</h3>
                <span className={styles.pointBadge}>🌿 310P 획득</span>
              </div>

              <p className={styles.studyProcess}>62일째 진행 중</p>
              <p className={styles.studyDescription}>
                Slow And Steady Wins The Race!!
              </p>

              <div className={styles.reactions}>
                <span>🧑🏻 37</span>
                <span>🔥 26</span>
                <span>🤍 14</span>
              </div>
            </article>
          </li>
        </ul>
      </section>
    </main>
  );
}

export default Home;

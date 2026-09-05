import searchIcon from '../../assets/search.svg';
import styles from './Home.module.css';
import StudyCard from '@/components/StudyCard/StudyCard';

const studies = [
  {
    id: 1,
    title: '이유디의 UX 스터디',
    point: 310,
    days: 62,
    description: 'Slow And Steady Wins The Race!!',
    participants: 37,
    focusCount: 26,
    likes: 14,
  },
  {
    id: 2,
    title: '프론트엔드 개발 스터디',
    point: 420,
    days: 31,
    description: '매일 조금씩 꾸준히 공부합니다',
    participants: 24,
    focusCount: 18,
    likes: 9,
  },
    {
    id: 3,
    title: '알고리즘 문제 풀이',
    point: 250,
    days: 45,
    description: '하루 한 문제씩 해결해요!',
    participants: 19,
    focusCount: 22,
    likes: 11,
  }
];

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
          {studies.map((study) => {
            return (
              <StudyCard
                key={study.id}
                title={study.title}
                point={study.point}
                days={study.days}
                description={study.description}
                participants={study.participants}
                focusCount={study.focusCount}
                likes={study.likes}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Home;

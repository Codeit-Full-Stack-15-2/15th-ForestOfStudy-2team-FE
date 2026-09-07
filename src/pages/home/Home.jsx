import { useState } from 'react';
import searchIcon from '@/assets/homePage/search.svg';
import styles from './Home.module.css';
import StudyCard from '@/pages/home/components/studyCard/StudyCard';
import studyCardBg from '@/assets/homePage/study-card-bg.webp';
import BaseButton from '@/components/baseButton/BaseButton';

const sortOptions = [
  { value: 'recent', label: '최근 순' },
  { value: 'oldedst', label: '오래된 순' },
  { value: 'highPoint', label: '많은 포인트 순' },
  { value: 'lowPoint', label: '작은 포인트 순' },
];

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
    variant: 'image',
    image: studyCardBg,
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
    variant: 'green',
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
    variant: 'yellow',
  },
  {
    id: 4,
    title: '이유디의 UX 스터디',
    point: 310,
    days: 62,
    description: 'Slow And Steady Wins The Race!!',
    participants: 37,
    focusCount: 26,
    likes: 14,
    variant: 'image',
    image: studyCardBg,
  },
  {
    id: 5,
    title: '프론트엔드 개발 스터디',
    point: 420,
    days: 31,
    description: '매일 조금씩 꾸준히 공부합니다',
    participants: 24,
    focusCount: 18,
    likes: 9,
    variant: 'green',
  },
  {
    id: 6,
    title: '알고리즘 문제 풀이',
    point: 250,
    days: 45,
    description: '하루 한 문제씩 해결해요!',
    participants: 19,
    focusCount: 22,
    likes: 11,
    variant: 'yellow',
  },
];

function Home() {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortValue, setSortValue] = useState('recent');
  const selectedSort = sortOptions.find((option) => option.value === sortValue);

  return (
    <main className={styles.home}>
      <section className={styles.recentStudies}>
        <h2 className={styles.sectionTitle}>최근 조회한 스터디</h2>

        <ul className={styles.recentStudyList}>
          {studies.slice(0, 3).map((study) => {
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
                variant={study.variant}
                image={study.image}
              />
            );
          })}
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
          <div className={styles.sortDropdown}>
            <button
              type="button"
              className={styles.sortButton}
              onClick={() => setIsSortOpen((prev) => !prev)}
              aria-expanded={isSortOpen}
              aria-label="스터디 정렬"
            >
              {selectedSort.label}

              <span
                className={`${styles.sortArrow} ${
                  isSortOpen ? styles.sortArrowOpen : ''
                }`}
                aria-hidden="true"
              />
            </button>

            {isSortOpen && (
              <ul className={styles.sortMenu}>
                {sortOptions.map((option) => (
                  <li key={option.value}>
                    <button
                      type="button"
                      className={styles.sortOption}
                      onClick={() => {
                        setSortValue(option.value);
                        setIsSortOpen(false);
                      }}
                    >
                      {option.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
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
                variant={study.variant}
                image={study.image}
              />
            );
          })}
        </ul>
        <BaseButton
          variant="outline"
          size="none"
          width="260px"
          className={styles.loadMoreButton}
        >
          더보기
        </BaseButton>
      </section>
    </main>
  );
}

export default Home;

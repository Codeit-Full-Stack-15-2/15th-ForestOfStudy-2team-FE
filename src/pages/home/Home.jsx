import { useState, useEffect } from 'react';
import searchIcon from '@/assets/homePage/search.svg';
import styles from './Home.module.css';
import StudyCard from '@/pages/home/components/studyCard/StudyCard';
import BaseButton from '@/components/baseButton/BaseButton';
import { getStudies } from '@/api/studyApi';

const sortOptions = [
  { value: 'latest', label: '최근 순' },
  { value: 'oldest', label: '오래된 순' },
  { value: 'highPoints', label: '많은 포인트 순' },
  { value: 'lowPoints', label: '작은 포인트 순' },
];

function Home() {
  const [studies, setStudies] = useState([]);

  const [sortValue, setSortValue] = useState('latest');
  const [searchValue, setSearchValue] = useState('');

  // 디바운스 구현
  const [debouncedSearchValue, setDebouncedSearchValue] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchValue(searchValue);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchValue]);

  useEffect(() => {
    const fetchStudies = async () => {
      const data = await getStudies({
        keyword: debouncedSearchValue,
        orderBy: sortValue,
      });
      setStudies(data.list);
    };

    fetchStudies();
  }, [debouncedSearchValue, sortValue]);

  // 최근 조회한 스터디 localStorage 활용해서 저장, 표시 구현
  const handleStudyClick = (studyId) => {
    const savedRecentStudies = localStorage.getItem('recentStudies');

    const parsedRecentStudies = savedRecentStudies
      ? JSON.parse(savedRecentStudies)
      : [];

    const recentStudyIds = [
      studyId,
      ...parsedRecentStudies.filter((id) => id !== studyId),
    ].slice(0, 3);

    localStorage.setItem('recentStudies', JSON.stringify(recentStudyIds));
  };

  const savedRecentStudyIds = localStorage.getItem('recentStudies');

  const recentStudyIds = savedRecentStudyIds
    ? JSON.parse(savedRecentStudyIds)
    : [];

  const recentStudies = recentStudyIds
    .map((id) => studies.find((study) => study.id === id))
    .filter(Boolean);

  // 정렬 버튼 커스텀 드롭다운 구현
  const [isSortOpen, setIsSortOpen] = useState(false);
  const selectedSort = sortOptions.find((option) => option.value === sortValue);

  // 더보기 버튼 기능 구현
  const [visibleCount, setVisibleCount] = useState(6);
  const visibleStudies = studies.slice(0, visibleCount);
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  return (
    <main className={styles.home}>
      <section className={styles.recentStudies}>
        <h2 className={styles.sectionTitle}>최근 조회한 스터디</h2>

        <ul className={styles.recentStudyList}>
          {recentStudies.map((study) => {
            return (
              <StudyCard
                key={study.id}
                id={study.id}
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
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
                setVisibleCount(6);
              }}
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
                        setVisibleCount(6);
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
          {visibleStudies.map((study) => {
            return (
              <StudyCard
                key={study.id}
                id={study.id}
                title={study.title}
                point={study.point}
                days={study.days}
                description={study.description}
                participants={study.participants}
                focusCount={study.focusCount}
                likes={study.likes}
                variant={study.variant}
                image={study.image}
                onClick={() => handleStudyClick(study.id)}
              />
            );
          })}
        </ul>
        {visibleCount < studies.length && (
          <BaseButton
            variant="outline"
            size="none"
            width="260px"
            className={styles.loadMoreButton}
            onClick={handleLoadMore}
          >
            더보기
          </BaseButton>
        )}
      </section>
    </main>
  );
}

export default Home;

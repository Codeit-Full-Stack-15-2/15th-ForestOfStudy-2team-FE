import { useState, useEffect } from 'react';
import searchIcon from '@/assets/homePage/search.svg';
import styles from './Home.module.css';
import StudyCard from '@/pages/home/components/studyCard/StudyCard';
import BaseButton from '@/components/baseButton/BaseButton';
import { getStudies, getStudyDetail } from '@/api/studyApi';

const sortOptions = [
  { value: 'latest', label: '최근 순' },
  { value: 'oldest', label: '오래된 순' },
  { value: 'highPoints', label: '많은 포인트 순' },
  { value: 'lowPoints', label: '작은 포인트 순' },
];

function Home() {
  const [studies, setStudies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

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
        page,
      });
      setStudies((prevStudies) =>
        page === 1 ? data.list : [...prevStudies, ...data.list],
      );
      setTotalCount(data.totalCount);
    };

    fetchStudies();
  }, [debouncedSearchValue, sortValue, page]);

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

  const [recentStudies, setRecentStudies] = useState([]);

  useEffect(() => {
    const savedRecentStudyIds = localStorage.getItem('recentStudies');

    const recentStudyIds = savedRecentStudyIds
      ? JSON.parse(savedRecentStudyIds)
      : [];

    const fetchRecentStudies = async () => {
      const recentStudyData = await Promise.all(
        recentStudyIds.map((id) => getStudyDetail(id)),
      );

      const formattedRecentStudies = recentStudyData.map((study) => ({
        ...study,
        emoji: study.reactions.map((reaction) => ({
          emoji: reaction.emoji,
          count: reaction.totalCount,
        })),
      }));

      setRecentStudies(formattedRecentStudies);
    };

    fetchRecentStudies();
  }, []);

  // 정렬 버튼 커스텀 드롭다운 구현
  const [isSortOpen, setIsSortOpen] = useState(false);
  const selectedSort = sortOptions.find((option) => option.value === sortValue);

  // 더보기 버튼 기능 구현
  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <main className={styles.home}>
      <section className={styles.recentStudies}>
        <h2 className={styles.sectionTitle}>최근 조회한 스터디</h2>

        {recentStudies.length === 0 ? (
          <p className={styles.emptyMessage}>아직 조회한 스터디가 없어요</p>
        ) : (
          <ul className={styles.recentStudyList}>
            {recentStudies.map((study) => {
              return (
                <StudyCard
                  key={study.id}
                  id={study.id}
                  nickname={study.nickname}
                  title={study.title}
                  point={study.point}
                  createdAt={study.createdAt}
                  description={study.description}
                  emoji={study.emoji}
                  background={study.background}
                />
              );
            })}
          </ul>
        )}
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
                setPage(1);
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
                        setPage(1);
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

        {studies.length === 0 ? (
          <p className={styles.emptyMessage}>
            {searchValue.trim()
              ? '검색 결과가 없어요'
              : '아직 둘러 볼 스터디가 없어요'}
          </p>
        ) : (
          <ul className={styles.studyList}>
            {studies.map((study) => {
              return (
                <StudyCard
                  key={study.id}
                  id={study.id}
                  nickname={study.nickname}
                  title={study.title}
                  point={study.point}
                  createdAt={study.createdAt}
                  description={study.description}
                  emoji={study.emoji}
                  background={study.background}
                  onClick={() => handleStudyClick(study.id)}
                />
              );
            })}
          </ul>
        )}

        {studies.length < totalCount && (
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

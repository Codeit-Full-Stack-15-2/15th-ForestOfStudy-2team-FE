import arrowAright from '@/assets/ic_arrow_right.svg';
import point from '@/assets/ic_point.svg';
import smile from '@/assets/ic_smile.svg';
import styles from '@/pages/studyDetail/StudyDetail.module.css';

function StudyDetailHeader() {
  return (
    <section className={styles.headerContainer}>
      <div className={styles.controllsContainer}>
        <div className={styles.controlls}>
          <button>공유하기</button>| <button>수정하기</button>|
          <button>스터디 삭제하기</button>
        </div>
        <div className={styles.reaction}>
          <div className={styles.badges}>
            <div className={styles.reactionBadge}>
              <span>👩</span> 37
            </div>
            <div className={styles.reactionBadge}>
              <span>👍🏻</span> 50
            </div>
            <div className={styles.reactionBadge}>
              <span>🤩</span> 50
            </div>
            <div className={styles.reactionBadgeMore}>+ 5..</div>
          </div>
          <button className={styles.add}>
            <img src={smile} alt="스마일 아이콘" />
            <span>추가</span>
          </button>
        </div>
      </div>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>연우의 개발공장</h2>
        <div className={styles.titleButtons}>
          <button>
            <span>오늘의 습관</span>
            <img src={arrowAright} alt="우측 화살표 아이콘" />
          </button>
          <button>
            <span>오늘의 집중</span>
            <img src={arrowAright} alt="우측 화살표 아이콘" />
          </button>
        </div>
      </div>
      <div className={styles.descriptionContainer}>
        <p className={styles.label}>소개</p>
        <p className={styles.description}>
          Slow And Steady Wins The Race! 다들 오늘 하루도 화이팅 :)
        </p>
      </div>
      <div className={styles.pointContainer}>
        <p className={styles.label}>현재까지 획득한 포인트</p>
        <div className={styles.badge}>
          <img src={point} alt="포인트 아이콘" />
          <span>310P 획득</span>
        </div>
      </div>
    </section>
  );
}

function StudyDetailBody() {
  return (
    <section className={styles.bodyContainer}>
      <h2 className={styles.title}>습관 기록표</h2>
      {/* <div className={styles.contentDefault}>
        <p>
          아직 습관이 없어요
          <br />
          오늘의 습관에서 습관을 생성해보세요
        </p>
      </div> */}
    </section>
  );
}

function StudyDetail() {
  return (
    <article className={styles.container}>
      <StudyDetailHeader />
      <StudyDetailBody />
    </article>
  );
}
export default StudyDetail;

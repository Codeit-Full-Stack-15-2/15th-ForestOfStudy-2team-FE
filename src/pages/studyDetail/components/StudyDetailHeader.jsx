import point from '@/assets/ic_point.svg';
import ArrowButton from '@/components/ArrowButton';
import PasswordVerificationModal from '@/components/PasswordVerificationModal';
import { useStudyActions } from '../hooks/useStudyActions';
import StudyActions from './StudyActions';
import styles from './StudyDetailHeader.module.css';
import StudyReactions from './StudyReactions';

function StudyDetailHeader({ studyId, data }) {
  const {
    activeModal,
    setActiveModal,
    handleStudyShare,
    handleOpenEditModal,
    handleOpenRemoveModal,
    handleOpenHabitModal,
    handleOpenFocusModal,
  } = useStudyActions();

  return (
    <>
      <section className={styles.headerContainer}>
        <div className={styles.controlsContainer}>
          <div className={styles.controls}>
            <StudyActions
              onShare={handleStudyShare}
              onEdit={handleOpenEditModal}
              onRemove={handleOpenRemoveModal}
            />
          </div>
          <div className={styles.reaction}>
            <StudyReactions studyId={studyId} initialReactions={data.reactions} />
          </div>
        </div>
        <div className={styles.titleContainer}>
          <h2 className={styles.title}>{data.title}</h2>
          <div className={styles.titleButtons}>
            <ArrowButton onClick={handleOpenHabitModal}>
              습관 달성 기록하기
            </ArrowButton>
            <ArrowButton onClick={handleOpenFocusModal}>
              오늘의 집중
            </ArrowButton>
          </div>
        </div>
        <div className={styles.descriptionContainer}>
          <p className={styles.label}>소개</p>
          <p className={styles.description}>{data.description}</p>
        </div>
        <div className={styles.pointContainer}>
          <p className={styles.label}>현재까지 획득한 포인트</p>
          <div className={styles.badge}>
            <img src={point} alt="포인트 아이콘" />
            <span>{data.totalPoints}&nbsp;획득</span>
          </div>
        </div>
      </section>
      <PasswordVerificationModal
        open={Boolean(activeModal)}
        title={data.title}
        description="권한이 필요해요!"
        okText={activeModal?.buttonText}
        onOk={() => activeModal?.onOk()}
        onCancel={() => setActiveModal(null)}
      />
    </>
  );
}

export default StudyDetailHeader;

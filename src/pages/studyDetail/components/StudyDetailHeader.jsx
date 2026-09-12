import ArrowButton from '@/components/arrowButton/ArrowButton';
import ConfirmModal from '@/components/confirmModal/ConfirmModal';
import PasswordVerificationModal from '@/components/passwordVerificationModal/PasswordVerificationModal';
import PointBadge from '@/pages/focusPage/components/PointBadge';
import { useStudyActions } from '../hooks/useStudyActions';
import StudyActions from './StudyActions';
import styles from './StudyDetailHeader.module.css';
import StudyReactions from './StudyReactions';

function StudyDetailHeader({ studyId, data }) {
  const {
    activeModal,
    activeConfirmModal,
    setActiveConfirmModal,
    isConfirmModalButtonLoading,
    isModalButtonLoading,
    setActiveModal,
    handleStudyShare,
    handleOpenEditModal,
    handleOpenRemoveModal,
    handleOpenHabitModal,
    handleOpenFocusModal,
  } = useStudyActions(studyId);

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
            <StudyReactions
              studyId={studyId}
              initialReactions={data.reactions}
            />
          </div>
        </div>
        <div className={styles.titleContainer}>
          <h2 className={styles.title}>{data.title}</h2>
          <div className={styles.titleButtons}>
            <ArrowButton onClick={handleOpenHabitModal}>
              습관 달성 기록하기
            </ArrowButton>
            <ArrowButton onClick={handleOpenFocusModal}>
              오늘의 집중 타이머
            </ArrowButton>
          </div>
        </div>
        <div className={styles.descriptionContainer}>
          <p className={styles.label}>소개</p>
          <p className={styles.description}>{data.description}</p>
        </div>
        <PointBadge
          className={styles.pointContainer}
          points={data.totalPoints}
        />
      </section>
      <PasswordVerificationModal
        open={Boolean(activeModal)}
        title={data.title}
        description="권한이 필요해요!"
        okText={activeModal?.buttonText}
        modalButtonLoading={isModalButtonLoading}
        onOk={(password) => activeModal?.onOk(password)}
        onCancel={() => setActiveModal(null)}
      />
      <ConfirmModal
        open={Boolean(activeConfirmModal)}
        title={'스터디 삭제하기'}
        description={'정말 삭제하시겠습니까?'}
        confirmText={activeConfirmModal?.buttonText}
        onConfirm={activeConfirmModal?.onOk}
        onCancel={() => {
          setActiveConfirmModal(null);
        }}
        loading={isConfirmModalButtonLoading}
      />
    </>
  );
}

export default StudyDetailHeader;

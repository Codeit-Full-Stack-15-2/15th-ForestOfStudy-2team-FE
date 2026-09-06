import point from '@/assets/ic_point.svg';
import ArrowButton from '@/components/ArrowButton';
import PasswordVerificationModal from '@/components/PasswordVerificationModal';
import { useState } from 'react';
import { useStudyActions } from '../hooks/useStudyActions';
import StudyActions from './StudyActions';
import styles from './StudyDetailHeader.module.css';
import StudyReactions from './StudyReactions';

function StudyDetailHeader({ data }) {
  const { handleStudyShare, handleStudyEdit, handleStudyRemove } =
    useStudyActions();
  const [activeModal, setActiveModal] = useState(null);

  const handleOpenEditModal = () => {
    setActiveModal({
      buttonText: '수정하러 가기',
      onOk: (password) => {
        // 수정 권한 검증 및 페이지 이동 로직
      },
    });
  };

  const handleOpenHabitModal = () => {
    setActiveModal({
      buttonText: '습관 달성 기록하기',
      onOk: (password) => {
        // 습관 기록 모달/페이지 진입 로직
      },
    });
  };

  return (
    <>
      <section className={styles.headerContainer}>
        <div className={styles.controlsContainer}>
          <div className={styles.controls}>
            <StudyActions
              onShare={handleStudyShare}
              onEdit={handleStudyEdit}
              onRemove={handleStudyRemove}
            />
          </div>
          <div className={styles.reaction}>
            <StudyReactions reactions={data.reactions} />
          </div>
        </div>
        <div className={styles.titleContainer}>
          <h2 className={styles.title}>{data.title}</h2>
          <div className={styles.titleButtons}>
            <ArrowButton onClick={handleOpenEditModal}>
              습관 달성 기록하기
            </ArrowButton>
            <ArrowButton onClick={handleOpenHabitModal}>
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

import { useEffect, useState } from 'react';
import StudyForm from '@/components/studyForm/StudyForm';
import BaseButton from '@/components/baseButton/BaseButton';
import styles from './StudyEdit.module.css';
import { useStudyEditForm } from './hooks/useStudyEditForm';
import { useNavigate, useParams } from 'react-router';
import ConfirmModal from '@/components/confirmModal/ConfirmModal';
import { checkIsStudyVerified } from '@/utils/studyAuthSession';

function StudyEdit() {
  const navigate = useNavigate();
  const { studyId } = useParams();

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const {
    formData,
    nicknameCheckStatus,
    errors,
    handleChange,
    handleBackgroundSelect,
  } = useStudyEditForm();

  useEffect(() => {
    const isVerified = checkIsStudyVerified(studyId);

    if (!isVerified) {
      navigate('/', { replace: true });
    }
  }, [studyId, navigate]);

  const handleEdit = () => {
    setIsConfirmOpen(true);
  };

  const handleCancelEdit = () => {
    setIsConfirmOpen(false);
  };

  const handleConfirmEdit = () => {
    setIsConfirmOpen(false);
    navigate(`/studies/${studyId}`);
  };

  return (
    <main>
      <section className={styles.studyForm}>
        <h1 className={styles.title}>스터디 수정하기</h1>

        <div className={styles.formContent}>
          <StudyForm
            formData={formData}
            onChange={handleChange}
            nicknameCheckStatus={nicknameCheckStatus}
            selectedBackground={formData.background}
            onBackgroundSelect={handleBackgroundSelect}
            errors={errors}
          />

          <BaseButton type="button" onClick={handleEdit} fullWidth>
            수정하기
          </BaseButton>
        </div>
      </section>

      <ConfirmModal
        open={isConfirmOpen}
        title="스터디를 수정하시겠습니까?"
        cancelText="취소"
        confirmText="확인"
        onCancel={handleCancelEdit}
        onConfirm={handleConfirmEdit}
      />
    </main>
  );
}

export default StudyEdit;

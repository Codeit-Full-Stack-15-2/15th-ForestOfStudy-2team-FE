import { useEffect, useState } from 'react';
import StudyForm from '@/components/studyForm/StudyForm';
import BaseButton from '@/components/baseButton/BaseButton';
import styles from './StudyEdit.module.css';
import { useStudyEditForm } from './hooks/useStudyEditForm';
import { useNavigate, useParams } from 'react-router';
import ConfirmModal from '@/components/confirmModal/ConfirmModal';
import { checkIsStudyVerified } from '@/utils/studyAuthSession';
import { getStudyDetail, updateStudy } from '@/api/studyApi';

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
    initializeFormData,
  } = useStudyEditForm();

  useEffect(() => {
    const isVerified = checkIsStudyVerified(studyId);

    if (!isVerified) {
      navigate('/', { replace: true });
      return;
    }
    const fetchStudy = async () => {
      try {
        const study = await getStudyDetail(studyId);
        initializeFormData(study);
      } catch (error) {
        console.error('스터디 정보를 불러오지 못했습니다.', error);
      }
    };

    fetchStudy();
  }, [studyId, navigate, initializeFormData]);

  const handleEdit = () => {
    setIsConfirmOpen(true);
  };

  const handleCancelEdit = () => {
    setIsConfirmOpen(false);
  };

  const handleConfirmEdit = async () => {
    const updateData = {
      nickname: formData.nickname.trim(),
      title: formData.studyName.trim(),
      description:
        formData.description.trim() ||
        `${formData.nickname.trim()}의 ${formData.studyName.trim()}입니다.`,
      background: formData.background,
    };

    try {
      await updateStudy(studyId, updateData);
      setIsConfirmOpen(false);
      navigate(`/studies/${studyId}`);
    } catch (error) {
      console.error('스터디 수정에 실패했습니다:', error);
    }
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

import StudyForm from '@/components/studyForm/StudyForm';
import BaseButton from '@/components/baseButton/BaseButton';
import styles from './StudyEdit.module.css';
import { useStudyEditForm } from './hooks/useStudyEditForm';
import { useNavigate, useParams } from 'react-router';

function StudyEdit() {
  const navigate = useNavigate();
  const { studyId } = useParams();

  const {
    formData,
    nicknameCheckStatus,
    errors,
    handleChange,
    handleBackgroundSelect,
  } = useStudyEditForm();

  const handleEdit = () => {
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
    </main>
  );
}

export default StudyEdit;

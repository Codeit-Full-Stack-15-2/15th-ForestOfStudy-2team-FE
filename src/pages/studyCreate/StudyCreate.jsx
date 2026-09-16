import StudyForm from '@/components/studyForm/StudyForm';
import styles from './StudyCreate.module.css';
import { useStudyCreateForm } from './hooks/useStudyCreateForm';
import PasswordInput from '@/components/passwordInput/PasswordInput';
import BaseButton from '@/components/baseButton/BaseButton';
import ConfirmModal from '@/components/confirmModal/ConfirmModal';
import { useNavigate } from 'react-router';
import { createStudy } from '@/api/studyApi';
import { showToast } from '@/utils/showToast';

function StudyCreate() {
  const navigate = useNavigate();
  const {
    formData,
    nicknameCheckStatus,
    selectedBackground,
    password,
    passwordConfirm,
    errors,
    isConfirmModalOpen,
    handleChange,
    handleNicknameCheck,
    handleBackgroundSelect,
    handlePasswordChange,
    handlePasswordConfirmChange,
    handleSubmit,
    handleCloseConfirmModal,
  } = useStudyCreateForm();

  const handleConfirmCreate = async () => {
    const description =
      formData.description.trim() ||
      `${formData.nickname.trim()}의 ${formData.studyName.trim()}입니다.`;

    const studyData = {
      nickname: formData.nickname.trim(),
      title: formData.studyName.trim(),
      description,
      background: selectedBackground,
      study_password: password,
    };

    try {
      const newStudy = await createStudy(studyData);
      navigate(`/studies/${newStudy.id}`);
    } catch (error) {
      console.error('스터디 생성에 실패했습니다:', error);
      showToast(error.message || '스터디 생성에 실패했습니다.', 'warning');
    }
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <section className={styles.studyForm}>
          <h1 className={styles.title}>스터디 만들기</h1>

          <div className={styles.formContent}>
            <StudyForm
              formData={formData}
              onChange={handleChange}
              nicknameCheckStatus={nicknameCheckStatus}
              onNicknameCheck={handleNicknameCheck}
              selectedBackground={selectedBackground}
              onBackgroundSelect={handleBackgroundSelect}
              errors={errors}
            />

            <PasswordInput
              id="password"
              label="비밀번호"
              placeholder="비밀번호를 입력해 주세요"
              value={password}
              onChange={handlePasswordChange}
              error={errors.password}
            />

            <PasswordInput
              id="passwordConfirm"
              label="비밀번호 확인"
              placeholder="비밀번호를 다시 입력해 주세요"
              value={passwordConfirm}
              onChange={handlePasswordConfirmChange}
              error={errors.passwordConfirm}
            />

            <BaseButton type="submit" fullWidth>
              스터디 만들기
            </BaseButton>
          </div>
        </section>
      </form>
      <ConfirmModal
        open={isConfirmModalOpen}
        title="비밀번호를 꼭 기억해 주세요."
        description="비밀번호는 변경할 수 없습니다."
        onCancel={handleCloseConfirmModal}
        onConfirm={handleConfirmCreate}
      />
    </main>
  );
}

export default StudyCreate;

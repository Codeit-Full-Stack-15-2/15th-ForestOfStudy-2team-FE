import StudyForm from '@/components/studyForm/StudyForm';
import styles from './StudyCreate.module.css';
import { useStudyCreateForm } from './hooks/useStudyCreateForm';
import PasswordInput from '@/components/passwordInput/PasswordInput';
import BaseButton from '@/components/baseButton/BaseButton';
import ConfirmModal from '@/components/confirmModal/ConfirmModal';
import { useNavigate } from 'react-router';

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
    handleBackgroundSelect,
    handlePasswordChange,
    handlePasswordConfirmChange,
    handleSubmit,
    handleCloseConfirmModal,
  } = useStudyCreateForm();

  const handleConfirmCreate = () => {
    // 실제 생성 API 연동 시 적용
    // const description =
    //   formData.description.trim() ||
    //   `${formData.nickname.trim()}의 ${formData.studyName.trim()}입니다.`;

    navigate('/studies/123');
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

import { useState } from 'react';

export function useStudyCreateForm() {
  const [formData, setFormData] = useState({
    nickname: '',
    studyName: '',
    description: '',
  });

  const [nicknameCheckStatus, setNicknameCheckStatus] = useState('unchecked');
  const [selectedBackground, setSelectedBackground] = useState('first');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errors, setErrors] = useState({});
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const clearError = (name) => {
    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    clearError(name);

    if (name === 'nickname') {
      setNicknameCheckStatus('unchecked');
    }
  };

  const handleBackgroundSelect = (backgroundId) => {
    setSelectedBackground(backgroundId);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    clearError('password');
  };

  const handlePasswordConfirmChange = (event) => {
    setPasswordConfirm(event.target.value);
    clearError('passwordConfirm');
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!formData.nickname.trim()) {
      nextErrors.nickname = '*닉네임을 입력해 주세요.';
    }

    if (!formData.studyName.trim()) {
      nextErrors.studyName = '*스터디 이름을 입력해 주세요.';
    }

    if (!password.trim()) {
      nextErrors.password = '*비밀번호를 입력해 주세요.';
    } else if (password.length < 4) {
      nextErrors.password = '*비밀번호는 4자 이상 입력해 주세요.';
    }

    if (!passwordConfirm.trim()) {
      nextErrors.passwordConfirm = '*비밀번호를 다시 입력해 주세요.';
    } else if (password !== passwordConfirm) {
      nextErrors.passwordConfirm = '*비밀번호가 일치하지 않습니다.';
    }

    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = validateForm();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsConfirmModalOpen(true);
  };

  const handleCloseConfirmModal = () => {
    setIsConfirmModalOpen(false);
  };

  return {
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
  };
}

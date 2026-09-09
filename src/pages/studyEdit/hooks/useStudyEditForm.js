import { useState } from 'react';

export function useStudyEditForm() {
  const [formData, setFormData] = useState({
    nickname: '',
    studyName: '',
    description: '',
    background: '',
  });

  const [nicknameCheckStatus, setNicknameCheckStatus] = useState('unchecked');
  const [errors, setErrors] = useState({});

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
    setFormData((prev) => ({
      ...prev,
      background: backgroundId,
    }));
  };

  return {
    formData,
    nicknameCheckStatus,
    errors,
    handleChange,
    handleBackgroundSelect,
  };
}

import { useCallback, useState } from 'react';
import { checkNicknameAvailability } from '@/api/studyApi';

export function useStudyEditForm() {
  const [formData, setFormData] = useState({
    nickname: '',
    studyName: '',
    description: '',
    background: '',
  });

  const [nicknameCheckStatus, setNicknameCheckStatus] = useState('unchecked');
  const [originalNickname, setOriginalNickname] = useState('');
  const [errors, setErrors] = useState({});

  const initializeFormData = useCallback((study) => {
    setFormData({
      nickname: study.nickname ?? '',
      studyName: study.title ?? '',
      description: study.description ?? '',
      background: study.background ?? '',
    });

    setOriginalNickname(study.nickname ?? '');
  }, []);

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

  const handleNicknameCheck = async () => {
    const nickname = formData.nickname.trim();

    if (!nickname) {
      return;
    }

    if (nickname === originalNickname.trim()) {
      setNicknameCheckStatus('available');
      return;
    }

    setNicknameCheckStatus('checking');

    try {
      const result = await checkNicknameAvailability(nickname);

      setNicknameCheckStatus(result.available ? 'available' : 'duplicate');
    } catch (error) {
      console.error('닉네임 중복 확인에 실패했습니다.', error);
      setNicknameCheckStatus('unchecked');
    }
  };

  const validateNickname = () => {
    const nickname = formData.nickname.trim();

    if (!nickname) {
      setErrors((prev) => ({
        ...prev,
        nickname: '*닉네임을 입력해 주세요.',
      }));
      return false;
    }

    if (
      nickname !== originalNickname.trim() &&
      nicknameCheckStatus !== 'available'
    ) {
      setErrors((prev) => ({
        ...prev,
        nickname: '*닉네임 중복 확인을 해주세요.',
      }));
      return false;
    }

    return true;
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
    handleNicknameCheck,
    validateNickname,
    handleBackgroundSelect,
    initializeFormData,
  };
}

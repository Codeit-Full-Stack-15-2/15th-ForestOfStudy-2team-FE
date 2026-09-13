import { removeStudy, verifyStudyPassword } from '@/api/studyApi';
import { showToast } from '@/utils/showToast';
import {
  checkIsStudyVerified,
  saveStudyVerified,
} from '@/utils/studyAuthSession';
import { useState } from 'react';
import { useNavigate } from 'react-router';

export function useStudyActions(studyId) {
  const [activeModal, setActiveModal] = useState(null);
  const [activeConfirmModal, setActiveConfirmModal] = useState(null);
  const [isModalButtonLoading, setIsModalButtonLoading] = useState(false);
  const [isConfirmModalButtonLoading, setIsConfirmModalButtonLoading] =
    useState(false);
  const navigate = useNavigate();
  // 1. 공유하기
  const handleStudyShare = async () => {
    try {
      const currentUrl = window.location.href;
      await navigator.clipboard.writeText(currentUrl);
      showToast('주소가 복사되었습니다.');
    } catch (error) {
      console.error('주소 복사 실패:', error);
      showToast('주소 복사에 실패했습니다.', 'warning');
    }
  };

  // 2. 수정 모달 열기
  const handleOpenEditModal = () => {
    if (checkIsStudyVerified(studyId)) {
      navigate(`/studies/${studyId}/edit`);
      return;
    }

    setActiveModal({
      buttonText: '수정하러 가기',
      onOk: async (password) => {
        setIsModalButtonLoading(true);
        try {
          await verifyStudyPassword(studyId, password);
          saveStudyVerified(studyId);
          setActiveModal(null);
          navigate(`/studies/${studyId}/edit`);
        } catch (error) {
          console.error(error.message);
          showToast(
            '🚨 비밀번호가 일치하지 않습니다. 다시 입력해주세요.',
            'warning',
          );
        } finally {
          setIsModalButtonLoading(false);
        }
      },
    });
  };

  // 스터디 삭제 획인 모달 열기
  const handleOpenConfirmRemoveStudyModal = () => {
    setActiveConfirmModal({
      buttonText: '삭제',
      onOk: async () => {
        setIsConfirmModalButtonLoading(true);
        try {
          await removeStudy(studyId);
          showToast('스터디 삭제가 완료되었습니다.');
          setActiveConfirmModal(null);
          navigate('/');
        } catch (error) {
          console.error(error.message);
          showToast(
            '🚨 스터디 삭제에 실패했습니다. 다시 시도해주세요.',
            'warning',
          );
        } finally {
          setIsConfirmModalButtonLoading(false);
        }
      },
    });
  };

  // 3. 스터디 삭제하기 비밀번호 검증 모달 열기
  const handleOpenRemoveModal = () => {
    if (checkIsStudyVerified(studyId)) {
      handleOpenConfirmRemoveStudyModal();
      return;
    }

    setActiveModal({
      buttonText: '스터디 삭제하기',
      onOk: async (password) => {
        setIsModalButtonLoading(true);
        try {
          const token = await verifyStudyPassword(studyId, password);
          saveStudyVerified(studyId, token);
          setActiveModal(null);
          handleOpenConfirmRemoveStudyModal();
        } catch (error) {
          console.error(error.message);
          showToast(
            '🚨 비밀번호가 일치하지 않습니다. 다시 입력해주세요.',
            'warning',
          );
        } finally {
          setIsModalButtonLoading(false);
        }
      },
    });
  };

  // 4. 습관 달성 모달 열기
  const handleOpenHabitModal = () => {
    if (checkIsStudyVerified(studyId)) {
      navigate(`/studies/${studyId}/habits`);
      return;
    }
    setActiveModal({
      buttonText: '습관 달성 기록하기',
      onOk: async (password) => {
        setIsModalButtonLoading(true);
        try {
          await verifyStudyPassword(studyId, password);
          saveStudyVerified(studyId);
          setActiveModal(null);
          navigate(`/studies/${studyId}/habits`);
        } catch (error) {
          console.error(error.message);
          showToast(
            '🚨 비밀번호가 일치하지 않습니다. 다시 입력해주세요.',
            'warning',
          );
        } finally {
          setIsModalButtonLoading(false);
        }
      },
    });
  };

  // 5. 오늘의 집중 모달 열기
  const handleOpenFocusModal = () => {
    if (checkIsStudyVerified(studyId)) {
      navigate(`/studies/${studyId}/focus`);
      return;
    }
    setActiveModal({
      buttonText: '오늘의 집중 바로가기',
      onOk: async (password) => {
        setIsModalButtonLoading(true);
        try {
          await verifyStudyPassword(studyId, password);
          saveStudyVerified(studyId);
          setActiveModal(null);
          navigate(`/studies/${studyId}/focus`);
        } catch (error) {
          console.error(error.message);

          showToast(
            '🚨 비밀번호가 일치하지 않습니다. 다시 입력해주세요.',
            'warning',
          );
        } finally {
          setIsModalButtonLoading(false);
        }
      },
    });
  };

  return {
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
  };
}

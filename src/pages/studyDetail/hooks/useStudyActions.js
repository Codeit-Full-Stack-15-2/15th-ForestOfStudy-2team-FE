import { verifyStudyPassword } from '@/api/studyApi';
import { useToast } from '@/components/toast/ToastContext';
import {
  checkIsStudyVerified,
  saveStudyVerified,
} from '@/utils/studyAuthSession';
import { useState } from 'react';
import { useNavigate } from 'react-router';

export function useStudyActions(studyId) {
  const [activeModal, setActiveModal] = useState(null);
  const [isModalButtonLoading, setIsModalButtonLoading] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();
  // 1. 공유하기
  const handleStudyShare = async () => {
    try {
      const currentUrl = window.location.href;
      await navigator.clipboard.writeText(currentUrl);
      showToast('주소가 복사되었습니다.', 'success');
    } catch (error) {
      console.error('주소 복사 실패:', error);
      showToast('주소 복사에 실패했습니다.');
    }
  };

  // 2. 수정 모달 열기
  const handleOpenEditModal = () => {
    if (checkIsStudyVerified(studyId)) {
      // TODO: 경로 수정 필요
      navigate(`/`);
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
          // TODO:경로 수정 필요
          navigate('/');
        } catch (error) {
          console.error(error.message);
          showToast('🚨 비밀번호가 일치하지 않습니다. 다시 입력해주세요.');
        } finally {
          setIsModalButtonLoading(false);
        }
      },
    });
  };

  // 3. 삭제 모달 열기
  const handleOpenRemoveModal = () => {
    if (checkIsStudyVerified(studyId)) {
      navigate(`/`);
      return;
    }
    setActiveModal({
      buttonText: '스터디 삭제하기',
      onOk: async (password) => {
        setIsModalButtonLoading(true);
        try {
          await verifyStudyPassword(studyId, password);
          saveStudyVerified(studyId);
          setActiveModal(null);
          navigate('/');
        } catch (error) {
          console.error(error.message);
          showToast('🚨 비밀번호가 일치하지 않습니다. 다시 입력해주세요.');
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
          showToast('🚨 비밀번호가 일치하지 않습니다. 다시 입력해주세요.');
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
          showToast('🚨 비밀번호가 일치하지 않습니다. 다시 입력해주세요.');
        } finally {
          setIsModalButtonLoading(false);
        }
      },
    });
  };

  return {
    activeModal,
    isModalButtonLoading,
    setActiveModal,
    handleStudyShare,
    handleOpenEditModal,
    handleOpenRemoveModal,
    handleOpenHabitModal,
    handleOpenFocusModal,
  };
}

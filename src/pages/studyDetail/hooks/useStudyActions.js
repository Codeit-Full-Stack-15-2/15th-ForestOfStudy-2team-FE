import { verifyStudyPassword } from '@/api/studyApi';
import { useState } from 'react';
import { useNavigate } from 'react-router';

export function useStudyActions(studyId) {
  const [activeModal, setActiveModal] = useState(null);
  const [isModalButtonLoading, setIsModalButtonLoading] = useState(false);
  const navigate = useNavigate();
  // 1. 공유하기
  const handleStudyShare = async () => {
    try {
      const currentUrl = window.location.href;
      await navigator.clipboard.writeText(currentUrl);
      alert('주소가 복사되었습니다!');
    } catch (error) {
      console.error('주소 복사 실패:', error);
      alert('주소 복사에 실패했습니다.');
    }
  };

  // 2. 수정 모달 열기
  const handleOpenEditModal = () => {
    setActiveModal({
      buttonText: '수정하러 가기',
      onOk: async (password) => {
        setIsModalButtonLoading(true);
        try {
          await verifyStudyPassword(studyId, password);
          setActiveModal(null);
          // TODO:경로 수정 필요
          navigate('/');
        } catch (error) {
          console.error(error.message);
          // TODO:토스트 필요
        } finally {
          setIsModalButtonLoading(false);
        }
      },
    });
  };

  // 3. 삭제 모달 열기
  const handleOpenRemoveModal = () => {
    setActiveModal({
      buttonText: '스터디 삭제하기',
      onOk: async (password) => {
        setIsModalButtonLoading(true);
        try {
          await verifyStudyPassword(studyId, password);
          setActiveModal(null);
          // TODO:경로 수정 필요
          navigate('/');
        } catch (error) {
          console.error(error.message);
          // TODO:토스트 필요
        } finally {
          setIsModalButtonLoading(false);
        }
      },
    });
  };

  // 4. 습관 달성 모달 열기
  const handleOpenHabitModal = () => {
    setActiveModal({
      buttonText: '습관 달성 기록하기',
      onOk: async (password) => {
        setIsModalButtonLoading(true);
        try {
          await verifyStudyPassword(studyId, password);
          setActiveModal(null);
          // TODO:경로 수정 필요
          navigate('/');
        } catch (error) {
          console.error(error.message);
          // TODO:토스트 필요
        } finally {
          setIsModalButtonLoading(false);
        }
      },
    });
  };

  // 5. 오늘의 집중 모달 열기
  const handleOpenFocusModal = () => {
    setActiveModal({
      buttonText: '오늘의 집중 바로가기',
      onOk: async (password) => {
        setIsModalButtonLoading(true);
        try {
          await verifyStudyPassword(studyId, password);
          setActiveModal(null);
          // TODO:경로 수정 필요
          navigate('/');
        } catch (error) {
          console.error(error.message);
          // TODO:토스트 필요
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

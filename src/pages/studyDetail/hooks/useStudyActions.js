import { useState } from 'react';

export function useStudyActions(studyId) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [istDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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
  const handleStudyEdit = () => {
    setIsEditModalOpen(true);
  };

  // 3. 삭제 모달 열기
  const handleStudyRemove = () => {
    setIsDeleteModalOpen(true);
  };

  return {
    isEditModalOpen,
    setIsEditModalOpen,
    istDeleteModalOpen,
    setIsDeleteModalOpen,
    handleStudyShare,
    handleStudyEdit,
    handleStudyRemove,
  };
}

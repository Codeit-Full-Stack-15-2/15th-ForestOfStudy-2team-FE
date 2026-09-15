import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getHabits(studyId) {
  try {
    const response = await axios.get(`${BASE_URL}/studies/${studyId}/habits`);
    return response.data;
  } catch (error) {
    console.error('습관 목록 조회 실패', error);
    throw error;
  }
}

export async function createHabits(studyId, titles) {
  try {
    const response = await axios.post(`${BASE_URL}/studies/${studyId}/habits`, {
      title: titles,
    });
    return response.data;
  } catch (error) {
    console.error('습관 생성 실패:', error);
    throw error;
  }
}

export async function updateHabits(studyId, habits) {
  try {
    const response = await axios.patch(
      `${BASE_URL}/studies/${studyId}/habits`,
      { habits }, // 백엔드 스키마 명세의 필드명(habits 또는 updatedHabits)에 맞게 전달
    );
    return response.data;
  } catch (error) {
    console.error('습관 수정 실패:', error);
    throw error;
  }
}

export async function deleteHabits(studyId, habitIds) {
  try {
    const response = await axios.delete(
      `${BASE_URL}/studies/${studyId}/habits`,
      {
        data: { habitIds }, // deleteHabitsSchema에서 요구하는 필드명(예: habitIds)으로 설정
      },
    );
    return response.data;
  } catch (error) {
    console.error('습관 삭제 실패:', error);
    throw error;
  }
}

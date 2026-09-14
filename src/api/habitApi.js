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

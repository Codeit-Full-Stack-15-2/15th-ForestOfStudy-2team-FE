import { getStudyVerifiedToken } from '@/utils/studyAuthSession';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getHabits(studyId) {
  try {
    const token = getStudyVerifiedToken(studyId);

    const response = await fetch(`${BASE_URL}/studies/${studyId}/habits`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`습관 목록을 가져오지 못했습니다.`);
    }
    return await response.json();
  } catch (error) {
    console.error('습관 목록 조회 실패', error);
    throw error;
  }
}

export async function createHabits(studyId, titles) {
  try {
    const token = getStudyVerifiedToken(studyId);
    const response = await fetch(`${BASE_URL}/studies/${studyId}/habits`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        title: titles,
      }),
    });
    if (!response.ok) {
      throw new Error('습관을 생성하는데 실패했습니다.');
    }
    return await response.json();
  } catch (error) {
    console.error('습관 생성 실패:', error);
    throw error;
  }
}

export async function updateHabits(studyId, habitsToUpdate) {
  try {
    const token = getStudyVerifiedToken(studyId);
    const response = await fetch(`${BASE_URL}/studies/${studyId}/habits`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ habits: habitsToUpdate }),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || '습관 수정에 실패했습니다.');
    }

    return await response.json();
  } catch (error) {
    console.error('습관 수정 API 호출 실패:', error.message);
    throw error;
  }
}

export const toggleHabitRecord = async (studyId, habitId, recordDate) => {
  try {
    const token = getStudyVerifiedToken(studyId);
    const response = await fetch(
      `${BASE_URL}/studies/${studyId}/habits/${habitId}/records`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          recordDate,
        }),
      },
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || '습관 상태를 변경하는데 실패했습니다.',
      );
    }

    return await response.json();
  } catch (error) {
    console.error('습관 상태 변경 실패:', error);
    throw error;
  }
};

export async function deleteHabits(studyId, habitIds) {
  try {
    const token = getStudyVerifiedToken(studyId);
    const response = await fetch(`${BASE_URL}/studies/${studyId}/habits`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ habitIds }),
    });
    if (!response.ok) {
      throw new Error('습관을 삭제하는데 실패했습니다.');
    }
    return await response.json();
  } catch (error) {
    console.error('습관 삭제 실패:', error);
    throw error;
  }
}

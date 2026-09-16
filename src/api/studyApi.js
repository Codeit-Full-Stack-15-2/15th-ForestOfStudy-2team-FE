const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// src/api/studyApi.js
import {
  getStudyVerifiedToken,
  removeStudyVerified,
} from '@/utils/studyAuthSession';

export async function getStudies({
  keyword = '',
  orderBy = 'latest',
  page = 1,
  pageSize = 6,
} = {}) {
  const queryParams = new URLSearchParams({
    orderBy,
    page: String(page),
    pageSize: String(pageSize),
  });
  if (keyword) {
    queryParams.append('keyword', keyword);
  }

  const response = await fetch(`${BASE_URL}/studies?${queryParams.toString()}`);
  if (!response.ok) {
    throw new Error('스터디 목록을 불러오지 못했습니다.');
  }

  const data = await response.json();
  return data.data;
}

// ==========================================
// 1. 스터디 헤더 정보 조회 API
// ==========================================
export async function getStudyDetail(studyId) {
  try {
    const response = await fetch(`${BASE_URL}/studies/${studyId}`);
    if (!response.ok) {
      throw new Error('스터디 정보를 불러오지 못했습니다.');
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('스터디 조회 실패:', error);
    throw error;
  }
}

// ==========================================
// 2. 주간 습관 기록표 조회 API
// ==========================================
export async function getStudyHabits(
  studyId,
  targetDate,
  { page = 1, pageSize = 7 } = {},
) {
  const queryParams = new URLSearchParams({
    target_date:
      targetDate instanceof Date ? targetDate.toISOString() : targetDate,
    page: String(page),
    page_size: String(pageSize),
  });

  const response = await fetch(
    `${BASE_URL}/studies/${studyId}/habits/records/weekly?${queryParams.toString()}`,
  );

  if (!response.ok) throw new Error('주간 습관 일정을 불러오지 못했습니다.');
  const habit_records = (await response.json()).data.list;
  return habit_records;
}

// ==========================================
// 3. 이모지 반응 저장/토글 API
// ==========================================
export async function toggleStudyReaction(studyId, emoji, userId) {
  const response = await fetch(`${BASE_URL}/studies/${studyId}/reactions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ emoji, guest_uuid: userId }),
  });
  if (!response.ok) throw new Error('이모지 반응 처리에 실패했습니다.');
  return await response.json();
}

// ==========================================
// 4. 스터디 비밀번호 검증 API
// ==========================================
export async function verifyStudyPassword(studyId, password) {
  const response = await fetch(`${BASE_URL}/studies/${studyId}/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ study_password: password }),
  });
  if (!response.ok) throw new Error('비밀번호가 일치하지 않습니다.');
  const data = await response.json();
  return data.data.token;
}

// ==========================================
// 5. 스터디 삭제 API
// ==========================================
export async function removeStudy(studyId) {
  try {
    // 1. sessionStorage에서 비밀번호 검증 완료 시 저장했던 토큰 추출
    const verificationToken = getStudyVerifiedToken(studyId);
    if (!verificationToken) {
      throw new Error(
        '스터디 삭제 권한이 없습니다. 비밀번호를 다시 인증해주세요.',
      );
    }

    // 2. 실제 백엔드 /api/studies/:studyId 엔드포인트로 DELETE 요청
    const response = await fetch(`${BASE_URL}/studies/${studyId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // Bearer 규격 또는 커스텀 헤더(X-Study-Token)로 전달 ⭐
        Authorization: `Bearer ${verificationToken}`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || '스터디 삭제에 실패했습니다.');
    }

    // 3. 삭제 성공 시 사용 완료된 세션 토큰 깔끔하게 소멸
    removeStudyVerified(studyId);

    return result;
  } catch (error) {
    console.error('스터디 삭제에 실패했습니다:', error);
  }
}

export async function updateStudy(studyId, updateData) {
  const verificationToken = getStudyVerifiedToken(studyId);

  if (!verificationToken) {
    throw new Error(
      '스터디 수정 권한이 없습니다. 비밀번호를 다시 인증해주세요.',
    );
  }

  const response = await fetch(`${BASE_URL}/studies/${studyId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${verificationToken}`,
    },
    body: JSON.stringify(updateData),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || '스터디 수정에 실패했습니다.');
  }

  return result.data;
}

export async function createStudy(studyData) {
  const response = await fetch(`${BASE_URL}/studies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(studyData),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || '스터디 생성에 실패했습니다.');
  }

  return result.data;
}

export async function checkNicknameAvailability(nickname) {
  const queryParams = new URLSearchParams({
    nickname,
  });

  const response = await fetch(
    `${BASE_URL}/studies/nickname/check?${queryParams.toString()}`,
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || '닉네임 중복 확인에 실패했습니다.');
  }

  return result.data;
}

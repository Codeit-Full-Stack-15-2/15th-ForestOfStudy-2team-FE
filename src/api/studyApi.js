// src/api/studyApi.js
import { MOCK_HABITS, MOCK_STUDY_HEADER } from '@/mocks/studyMockData';

// ==========================================
// 1. 스터디 헤더 정보 조회 API
// ==========================================
export async function getStudyDetail(studyId) {
  /* [실제 백엔드 배포 시 활성화할 fetch 코드]
  const response = await fetch(`/api/studies/${studyId}`);
  if (!response.ok) throw new Error('스터디 정보를 불러오지 못했습니다.');
  return await response.json();
  */

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ...MOCK_STUDY_HEADER,
        studyId: Number(studyId) || MOCK_STUDY_HEADER.studyId,
      });
    }, 200);
  });
}

// ==========================================
// 2. 주간 습관 기록표 조회 API
// ==========================================
export async function getStudyHabits(studyId, startDate) {
  /* [실제 백엔드 배포 시 활성화할 fetch 코드]
  const response = await fetch(`/api/studies/${studyId}/habits?startDate=${startDate}`);
  if (!response.ok) throw new Error('주간 습관 일정을 불러오지 못했습니다.');
  return await response.json();
  */

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_HABITS);
    }, 200);
  });
}

// ==========================================
// 3. 이모지 반응 저장/토글 API
// ==========================================
export async function toggleStudyReaction(studyId, emoji, userId) {
  /* [실제 백엔드 배포 시 활성화할 fetch 코드]
  const response = await fetch(`/api/studies/${studyId}/reactions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ emoji, userId }),
  });
  if (!response.ok) throw new Error('이모지 반응 처리에 실패했습니다.');
  return await response.json();
  */

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, emoji, userId });
    }, 200);
  });
}

// ==========================================
// 4. 스터디 비밀번호 검증 API
// ==========================================
export async function verifyStudyPassword(studyId, password) {
  /* [실제 백엔드 배포 시 활성화할 fetch 코드]
  const response = await fetch(`/api/studies/${studyId}/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  });
  if (!response.ok) throw new Error('비밀번호가 일치하지 않습니다.');
  return await response.json();
  */

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (password === '1234' || password === 'password123') {
        resolve({ success: true, message: '인증 성공' });
      } else {
        reject(new Error('비밀번호가 일치하지 않습니다.'));
      }
    }, 300);
  });
}

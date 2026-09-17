const getStudyTokenKey = (studyId) => `study_verify_${studyId}`;

export function checkIsStudyVerified(studyId) {
  if (!studyId) return false;

  const verifiedMap = getStudyVerifiedToken(studyId);
  return Boolean(verifiedMap);
}

export function saveStudyVerified(studyId, token) {
  if (!studyId || !token) return;
  try {
    sessionStorage.setItem(getStudyTokenKey(studyId), token);
  } catch (error) {
    console.error('세션 스토리지 저장 실패:', error);
  }
}

export function getStudyVerifiedToken(studyId) {
  if (!studyId) return null;
  try {
    const verifiedToken = sessionStorage.getItem(getStudyTokenKey(studyId));
    return verifiedToken;
  } catch (error) {
    console.error('세션 스토리지 조회 실패:', error);
  }
}

export function removeStudyVerified(studyId) {
  if (!studyId) return;
  try {
    sessionStorage.removeItem(getStudyTokenKey(studyId));
  } catch (error) {
    console.error('세션 스토리지 삭제 실패:', error);
  }
}

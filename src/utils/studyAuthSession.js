const getStudyTokenKey = (studyId) => `study_verify_${studyId}`;
// TODO: 리펙토링 후 제거
const getVerifiedMap = (studyId) => console.log(studyId);

// TODO: 리펙토링 후 제거
export function checkIsStudyVerified(studyId) {
  if (!studyId) return false;

  const verifiedMap = getVerifiedMap();
  return Boolean(verifiedMap[String(studyId)]);
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
    const removedToken = sessionStorage.removeItem(getStudyTokenKey(studyId));
    // TODO: 반환값 확인 후 제거
    console.log(removedToken);
  } catch (error) {
    console.error('세션 스토리지 삭제 실패:', error);
  }
}

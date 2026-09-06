const VERIFIED_STUDIES_KEY = 'verified_studies_session';

function getVerifiedMap() {
  try {
    const rawData = sessionStorage.getItem(VERIFIED_STUDIES_KEY);
    return rawData ? JSON.parse(rawData) : {};
  } catch (error) {
    console.error('세션 스토리지 조회 실패:', error);
    return {};
  }
}

export function checkIsStudyVerified(studyId) {
  if (!studyId) return false;

  const verifiedMap = getVerifiedMap();
  return Boolean(verifiedMap[String(studyId)]);
}

export function saveStudyVerified(studyId) {
  if (!studyId) return;

  try {
    const verifiedMap = getVerifiedMap();
    verifiedMap[String(studyId)] = true;

    sessionStorage.setItem(VERIFIED_STUDIES_KEY, JSON.stringify(verifiedMap));
  } catch (error) {
    console.error('세션 스토리지 저장 실패:', error);
  }
}

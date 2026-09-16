import { showToast } from '@/utils/showToast';
import { Navigate, useLocation, useParams } from 'react-router';

export default function ProtectedRoute({ children }) {
  const { studyId } = useParams();
  const location = useLocation();

  const token = sessionStorage.getItem(`study_verify_${studyId}`);

  if (!token) {
    showToast('로그인 없이 페이지에 접근 할 수 없습니다.', 'warning');
    return (
      <Navigate to={`/studies/${studyId}`} state={{ from: location }} replace />
    );
  }

  return children;
}

import { getStudyDetail } from '@/api/studyApi';
import CardContainer from '@/components/cardContainer/CardContainer';
import Spinner from '@/components/Spinner';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import StudyDetailBody from './components/StudyDetailBody';
import StudyDetailHeader from './components/StudyDetailHeader';
import styles from './StudyDetail.module.css';

function StudyDetail() {
  const { studyId } = useParams();
  const [headerData, setHeaderData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchHeader = async () => {
      try {
        setIsLoading(true);
        const header = await getStudyDetail(studyId);
        setHeaderData(header);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHeader();
  }, [studyId]);

  if (error) return <>에러 발생: {error}</>;

  return (
    <CardContainer>
      {isLoading ? (
        <div className={styles.spinnerContainer}>
          <Spinner />
        </div>
      ) : (
        <>
          <StudyDetailHeader studyId={studyId} data={headerData} />
          <StudyDetailBody studyId={studyId} />
        </>
      )}
    </CardContainer>
  );
}
export default StudyDetail;

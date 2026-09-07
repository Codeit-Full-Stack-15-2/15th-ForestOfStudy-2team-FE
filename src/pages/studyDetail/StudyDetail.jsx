import { getStudyDetail, getStudyHabits } from '@/api/studyApi';
import CardContainer from '@/components/cardContainer/CardContainer';
import Spinner from '@/components/Spinner';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import StudyDetailBody from './components/StudyDetailBody';
import StudyDetailHeader from './components/StudyDetailHeader';
import styles from './StudyDetail.module.css';

function StudyDetail() {
  const { studyId } = useParams();
  const [studyData, setStudyData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function fetchDetail() {
      try {
        setIsLoading(true);
        const [header, habits] = await Promise.all([
          getStudyDetail(studyId),
          getStudyHabits(studyId, new Date()),
        ]);
        setStudyData({
          header,
          habits,
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchDetail();
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
          <StudyDetailHeader studyId={studyId} data={studyData.header} />
          <StudyDetailBody habits={studyData.habits.list} />
        </>
      )}
    </CardContainer>
  );
}
export default StudyDetail;

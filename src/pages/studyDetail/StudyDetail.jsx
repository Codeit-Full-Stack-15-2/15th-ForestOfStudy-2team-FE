import CardContainer from '@/components/CardContainer';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import StudyDetailBody from './components/StudyDetailBody';
import StudyDetailHeader from './components/StudyDetailHeader';

const MOCK_STUDY_HEADER = {
  studyId: 123,
  title: '연우의 개발공장',
  description: 'Slow And Steady Wins The Race! 다들 오늘 하루도 화이팅 :)',
  totalPoints: 310,
  reactions: [
    { id: 1, emoji: '👱‍♀️', count: 37 },
    { id: 2, emoji: '👍🏻', count: 50 },
    { id: 3, emoji: '🤩', count: 50 },
    // 더보기(+5..) 클릭 시 펼쳐질 추가 이모지들
    { id: 4, emoji: '🔥', count: 12 },
    { id: 5, emoji: '🎉', count: 8 },
    { id: 6, emoji: '💻', count: 15 },
    { id: 7, emoji: '☕', count: 20 },
    { id: 8, emoji: '💪', count: 9 },
  ],
};

const MOCK_HABITS = [
  {
    id: 1,
    title: '미라클모닝 6시 기상',
    records: [
      { day: 'mon', date: '2026-08-31', isCompleted: true },
      { day: 'tue', date: '2026-09-01', isCompleted: false },
      { day: 'wed', date: '2026-09-02', isCompleted: true },
      { day: 'thu', date: '2026-09-03', isCompleted: true },
      { day: 'fri', date: '2026-09-04', isCompleted: false },
      { day: 'sat', date: '2026-09-05', isCompleted: true },
      { day: 'sun', date: '2026-09-06', isCompleted: false },
    ],
  },
  {
    id: 2,
    title: '아침 챙겨 먹기',
    records: [
      { day: 'mon', date: '2026-08-31', isCompleted: true },
      { day: 'tue', date: '2026-09-01', isCompleted: true },
      { day: 'wed', date: '2026-09-02', isCompleted: false },
      { day: 'thu', date: '2026-09-03', isCompleted: false },
      { day: 'fri', date: '2026-09-04', isCompleted: false },
      { day: 'sat', date: '2026-09-05', isCompleted: false },
      { day: 'sun', date: '2026-09-06', isCompleted: false },
    ],
  },
  {
    id: 3,
    title: 'React 스터디 책 1챕터 읽기',
    records: [
      { day: 'mon', date: '2026-08-31', isCompleted: true },
      { day: 'tue', date: '2026-09-01', isCompleted: false },
      { day: 'wed', date: '2026-09-02', isCompleted: false },
      { day: 'thu', date: '2026-09-03', isCompleted: false },
      { day: 'fri', date: '2026-09-04', isCompleted: false },
      { day: 'sat', date: '2026-09-05', isCompleted: false },
      { day: 'sun', date: '2026-09-06', isCompleted: false },
    ],
  },
  {
    id: 4,
    title: '스트레칭',
    records: [
      { day: 'mon', date: '2026-08-31', isCompleted: false },
      { day: 'tue', date: '2026-09-01', isCompleted: false },
      { day: 'wed', date: '2026-09-02', isCompleted: false },
      { day: 'thu', date: '2026-09-03', isCompleted: false },
      { day: 'fri', date: '2026-09-04', isCompleted: false },
      { day: 'sat', date: '2026-09-05', isCompleted: false },
      { day: 'sun', date: '2026-09-06', isCompleted: false },
    ],
  },
  {
    id: 5,
    title: '미라클모닝 6시 기상 2',
    records: [
      { day: 'mon', date: '2026-08-31', isCompleted: true },
      { day: 'tue', date: '2026-09-01', isCompleted: false },
      { day: 'wed', date: '2026-09-02', isCompleted: true },
      { day: 'thu', date: '2026-09-03', isCompleted: true },
      { day: 'fri', date: '2026-09-04', isCompleted: false },
      { day: 'sat', date: '2026-09-05', isCompleted: true },
      { day: 'sun', date: '2026-09-06', isCompleted: false },
    ],
  },
  {
    id: 6,
    title: '아침 챙겨 먹기 2',
    records: [
      { day: 'mon', date: '2026-08-31', isCompleted: true },
      { day: 'tue', date: '2026-09-01', isCompleted: true },
      { day: 'wed', date: '2026-09-02', isCompleted: false },
      { day: 'thu', date: '2026-09-03', isCompleted: false },
      { day: 'fri', date: '2026-09-04', isCompleted: false },
      { day: 'sat', date: '2026-09-05', isCompleted: false },
      { day: 'sun', date: '2026-09-06', isCompleted: false },
    ],
  },
  {
    id: 7,
    title: 'React 스터디 책 1챕터 읽기 2',
    records: [
      { day: 'mon', date: '2026-08-31', isCompleted: true },
      { day: 'tue', date: '2026-09-01', isCompleted: false },
      { day: 'wed', date: '2026-09-02', isCompleted: false },
      { day: 'thu', date: '2026-09-03', isCompleted: false },
      { day: 'fri', date: '2026-09-04', isCompleted: false },
      { day: 'sat', date: '2026-09-05', isCompleted: false },
      { day: 'sun', date: '2026-09-06', isCompleted: false },
    ],
  },
  {
    id: 8,
    title: '스트레칭 2',
    records: [
      { day: 'mon', date: '2026-08-31', isCompleted: false },
      { day: 'tue', date: '2026-09-01', isCompleted: false },
      { day: 'wed', date: '2026-09-02', isCompleted: false },
      { day: 'thu', date: '2026-09-03', isCompleted: false },
      { day: 'fri', date: '2026-09-04', isCompleted: false },
      { day: 'sat', date: '2026-09-05', isCompleted: false },
      { day: 'sun', date: '2026-09-06', isCompleted: false },
    ],
  },
];

function StudyDetail() {
  const { studyId } = useParams();
  const [studyData, setStudyData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDetail() {
      try {
        setIsLoading(true);
        // const data = await getStudyDetailApi(studyId);
        setStudyData({
          header: MOCK_STUDY_HEADER,
          habits: MOCK_HABITS,
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
        '로딩중...'
      ) : (
        <>
          <StudyDetailHeader data={studyData.header} />
          <StudyDetailBody habits={studyData.habits} />
        </>
      )}
    </CardContainer>
  );
}
export default StudyDetail;

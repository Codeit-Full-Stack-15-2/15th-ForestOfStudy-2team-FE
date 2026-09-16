import { useState, useEffect, useCallback } from 'react';
import { getStudyDetail, updateStudyPoints } from '@/api/studyApi';

export function useStudy(studyId = 123) {
  const [points, setPoints] = useState(0);
  const [nickname, setNickname] = useState('');
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const getStudyInfo = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getStudyDetail(studyId);
      setPoints(data.point ?? 0);
      setTitle(data.title ?? '');
      setNickname(data.nickname ?? '');
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [studyId]);

  useEffect(() => {
    getStudyInfo();
  }, [getStudyInfo]);

  const addPoints = useCallback(
    async (minutes) => {
      const data = await updateStudyPoints(studyId, minutes);
      setPoints(data.total_point);
      return data;
    },
    [studyId],
  );

  return { points, isLoading, addPoints, getStudyInfo, title, nickname };
}

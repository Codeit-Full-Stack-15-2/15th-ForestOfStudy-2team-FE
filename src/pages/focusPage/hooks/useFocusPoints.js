import { useState, useEffect, useCallback } from 'react';

export function useFocusPoints(studyId = 123) {
  const [points, setPoints] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const getPoints = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/studies/${studyId}`);
      if (!res.ok) throw new Error('포인트 조회 실패');
      const data = await res.json();
      setPoints(data.totalPoints || 0);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [studyId]);

  useEffect(()=>{
    getPoints();
  }, [getPoints]);

  const addPoints = async (amount) => {
    try {
      const res = await fetch(`/studies/${studyId}/points`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ points: Number(amount) }),
      });
      if (!res.ok) throw new Error('포인트 수정 실패');

      const data = await res.json();
      setPoints(data.totalPoints); 
      return data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  return { points, isLoading, addPoints, getPoints };
}

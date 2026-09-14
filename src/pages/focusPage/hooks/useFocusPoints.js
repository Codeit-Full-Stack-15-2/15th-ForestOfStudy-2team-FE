import { useState, useEffect, useCallback } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function useFocusPoints(studyId = 123) {
  const [points, setPoints] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const getPoints = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/studies/${studyId}`);
      if (!res.ok) throw new Error('스터디 정보 조회 실패');

      const { data } = await res.json();
      setPoints(data.point ?? 0);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [studyId]);

  useEffect(() => {
    getPoints();
  }, [getPoints]);

  const addPoints = useCallback(
    async (minutes) => {
      const res = await fetch(`${API_BASE_URL}/studies/${studyId}/points`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ minutes }),
      });

      if (!res.ok) {
        throw new Error('포인트 저장 실패');
      }

      const { data } = await res.json();
      setPoints(data.total_point); // 서버가 계산한 진짜 값으로 갱신 → 리렌더링 트리거
      return data;
    },
    [studyId],
  );

  return { points, isLoading, addPoints, getPoints };
}

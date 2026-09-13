import styles from './FocusPage.module.css';
import ArrowButton from '@/components/arrowButton/ArrowButton';
import Timer from './components/timer/Timer';
import CardContainer from '@/components/cardContainer/CardContainer';
import PointBadge from './components/PointBadge';
import ConfirmModal from '@/components/confirmModal/ConfirmModal';

import { useFocusPoints } from '@/pages/focusPage/hooks/useFocusPoints';
import { useState, useCallback, useEffect } from 'react';
import { useBlocker, useParams } from 'react-router';
import { calculateEarnedPoints } from './utils/calculateEarnedPoints';
import { showToast } from '@/utils/showToast';
import { useTimer } from './hooks/useTimer';

const PRESET_TIMES = [25, 35, 45];
const MIN_MINUTES = 0;

function FocusPage({ totalSeconds = MIN_MINUTES * 60 }) {
  const { studyId: paramStudyId } = useParams();
  const studyId = paramStudyId || 123;
  const { points, addPoints } = useFocusPoints(studyId);
  const [duration, setDuration] = useState(() =>
    Math.max(totalSeconds || 0, MIN_MINUTES * 60),
  );

  const handleTimerComplete = useCallback(async () => {
  const earnedPoints = calculateEarnedPoints(duration);
  if (earnedPoints > 0) {
    const minutes = Math.floor(duration / 60);
    
    try {
      const res = await fetch(`/api/studies/${studyId}/points`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ minutes }),
      });
      
      if (!res.ok) {
        throw new Error('포인트 저장 실패');
      }
      addPoints(earnedPoints); 
      showToast(`🎉 ${earnedPoints}포인트를 획득했습니다!`, 'success');
    } catch (err) {
      console.error(err.message);
      showToast(`포인트 저장에 문제가 생겼어요!`, 'warning');
    }
  }
}, [duration, addPoints, studyId]);

  const timer = useTimer(duration, handleTimerComplete);

  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      timer.isRunning && currentLocation.pathname !== nextLocation.pathname,
  );

  const adjustTime = (amountInMinutes) => {
    setDuration((prev) =>
      Math.max(prev + amountInMinutes * 60, MIN_MINUTES * 60),
    );
  };

  const selectPresetTime = (minutes) => {
    setDuration(Math.max(minutes, MIN_MINUTES) * 60);
  };

  useEffect(() => {
    if (!timer.isRunning) return;

    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [timer.isRunning]);

  return (
    <CardContainer>
      <div className={styles.titleContainer}>
        <h3>연우의 개발공장</h3>
        <div className={styles.buttonContainer}>
          <ArrowButton to={`/studies/${studyId}/habits`}>
            습관 달성 기록하기
          </ArrowButton>
          <ArrowButton to={`/studies/${studyId}`}>대시보드</ArrowButton>
        </div>
      </div>
      <PointBadge points={points} />
      <Timer
        duration={duration}
        timer={timer}
        presetTimes={PRESET_TIMES}
        onAdjustTime={adjustTime}
        onSelectPresetTime={selectPresetTime}
      />

      {blocker.state === 'blocked' && (
        <ConfirmModal
          open={blocker.state === 'blocked'}
          title="집중 진행 중!"
          description={
            '지금 페이지를 나가시면 포인트를 얻을 수 없어요. 정말 나가실 건가요?'
          }
          onConfirm={() => blocker.proceed()}
          onCancel={() => blocker.reset()}
        />
      )}
    </CardContainer>
  );
}

export default FocusPage;

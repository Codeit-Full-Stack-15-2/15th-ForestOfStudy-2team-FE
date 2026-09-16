import styles from './FocusPage.module.css';
import ArrowButton from '@/components/arrowButton/ArrowButton';
import Timer from './components/timer/Timer';
import CardContainer from '@/components/cardContainer/CardContainer';
import PointBadge from './components/PointBadge';
import ConfirmModal from '@/components/confirmModal/ConfirmModal';
import Spinner from '@/components/Spinner';

import { useStudy } from '@/pages/focusPage/hooks/useStudy';
import { useState, useCallback, useEffect } from 'react';
import { useBlocker, useParams, useNavigate } from 'react-router';
import { checkIsStudyVerified } from '@/utils/studyAuthSession';
import { calculateEarnedPoints } from './utils/calculateEarnedPoints';
import { showToast } from '@/utils/showToast';
import { useTimer } from './hooks/useTimer';
import { useHiddenTimerCommand } from './hooks/useHiddenTimerCommand';

const PRESET_TIMES = [25, 35, 45];
const MIN_MINUTES = 25;

function FocusPage({ totalSeconds = MIN_MINUTES * 60 }) {
  const { studyId: paramStudyId } = useParams();
  const studyId = paramStudyId || 123;
  const navigate = useNavigate();
  const { points, addPoints, title, nickname, isLoading } = useStudy(studyId);
  const isDemoMode = useHiddenTimerCommand();
  const [duration, setDuration] = useState(() =>
    Math.max(totalSeconds || 0, MIN_MINUTES * 60),
  );

  useEffect(() => {
    if (!checkIsStudyVerified(studyId)) {
      navigate('/', { replace: true });
    }
  }, [studyId, navigate]);

  const handleTimerComplete = useCallback(async () => {
    const earnedPoints = calculateEarnedPoints(duration);
    if (earnedPoints > 0) {
      const minutes = Math.floor(duration / 60);
      try {
        await addPoints(minutes);
        showToast(`🎉 ${earnedPoints}포인트를 획득했습니다!`, 'success');
      } catch (err) {
        console.error(err.message);
        showToast('포인트 저장에 문제가 생겼어요!', 'warning');
      }
    }
  }, [duration, addPoints]);

  const timer = useTimer(duration, handleTimerComplete, {
    fastForward: isDemoMode,
  });

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

  if (isLoading) {
    return (
      <CardContainer>
        <div className={styles.spinnerContainer}>
          <Spinner />
        </div>
      </CardContainer>
    );
  }

  return (
    <CardContainer>
      <div className={styles.titleContainer}>
        <h3>
          {nickname}의 {title}
        </h3>
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

import styles from './FocusPage.module.css';
import ArrowButton from '@/components/arrowButton/ArrowButton';
import Timer from './components/timer/Timer';
import CardContainer from '@/components/cardContainer/CardContainer';
import PointBadge from './components/pointBadge/PointBadge';
import ConfirmModal from '@/components/confirmModal/ConfirmModal';
import timerCompletedSound from '@/assets/sounds/timer_completed_sound.mp3';
import soundMaxIcon from '@/assets/focusPage/sound_max.svg';
import soundMinIcon from '@/assets/focusPage/sound_min.svg';

import { useStudy } from '@/pages/focusPage/hooks/useStudy';
import { useState, useCallback, useEffect, useRef } from 'react';
import { useBlocker, useParams } from 'react-router';
import { calculateEarnedPoints } from './utils/calculateEarnedPoints';
import { showToast } from '@/utils/showToast';
import { useTimer } from './hooks/useTimer';
import { useHiddenTimerCommand } from './hooks/useHiddenTimerCommand';

const PRESET_TIMES = [25, 35, 45];
const MIN_MINUTES = 25;

function FocusPage({ totalSeconds = MIN_MINUTES * 60 }) {
  const { studyId: paramStudyId } = useParams();
  const studyId = paramStudyId || 123;
  const { points, addPoints, title, nickname, isLoading } = useStudy(studyId);
  const isDemoMode = useHiddenTimerCommand();
  const [duration, setDuration] = useState(() =>
    Math.max(totalSeconds || 0, MIN_MINUTES * 60),
  );
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(timerCompletedSound);
    audioRef.current.volume = 0.2;
  }, []);

  const handleTimerComplete = useCallback(async () => {
    if (!isMuted) {
      audioRef.current
        ?.play()
        .catch((err) => console.error('알림음 재생 실패:', err));
    }
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
  }, [duration, addPoints, isMuted]);

  const timer = useTimer(duration, handleTimerComplete, {
    fastForward: isDemoMode,
  });

  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      timer.isRunning && currentLocation.pathname !== nextLocation.pathname,
  );

  const adjustTime = (amountInMinutes) => {
    setDuration((prev) => {
      const next = prev + amountInMinutes * 60;

      if (next < MIN_MINUTES * 60) {
        showToast(`최소 집중 시간은 ${MIN_MINUTES}분이에요!`, 'warning');
        return prev;
      }

      return next;
    });
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
        <div className={styles.titleWithMute}>
          <h3>{isLoading ? '불러오는 중...' : `${nickname}의 ${title}`}</h3>
          <button
            type="button"
            className={styles.muteButton}
            onClick={() => setIsMuted((prev) => !prev)}
            aria-label={isMuted ? '소리 켜기' : '소리 끄기'}
            title={isMuted ? '소리 켜기' : '소리 끄기'}
          >
            <img
              src={isMuted ? soundMinIcon : soundMaxIcon}
              alt="음소거 버튼"
              width={36}
              height={36}
            />
          </button>
        </div>
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

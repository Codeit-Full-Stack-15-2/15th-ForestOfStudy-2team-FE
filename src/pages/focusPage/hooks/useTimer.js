import { useState, useEffect, useRef } from 'react';
import { formatTime } from '@/utils/formatTime';

export function useTimer(duration, onComplete, { fastForward = false } = {}) {
  const [remainingSeconds, setRemainingSeconds] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);
  const hasCompletedRef = useRef(false);
  const isOverTime = remainingSeconds < 0;

  useEffect(() => {
    setRemainingSeconds(duration);
    hasCompletedRef.current = false;
  }, [duration]);

  useEffect(() => {
    if (!isRunning || isPaused) return;

    const NORMAL_TICK_MS = 1000;
    const FAST_FORWARD_TICK_MS = 5;
    const tickMs = fastForward ? FAST_FORWARD_TICK_MS : NORMAL_TICK_MS;

    intervalRef.current = setInterval(() => {
      setRemainingSeconds((prev) => prev - 1);
    }, tickMs);

    return () => clearInterval(intervalRef.current);
  }, [isRunning, isPaused, fastForward]);

  useEffect(() => {
    if (remainingSeconds === 0 && isRunning && !hasCompletedRef.current) {
      hasCompletedRef.current = true;

      if (typeof onComplete === 'function') {
        onComplete();
      }
    }
  }, [remainingSeconds, isRunning, onComplete]);

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
    }
    setIsPaused(false);
  };

  const pauseTimer = () => {
    setIsPaused(true);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsPaused(false);
    setRemainingSeconds(duration);
    hasCompletedRef.current = false;
  };

  return {
    formattedTime: formatTime(remainingSeconds),
    isRunning,
    isPaused,
    isOverTime,
    startTimer,
    pauseTimer,
    setIsRunning,
    resetTimer,
  };
}

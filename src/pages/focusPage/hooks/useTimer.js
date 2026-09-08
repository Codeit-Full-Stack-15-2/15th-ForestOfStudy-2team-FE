import { useState, useEffect, useRef } from 'react';
import { formatTime } from '@/utils/formatTime';

export function useTimer(duration, onComplete) {
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

    intervalRef.current = setInterval(() => {
      setRemainingSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [isRunning, isPaused]);

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

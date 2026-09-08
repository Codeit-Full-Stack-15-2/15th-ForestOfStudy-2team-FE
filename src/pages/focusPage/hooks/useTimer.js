import { useState, useEffect, useRef } from 'react';
import { formatTime } from '@/utils/formatTime';

export function useTimer(duration, onComplete) {
  const [remainingSeconds, setRemainingSeconds] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);
  const isOverTime = remainingSeconds < 0;
  const hasCompleteRef = useRef(null);

  useEffect(() => {
    setRemainingSeconds(duration);
    hasCompleteRef.current = false;
  }, [duration]);

  useEffect(() => {
    if (!isRunning || isPaused) return;

    intervalRef.current = setInterval(() => {
      setRemainingSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [isRunning, isPaused]);

  useEffect(() => {
    if (remainingSeconds === 0 && isRunning && !hasCompleteRef.current) {
      hasCompleteRef.current = true;
      onComplete?.();
    }
  }, [remainingSeconds, isRunning, hasCompleteRef]);

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
    hasCompleteRef.current = false;
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

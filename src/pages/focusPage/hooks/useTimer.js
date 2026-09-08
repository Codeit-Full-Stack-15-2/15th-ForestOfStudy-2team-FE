import { useState, useEffect, useRef } from 'react';
import { formatTime } from '@/utils/formatTime';

export function useTimer(duration) {
  const [remainingSeconds, setRemainingSeconds] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);
  const isOverTime = remainingSeconds < 0;

  useEffect(() => {
    setRemainingSeconds(duration);
  }, [duration]);

  useEffect(() => {
    if (!isRunning || isPaused) return;

    intervalRef.current = setInterval(() => {
      setRemainingSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [isRunning, isPaused]);

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

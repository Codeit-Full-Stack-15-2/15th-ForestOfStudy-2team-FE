import { useState, useEffect, useRef } from 'react';
import { formatTime } from '@/utils/formatTime';

export function useTimer(totalSeconds) {
  const [timeLeft, setTimeLeft] = useState(totalSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    setTimeLeft(totalSeconds);
  }, [totalSeconds]);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, timeLeft]);

  return {
    timeLeft,
    formattedTime: formatTime(timeLeft),
    isRunning,
    setIsRunning,
  };
}

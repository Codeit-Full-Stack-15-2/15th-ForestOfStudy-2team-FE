import { useState, useEffect } from 'react';
import {formatTime} from '@/utils/formatTime'

export function useTimer(totalSeconds) {
  const [timeLeft, setTimeLeft] = useState(totalSeconds);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    setTimeLeft(totalSeconds);
  }, [totalSeconds]);

  useEffect(() => {
    let id;
    if (isRunning && timeLeft > 0) {
        id  = setInterval(()=>{
            setTimeLeft((prev) => prev -1);
        }, 1000);
    }
    return () => clearInterval(id);
  }, [isRunning, timeLeft]);

  return {
    timeLeft,
    formattedTime: formatTime(timeLeft),
    isRunning,
    setIsRunning,
  }
}

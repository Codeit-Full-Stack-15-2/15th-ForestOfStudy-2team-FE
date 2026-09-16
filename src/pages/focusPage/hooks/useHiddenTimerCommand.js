import { useEffect, useState } from 'react';

const SECRET_CODE = 'fast';

export function useHiddenTimerCommand() {
  const [isDemoMode, setIsDemoMode] = useState(false);

  useEffect(() => {
    let typed = '';

    const handleKeyDown = (e) => {
      typed += e.key.toLowerCase();
      typed = typed.slice(-SECRET_CODE.length);

      if (typed === SECRET_CODE) {
        setIsDemoMode((prev) => !prev);
        typed = '';
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return isDemoMode;
}
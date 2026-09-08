export function formatTime(seconds) {
  const isNegative = seconds < 0;
  const absSeconds = Math.abs(seconds);
  const mins = Math.floor(absSeconds / 60);
  const secs = absSeconds % 60;
  const positiveFormattedTime = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  const negativeFormattedTime = `-${positiveFormattedTime}`
  return isNegative ? negativeFormattedTime: positiveFormattedTime;
}
export const calculateEarnedPoints = (durationInSeconds) => {
  const BASE_POINT = 3;
  const targetMinutes = Math.floor(durationInSeconds / 60);
  const BONUS_POINT = Math.floor(targetMinutes / 10);

  return BASE_POINT + BONUS_POINT;
};
export const formatTime = (time: number): string => {
  const seconds = Math.floor(time % 60);
  const minutes = Math.floor(time / 60) % 60;
  const hours = Math.floor(time / 3600);

  const secondsStr = seconds < 10 ? `0${seconds}` : seconds;

  if(hours == 0)
    return `${minutes}:${secondsStr}`

  return `${hours}:${minutes}:${secondsStr}`;
}
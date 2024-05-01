export interface IPlayerState {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  played: number;
  playedSeconds: number;
  loaded: number;
  loadedSeconds: number;
  durationSeconds: number;
  isSeeking: boolean;
  isFullScreen: boolean;
  buffer : boolean;
}
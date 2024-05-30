import {FC, RefObject, MouseEvent, useRef, Dispatch, SetStateAction, useState} from "react";
import styles from "./progress-bar.module.scss";
import ReactPlayer from "react-player";
import {IPlayerState} from "@/features/player/models/types.ts";
import {formatTime} from "@/features/player/helpers/format-time.ts";

interface IProps {
  playerRef: RefObject<ReactPlayer>;
  playerState: IPlayerState;
  setPlayerState:  Dispatch<SetStateAction<IPlayerState>>;
}

const ProgressBar: FC<IProps> = (props) => {
  const timeLineRef = useRef<HTMLDivElement>(null);

  const [spanOffset, setSpanOffset] = useState(0);
  const [spanText, setSpanText] = useState("0");

  const progressBarMouseMove = (event: MouseEvent<HTMLDivElement>) => {

    const timelineWidth = timeLineRef.current!.clientWidth;
    const offsetX = event.nativeEvent.offsetX < 0 ? 0 : event.nativeEvent.offsetX;
    const seekPercent = offsetX / timelineWidth;

    setSpanOffset(offsetX < 20 ? 20 : (offsetX > timelineWidth - 20) ? timelineWidth - 20 : offsetX - 4);
    setSpanText(formatTime(seekPercent * props.playerRef.current!.getDuration()))

    if (!props.playerState.isSeeking)
      return;

    props.setPlayerState({...props.playerState, played: seekPercent});
    props.playerRef.current!.seekTo(seekPercent);
  }

  const progressBarMouseUp = () => {
    props.setPlayerState({...props.playerState, isSeeking: false});
  }

  const progressBarMouseDown = () => {
    props.setPlayerState({...props.playerState, isSeeking: true});
  }

  const progressBarClick = (event: MouseEvent<HTMLDivElement>) => {
    const timelineWidth = timeLineRef.current!.clientWidth;

    const offsetX = event.nativeEvent.offsetX < 0 ? 0 : event.nativeEvent.offsetX;
    const seekPercent = offsetX / timelineWidth;

    props.setPlayerState({...props.playerState, played: seekPercent});
    props.playerRef.current!.seekTo(seekPercent);
  }

  return (
    <div
      className={styles.progressBarContainer}
      onMouseDown={progressBarMouseDown}
      onMouseUp={progressBarMouseUp}
      onMouseLeave={progressBarMouseUp}
      onMouseMoveCapture={progressBarMouseMove}
      onClick={progressBarClick}
    >
      <div
        className={styles.timeLine}
        ref={timeLineRef}
      >
        <span style={{left: `${spanOffset}px`}}>
          {spanText}
        </span>
        <div
          className={styles.progressBar}
          style={{width: `${props.playerState.played * 100}%`}}
          aria-expanded={(props.playerState.played * 100) > 2}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
import {CSSProperties, FC, useMemo, useRef, useState} from "react";
import styles from "./player.module.scss";
import ReactPlayer from "react-player";
import Hls from "hls.js";
import {Button, FlexContainer, IOption, Paragraph} from "@/shared/ui-kit";
import ProgressBar from "@/features/player/ui/progress-bar/progress-bar.tsx";
import {OnProgressProps} from "react-player/base";
import {IPlayerState} from "@/features/player/models/types.ts";
import {FaCompress, FaExpand, FaPause, FaPlay} from "react-icons/fa";
import {formatTime} from "@/features/player/helpers/format-time.ts";
import MenuButton from "@/features/player/ui/menu-button/menu-button.tsx";

interface IProps {
  src?: string;
  onPlay?: () => void;
  styles?: CSSProperties;
  className?: string;
}

const Player: FC<IProps> = (props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<ReactPlayer>(null);

  const [levelsOptions, setLevelsOptions] = useState<IOption[]>([]);
  const [playerState, setPlayerState] = useState<IPlayerState>({
    isPlaying: false,
    isMuted: false,
    volume: 0.5,
    played: 0,
    playedSeconds: 0,
    loaded: 0,
    loadedSeconds: 0,
    durationSeconds: 0,
    isSeeking: false,
    isFullScreen: false,
    buffer : true
  });

  const timeString = useMemo(() => {
    const played = formatTime(Math.round(playerState.playedSeconds));
    const duration = formatTime(Math.round(playerState.durationSeconds));

    return `${played}/${duration}`;
  }, [playerState.playedSeconds, playerState.durationSeconds])

  const onReady = (player: ReactPlayer) => {
    const hls = player.getInternalPlayer("hls") as Hls

    setLevelsOptions(hls.levels.map((value, index) => {
      return {label: value.height.toString(), value: index}
    }))
  }

  const onDuration = (duration: number) => {
    setPlayerState({...playerState, durationSeconds: duration});
  }

  const onProgress = (state: OnProgressProps) => {
    if (playerState.isSeeking)
      return

    if (state.played === 1) {
      setPlayerState((prevState) => {
        return { ...prevState, isPlaying: false};
      });
    }

    setPlayerState((prevState) => {
      return { ...prevState, ...state};
    });
  };

  const togglePlay = () => {

    if (!playerState.isPlaying && props.onPlay)
      props.onPlay();

    setPlayerState({...playerState, isPlaying: !playerState.isPlaying});
  }

  const toggleFullScreen = () => {
    if (document.fullscreenElement !== containerRef.current) {
      containerRef.current!.requestFullscreen().then();
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.screen.orientation.lock("landscape-primary");
      setPlayerState({...playerState, isFullScreen: true});
    }
    else {
      document.exitFullscreen().then();
      window.screen.orientation.unlock();
      setPlayerState({...playerState, isFullScreen: false});
    }
  }

  return (
    <div className={styles.playerContainer} ref={containerRef}>
      <div className={styles.reactPlayerContainer} onClick={togglePlay}>
        <ReactPlayer
          ref={playerRef}
          onReady={onReady}
          onDuration={onDuration}
          onProgress={onProgress}
          url={props.src}
          width={"100%"}
          height={"100%"}
          playing={playerState.isPlaying}
        />
      </div>
      <div className={styles.controlsContainer}>
        {!playerState.isPlaying && (
          <FlexContainer className={styles.middleContainer}>
            <Button icon={<FaPlay/>} shape="square" type="outline" onClick={togglePlay}/>
          </FlexContainer>
        )}

        <FlexContainer className={styles.bottomContainer} align="center">
          <Button
            icon={playerState.isPlaying ? <FaPause/> : <FaPlay/>}
            shape="square" type="outline"
            onClick={togglePlay}
            styles={{width: 18, height: 18}}
          />
          <ProgressBar
            playerRef={playerRef}
            playerState={playerState}
            setPlayerState={setPlayerState}
          />
          <Paragraph fontSize="small">
            {timeString}
          </Paragraph>
          <MenuButton playerRef={playerRef} levelsOptions={levelsOptions}/>
          <Button
            icon={playerState.isFullScreen ? <FaCompress/> : <FaExpand/>}
            shape="square"
            type="outline"
            onClick={toggleFullScreen}
            styles={{width: 18, height: 18}}
          />
        </FlexContainer>
      </div>
    </div>
  )
};

export default Player;
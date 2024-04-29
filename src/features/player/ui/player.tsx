import {FC, useRef, useState} from "react";
import styles from "./player.module.scss";
import ReactPlayer from "react-player";
import Hls from "hls.js";
import {Button, IOption, RoundButton, Select} from "@/shared/ui-kit";
import {AiOutlineFullscreen, AiOutlinePlayCircle} from "react-icons/ai";

interface IProps {
  src: string;
}

const Player: FC<IProps> = (props) => {
  const div = useRef<HTMLDivElement>(null);
  const player = useRef<ReactPlayer>(null);

  const [levels, setLevels] = useState<IOption[]>([]);
  const [currentLevel, setCurrentLevel] = useState<number>(0);

  const [episode, setEpisode] = useState<string[]>([]);

  const [videoState, setVideoState] = useState({
    playing: false,
    muted: false,
    volume: 0.5,
    played: 0,
    seeking: false,
    Buffer : true
  });

  const onReady = (player: ReactPlayer) => {
    const hls = player.getInternalPlayer("hls") as Hls

    setLevels(hls.levels.map((value, index) => {
      return {label: value.height.toString(), value: index}
    }))
  }

  const changeLevel = (level: number[]) => {
    setCurrentLevel(level[0]);
    player.current!.getInternalPlayer("hls").currentLevel = level[0]
  }

  const togglePlay = () => {
    setVideoState({ ...videoState, playing: !videoState.playing });
  }

  const toggleFullScreen = () => {
    if (document.fullscreenElement !== div.current) {
      div.current!.requestFullscreen().then();
    }
    else {
      document.exitFullscreen().then()
    }
  }

  return (
    <div className={styles.playerContainer} ref={div}>
      <ReactPlayer
        ref={player}
        onReady={onReady}
        className={styles.reactPlayer}
        url={props.src}
        width={"100%"}
        height={"100%"}
        playing={videoState.playing}
        full
      />
      <div className={styles.controlsContainer}>
        <div className={styles.headerContainer}>
          <Select
            values={episode}
            setValues={(data) => setEpisode(data as string[])}
            placeholder="Сезон"
            className={styles.select}
          />
          <Select
            values={episode}
            setValues={(data) => setEpisode(data as string[])}
            placeholder="Серія"
            className={styles.select}
          />
        </div>

        <div className={styles.middleContainer}>
          <RoundButton icon={<AiOutlinePlayCircle/>} onClick={togglePlay}/>
        </div>

        <div className={styles.bottomContainer}>
          <Button type="outline" shape="square" icon={<AiOutlinePlayCircle/>} onClick={togglePlay}/>
          <Select
            options={levels}
            values={[currentLevel]}
            setValues={(data) => changeLevel(data as number[])}
            placeholder="Якість"
            className={styles.select}
          />
          <Button type="outline" shape="square" icon={<AiOutlineFullscreen/>} onClick={toggleFullScreen}/>
        </div>
      </div>
    </div>
  )
};

export default Player;
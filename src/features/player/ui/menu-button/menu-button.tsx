import {FC, RefObject, useRef, useState} from "react";
import styles from "./menu-button.module.scss";
import ReactPlayer from "react-player";
import {Button, Dropdown, IOption} from "@/shared/ui-kit";
import {FaCog} from "react-icons/fa";

interface IProps {
  playerRef: RefObject<ReactPlayer>;
  levelsOptions: IOption[];
}

const MenuButton: FC<IProps> = (props) => {
  const ref = useRef<HTMLDivElement>(null);

  const [currentLevel, setCurrentLevel] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(false);

  const changeLevel = (level: number) => {
    setIsOpen(false);
    setCurrentLevel(level);
    props.playerRef.current!.getInternalPlayer("hls").currentLevel = level;
  }

  return (
    <div ref={ref} className={styles.container}>
      <Button
        icon={<FaCog/>}
        shape="square" type="outline"
        onClick={() => setIsOpen(!isOpen)}
        styles={{width: 18, height: 18}}
      />
      <Dropdown
        className={styles.dropdown}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        parentRef={ref}
        openPosition={"up"}
      >
        {props.levelsOptions.map((item, index) => (
          <Button
            key={index}
            color={currentLevel === item.value ? "accent" : "primary"}
            className={styles.items}
            type="outline"
            size="small"
            text={item.label}
            onClick={() => changeLevel(item.value as number)}
          />
        ))}
      </Dropdown>
    </div>
  );
};

export default MenuButton;
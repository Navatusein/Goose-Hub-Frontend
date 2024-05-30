import {FC} from "react";
import styles from "./screenshot-editable.module.scss";
import {RoundButton} from "@/shared/ui-kit";
import {AiOutlineDelete} from "react-icons/ai";

interface IProps {
  url: string;
  path?: string;
  onDelete: (path?: string) => void;
}

const ScreenshotEditable: FC<IProps> = (props) => {
  return (
    <div className={styles.screenshot}>
      <img src={props.url} alt=""/>
      <RoundButton icon={<AiOutlineDelete/>} color="danger" className={styles.deleteButton} onClick={() => props.onDelete(props.path)}/>
    </div>
  );
};

export default ScreenshotEditable;
import {FC} from "react";
import styles from "./screenshot.module.scss";

interface IProps {
  url: string;
}

const Screenshot: FC<IProps> = (props) => {
  return (
    <div className={styles.screenshot}>
      <img src={props.url} alt=""/>
    </div>
  );
};

export default Screenshot;
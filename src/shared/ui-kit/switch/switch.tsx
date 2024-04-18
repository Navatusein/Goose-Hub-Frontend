import {CSSProperties, FC} from "react";
import styles from "./switch.module.scss";

interface IProps {
  styles?: CSSProperties;
  className?: string;
}

const Switch: FC<IProps> = (props) => {
  return (
    <label className={styles.container}>
      <input
        type="checkbox"
        style={props.styles}
        className={props.className}/>
      <span className={styles.slider}></span>
    </label>

);
}

export default Switch;
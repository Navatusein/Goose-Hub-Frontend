import {ChangeEventHandler, CSSProperties, FC} from "react";
import styles from "./switch.module.scss";

interface IProps {
  styles?: CSSProperties;
  className?: string;
  checked?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

const Switch: FC<IProps> = (props) => {
  return (
    <label className={styles.container}>
      <input
        type="checkbox"
        style={props.styles}
        className={props.className}
        onChange={props.onChange}
        checked={props.checked}
      />
      <span className={styles.slider}></span>
    </label>

);
}

export default Switch;
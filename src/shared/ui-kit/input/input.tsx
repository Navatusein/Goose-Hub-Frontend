import {CSSProperties, FC, ReactNode} from "react";
import styles from "./input.module.scss";

interface IProps {
  text?: string;
  styles?: CSSProperties;
  className?: string;
  icon: ReactNode;
}

const Input: FC<IProps> = (props) => {
  return (
    <div
      style={props.styles}
      className={`${props.className} ${styles.container}`}
    >
      {props.icon && <div className={styles.icon}>{props.icon}</div>}

      <input 
        type="text"
        placeholder={props.text}
        className={styles.input}
      />
      
    </div>
  );
}

export default Input;
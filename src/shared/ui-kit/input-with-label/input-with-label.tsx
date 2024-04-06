import {CSSProperties, FC, ReactNode} from "react";
import styles from "./input-with-label.module.scss";

interface IProps {
  text?: string;
  label?: string;
  styles?: CSSProperties;
  className?: string;
  icon?: ReactNode;
}

const InputWithLabel: FC<IProps> = (props) => {
  return (
    <div
      style={props.styles}
      className={`${props.className} ${styles.container}`}
    >
      {props.label}
      <input 
        type="text"
        placeholder={props.text}
        className={styles.input}
      />
    </div>
  );
}

export default InputWithLabel;
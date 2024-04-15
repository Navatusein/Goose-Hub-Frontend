import {CSSProperties, FC, ReactNode} from "react";
import styles from "./input.module.scss";

interface IProps {
  text?: string;
  styles?: CSSProperties;
  className?: string;
  icon: ReactNode;
  type?: "default" | "disabled" | "error";
}

const Input: FC<IProps> = (props) => {
  const types = {"default": styles.default, "disabled": styles.disabled, "error": styles.error};
  return (
    <div
      style={props.styles}
      className={`${props.className} ${styles.container}`}
    >
      <div className={styles.group}>
        <input
          type="text"
          placeholder={props.text}
          className={`${styles.input} ${types[props.type ?? "default"]}`}
        />
        <div className={styles.icon}>
          {props.icon}
        </div>
      </div>
      {props.type === "error" && <p>Error</p>}
    </div>
  );
}

export default Input;
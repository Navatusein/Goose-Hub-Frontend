import {CSSProperties, FC, ReactNode} from "react";
import styles from "./input.module.scss";

interface IProps {
  text: string;
  type?: "text";
  icon?: ReactNode;
  disabled?: boolean;
  error?: string;
  styles?: CSSProperties;
  className?: string;
}

const Input: FC<IProps> = (props) => {
  return (
    <div
      style={props.styles}
      className={`${styles.container} ${props.className ?? ""}`}
    >
      <label className={styles.label}>
        {props.icon && <div className={styles.icon}>{props.icon}</div>}
        <input
          className={`${styles.field} ${props.error && styles.error}`}
          type={props.type ?? "text"}
          placeholder={props.text}
          disabled={props.disabled}
        />
      </label>
      {props.error && <p>{props.error}</p>}
    </div>
  );
}

export default Input;
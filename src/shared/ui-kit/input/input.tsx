import {ChangeEventHandler, CSSProperties, FC, ReactNode} from "react";
import styles from "./input.module.scss";

interface IProps {
  placeholder?: string;
  type?: string;
  icon?: ReactNode;
  disabled?: boolean;
  error?: string;
  styles?: CSSProperties;
  className?: string;
  name?: string;
  value: string | undefined;
  onChange: ChangeEventHandler<HTMLInputElement>;
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
          className={`${styles.field} ${props.error !== undefined && styles.error}`}
          type={props.type ?? "text"}
          placeholder={props.placeholder}
          disabled={props.disabled}
          name={props.name}
          value={props.value}
          onChange={props.onChange}
        />
      </label>
      {props.error && <p>{props.error}</p>}
    </div>
  );
}

export default Input;
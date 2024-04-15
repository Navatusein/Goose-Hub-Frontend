import {CSSProperties, FC, MouseEventHandler, ReactNode} from "react";
import styles from "./round-button.module.scss";

interface IProps {
  text?: string;
  icon: ReactNode;
  styles?: CSSProperties;
  className?: string;
  onClick?: MouseEventHandler;
  type?: "default" | "accent" | "danger";
}

const RoundButton: FC<IProps> = (props) => {
  const types = {"default": styles.default, "accent": styles.accent, "danger": styles.danger};
  return (
    <div className={styles.container}>
      <button
        className={`${styles.default} ${props.className} ${types[props.type ?? "default"]}`}
        style={props.styles}
        onClick={props.onClick}
      >
      {props.icon && <div className={styles.icon}>{props.icon}</div>}
      </button>
      <label>
        {props.text}
      </label>
    </div>

  );
}

export default RoundButton;
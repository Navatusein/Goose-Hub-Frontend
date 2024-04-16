import {CSSProperties, FC, MouseEventHandler, ReactNode} from "react";
import styles from "./round-button.module.scss";

interface IProps {
  text?: string;
  icon: ReactNode;
  styles?: CSSProperties;
  className?: string;
  onClick?: MouseEventHandler;
  color?: "primary" | "accent" | "danger";
}

const RoundButton: FC<IProps> = (props) => {
  const colors = {"primary": "", "accent": styles.accentColor, "danger": styles.dangerColor};
  return (
    <div className={styles.container}>
      <button
        className={`${styles.button} ${colors[props.color ?? "primary"]} ${props.className}`}
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
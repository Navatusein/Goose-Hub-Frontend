import {CSSProperties, FC, MouseEventHandler, ReactNode} from "react";
import styles from "./button.module.scss";

interface IProps {
  text?: string;
  icon?: ReactNode;
  styles?: CSSProperties;
  className?: string;
  onClick?: MouseEventHandler;
  color?: "primary" | "accent" | "danger";
  type?: "default" | "outline" | "round";
  size?: "default" | "small";
}

const Button: FC<IProps> = (props) => {
  const types = {"default": "", "outline": styles.outlineType, "round": styles.roundType};
  const colors = {"primary": "", "accent": styles.accentColor, "danger": styles.dangerColor};
  const sizes = {"default": "", "small": styles.smallSize}

  const buttonStyles = `${types[props.type ?? "default"]} ${colors[props.color ?? "primary"]} ${sizes[props.size ?? "default"]}`;

  return (
    <button
      className={`${styles.button} ${buttonStyles} ${props.className ?? ""}`}
      style={props.styles}
      onClick={props.onClick}
    >
      {props.icon && <div className={styles.icon}>{props.icon}</div>}
      {props.text}
    </button>
  );
};

export default Button;
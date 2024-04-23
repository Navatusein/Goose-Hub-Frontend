import {CSSProperties, FC, MouseEventHandler, ReactNode} from "react";
import styles from "./button.module.scss";

interface IProps {
  text?: string;
  icon?: ReactNode;
  styles?: CSSProperties;
  className?: string;
  onClick?: MouseEventHandler;
  color?: "primary" | "accent" | "danger";
  type?: "default" | "outline";
  shape?: "default" | "round" | "square";
  size?: "default" | "small";
  disabled?: boolean;
}

const Button: FC<IProps> = (props) => {
  const types = {"default": "", "outline": styles.outlineType};
  const shapes = {"default": "", "round": styles.roundShape, "square": styles.squareShape}
  const colors = {"primary": "", "accent": styles.accentColor, "danger": styles.dangerColor};
  const sizes = {"default": "", "small": styles.smallSize}

  const configStyles = `
    ${types[props.type ?? "default"]} 
    ${shapes[props.shape ?? "default"]} 
    ${colors[props.color ?? "primary"]} 
    ${sizes[props.size ?? "default"]}
    `;

  return (
    <button
      className={`${styles.button} ${configStyles} ${props.className ?? ""}`}
      style={props.styles}
      onClick={props.onClick}
      disabled={props.disabled}
      aria-disabled={props.disabled}
    >
      {props.icon && <div className={styles.icon}>{props.icon}</div>}
      {props.text}
    </button>
  );
};

export default Button;
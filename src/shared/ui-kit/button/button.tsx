import {CSSProperties, FC, MouseEventHandler, ReactNode} from "react";
import styles from "./button.module.scss";

interface IProps {
  text: string;
  icon?: ReactNode;
  styles?: CSSProperties;
  className?: string;
  onClick?: MouseEventHandler;
  type?: "default" | "defaultAccent" | "outline" | "outlineAccent" | "small";
}

const Button: FC<IProps> = (props) => {
  const types = {"default": styles.default, "defaultAccent": styles.defaultAccent, "outline": styles.outline, "outlineAccent": styles.outlineAccent, "small": styles.small};
  return (
    <button
      className={`${props.className} ${styles.default} ${types[props.type ?? "default"]} `}
      style={props.styles}
      onClick={props.onClick}
    >
      {props.icon && <div className={styles.icon}>{props.icon}</div>}
      {props.text}
    </button>
  );
};

export default Button;
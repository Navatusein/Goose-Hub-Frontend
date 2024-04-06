import {CSSProperties, FC, MouseEventHandler, ReactNode} from "react";
import styles from "./button.module.scss";

interface IProps {
  text: string;
  icon?: ReactNode;
  styles?: CSSProperties;
  className?: string;
  onClick?: MouseEventHandler;
  type?: "default" | "outline" | "small";
}

const Button: FC<IProps> = (props) => {
  const types = {"default": styles.default, "outline": styles.outline, "small": styles.small};
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
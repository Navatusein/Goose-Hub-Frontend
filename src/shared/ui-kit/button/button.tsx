import {CSSProperties, FC, MouseEventHandler, ReactNode} from "react";
import styles from "./button.module.scss";

interface IProps {
  text: string;
  icon?: ReactNode;
  styles?: CSSProperties;
  className?: string;
  onClick?: MouseEventHandler;
}

const Button: FC<IProps> = (props) => {
  return (
    <button
      className={`${styles.button} ${props.className}`}
      style={props.styles}
      onClick={props.onClick}
    >
      {props.icon && <div className={styles.icon}>{props.icon}</div>}
      {props.text}
    </button>
  );
};

export default Button;
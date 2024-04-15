import {CSSProperties, FC, ReactNode} from "react";
import styles from "./text-with-icon.module.scss";

interface IProps {
  text: string;
  icon: ReactNode;
  styles?: CSSProperties;
  className?: string;
}

const TextWithIcon: FC<IProps> = (props) => {
  return (
    <div
      style={props.styles}
      className={`${props.className} ${styles.container}`}
    >
      <div className={styles.icon}>{props.icon}</div>
      {props.text}
    </div>
  );
}

export default TextWithIcon;
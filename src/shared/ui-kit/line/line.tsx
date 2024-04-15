import {CSSProperties, FC} from "react";
import styles from "./line.module.scss";

interface IProps {
  styles?: CSSProperties;
  className?: string;
  type?: "default" | "secondary";
}

const Line: FC<IProps> = (props) => {
  const types = {"default": styles.line, "secondary": styles.secondary};
  return (
    <div
      style={props.styles}
      className={`${styles.line} ${props.className} ${types[props.type ?? "default"]}`}
    />
  );
}

export default Line;


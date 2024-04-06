import {CSSProperties, FC} from "react";
import styles from "./text-area.module.scss";

interface IProps {
  styles?: CSSProperties;
  className?: string;
}

const TextArea: FC<IProps> = (props) => {
  return (
    <textarea
      style={props.styles}
      className={`${props.className} ${styles.textarea}`}
      placeholder="Text"
    />
  );
}

export default TextArea;
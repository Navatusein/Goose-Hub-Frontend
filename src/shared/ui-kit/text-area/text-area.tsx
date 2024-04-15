import {CSSProperties, FC} from "react";
import styles from "./text-area.module.scss";

interface IProps {
  styles?: CSSProperties;
  className?: string;
  type?: "default" | "disabled";
}

const TextArea: FC<IProps> = (props) => {
  const types = {"default": styles.textarea, "disabled": styles.disabled};
  return (
    <textarea
      style={props.styles}
      className={`${props.className} ${types[props.type ?? "default"]}`}
      placeholder="Text"
    />
  );
}

export default TextArea;
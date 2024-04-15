import {CSSProperties, FC, ReactNode} from "react";
import styles from "./input-with-label.module.scss"

interface IProps {
  text?: string;
  label?: string;
  styles?: CSSProperties;
  className?: string;
  icon?: ReactNode;
  type?: "default" | "inline";
}

const InputWithLabel: FC<IProps> = (props) => {
  const types = {"default": styles.container, "inline": styles.inline};
  return (
    <div
      style={props.styles}
      className={`${props.className} ${styles.container} ${types[props.type ?? "default"]}`}
    >
      {props.label}
      <div className={styles.group}>
        <input
          type="text"
          placeholder={props.text}
          className={styles.input}
        />
        <div className={styles.icon}>
          {props.icon}
        </div>
      </div>

    </div>
  );
}

export default InputWithLabel;
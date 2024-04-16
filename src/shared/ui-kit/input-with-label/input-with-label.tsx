import {CSSProperties, FC, ReactNode} from "react";
import styles from "./input-with-label.module.scss"

interface IProps {
  label: string;
  children: ReactNode;
  styles?: CSSProperties;
  className?: string;
  type?: "default" | "inline";
}

const InputWithLabel: FC<IProps> = (props) => {
  const types = {"default": "", "inline": styles.inline};
  return (
    <label
      style={props.styles}
      className={`${styles.container} ${types[props.type ?? "default"]} ${props.className ?? ""}`}
    >
      {props.label}
      {props.children}
    </label>
  );
}

export default InputWithLabel;
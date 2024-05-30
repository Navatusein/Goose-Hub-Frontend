import {CSSProperties, FC, ReactNode, useId} from "react";
import styles from "./input-with-label.module.scss"

interface IProps {
  label: string;
  children: ReactNode;
  styles?: CSSProperties;
  className?: string;
  type?: "default" | "inline";
}

const InputWithLabel: FC<IProps> = (props) => {
  const id = useId();
  const types = {"default": "", "inline": styles.inline};
  return (
    <label
      htmlFor={id}
      style={props.styles}
      className={`${styles.container} ${types[props.type ?? "default"]} ${props.className ?? ""}`}
    >
      {props.label}
      {props.children}
    </label>
  );
}

export default InputWithLabel;
import {CSSProperties, FC, ReactNode} from "react";
import styles from "./alert.module.scss";

interface IProps {
  children: ReactNode;
  styles?: CSSProperties;
  className?: string;
  color: "primary" | "accent" | "danger";
}

const Alert: FC<IProps> = (props) => {
  const colors   = {"primary": styles.primary, "accent": styles.accent, "danger": styles.danger};
  return(
    <div 
      className={`${styles.alert} ${colors[props.color ?? "primary"]} ${props.className ?? ""}`}
      style={props.styles}
    >
      {props.children}
    </div>
  );
}

export default Alert;
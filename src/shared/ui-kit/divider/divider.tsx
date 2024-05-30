import {CSSProperties, FC} from "react";
import styles from "./divider.module.scss";

interface IProps {
  styles?: CSSProperties;
  className?: string;
  color?: "primary" | "secondary";
}

const Divider: FC<IProps> = (props) => {
  const colors = {"primary": "", "secondary": styles.secondary};

  return (
    <hr
      style={props.styles}
      className={`${styles.divider} ${colors[props.color ?? "primary"]} ${props.className ?? ""}`}
    />
  );
}

export default Divider;


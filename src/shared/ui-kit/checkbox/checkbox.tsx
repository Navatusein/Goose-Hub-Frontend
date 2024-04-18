import {ReactNode, CSSProperties, FC} from "react";
import styles from "./checkbox.module.scss"

interface IProps {
  styles?: CSSProperties;
  className?: string;
  icon: ReactNode;
}

const Checkbox: FC<IProps> = (props) => {
  return (
    <label className={styles.container}>
      <input
        type="checkbox"
        style={props.styles}
        className={props.className}
      />
      <span className={styles.checkmark}>{props.icon}</span>
    </label>
  );
};

export default Checkbox;
import {CSSProperties, FC} from "react";
import styles from "./checkbox.module.scss"
import {AiOutlineClose} from "react-icons/ai";

interface IProps {
  styles?: CSSProperties;
  className?: string;
}

const Checkbox: FC<IProps> = (props) => {
  return (
    <label className={styles.container}>
      <input
        type="checkbox"
        style={props.styles}
        className={props.className}
      />
      <div className={styles.checkmark}><AiOutlineClose/></div>
    </label>
  );
};

export default Checkbox;
import {ChangeEventHandler, CSSProperties, FC} from "react";
import styles from "./checkbox.module.scss"
import {AiOutlineClose} from "react-icons/ai";

interface IProps {
  styles?: CSSProperties;
  className?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

const Checkbox: FC<IProps> = (props) => {
  return (
    <label className={styles.container}>
      <input
        type="checkbox"
        style={props.styles}
        className={props.className}
        onChange={props.onChange}
      />
      <div className={styles.checkmark}><AiOutlineClose/></div>
    </label>
  );
};

export default Checkbox;
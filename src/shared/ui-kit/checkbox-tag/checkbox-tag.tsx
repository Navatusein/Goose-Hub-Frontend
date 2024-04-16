import {ChangeEventHandler, CSSProperties, FC} from "react";
import styles from "./checkbox-tag.module.scss"

interface IProps {
  text: string;
  styles?: CSSProperties;
  className?: string;
  onChange?: ChangeEventHandler;
}

const CheckboxTag: FC<IProps> = (props) => {
  return (
    <label
      className={`${styles.checkboxTag} ${props.className ?? ""}`}
      style={props.styles}
    >
      <input type="checkbox" onChange={props.onChange}/>
      {props.text}
    </label>
  );
};

export default CheckboxTag;
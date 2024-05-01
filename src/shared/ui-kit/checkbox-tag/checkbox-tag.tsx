import {ChangeEventHandler, CSSProperties, FC} from "react";
import styles from "./checkbox-tag.module.scss"

interface IProps {
  text: string;
  styles?: CSSProperties;
  className?: string;
  checked?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

const CheckboxTag: FC<IProps> = (props) => {
  return (
    <label
      className={`${styles.checkboxTag} ${props.className ?? ""}`}
      style={props.styles}
    >
      <input type="checkbox" onChange={props.onChange} checked={props.checked}/>
      {props.text}
    </label>
  );
};

export default CheckboxTag;
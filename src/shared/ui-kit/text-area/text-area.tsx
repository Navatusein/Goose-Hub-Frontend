import {ChangeEventHandler, CSSProperties, FC} from "react";
import styles from "./text-area.module.scss";

interface IProps {
  placeholder: string;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  value?: string;
  rows?: number;
  disabled?: boolean;
  error?: string;
  styles?: CSSProperties;
  className?: string;
}

const TextArea: FC<IProps> = (props) => {
  return (
    <div
      style={props.styles}
      className={`${styles.container} ${props.className}`}
    >
      <textarea
        style={props.styles}
        className={`${styles.field} ${props.error && styles.error} ${props.className ?? ""}`}
        placeholder={props.placeholder}
        disabled={props.disabled ?? false}
        onChange={props.onChange}
        value={props.value}
        rows={props.rows ?? 3}
      />
      {props.error && <p>{props.error}</p>}
    </div>
  );
}

export default TextArea;
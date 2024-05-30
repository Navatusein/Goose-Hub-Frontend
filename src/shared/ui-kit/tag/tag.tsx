import {CSSProperties, FC, MouseEventHandler, ReactNode} from "react";
import styles from "./tag.module.scss"
import {AiOutlineClose} from "react-icons/ai";

interface IProps {
  children: ReactNode;
  styles?: CSSProperties;
  className?: string;
  onClose?: MouseEventHandler;
  color?: "primary" | "accent" | "danger";
  size?: "default" | "auto";
}

const Tag: FC<IProps> = (props) => {
  const colors = {"primary": "", "accent": styles.accent, "danger": styles.danger};
  const sizes = {"default": "", "auto": styles.auto};

  const configStyles = `${colors[props.color ?? "primary"]} ${sizes[props.size ?? "default"]}`;

  return (
    <div 
      className={`${styles.tag} ${configStyles} ${props.className ?? ""}`}
      style={props.styles}
    >
      {props.children}
      {props.onClose && (
        <div className={`${styles.closeButton} ${styles.accentColor}`} onClick={props.onClose}>
          <AiOutlineClose/>
        </div>
      )}
    </div>
  );
}

export default Tag;
import {CSSProperties, FC, ReactNode} from "react";
import styles from "./modal.module.scss";

interface IProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

const Modal: FC<IProps> = (props) => {
  return (
    <>
      <div className={`${styles.modalRoot} ${props.className}`} style={props.style}>
        {props.children}
      </div>
    </>
  );
};

export default Modal;
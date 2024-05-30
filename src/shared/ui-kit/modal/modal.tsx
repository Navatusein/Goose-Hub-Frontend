import {CSSProperties, FC, ReactNode} from "react";
import styles from "./modal.module.scss";
import ReactDOM from "react-dom";

interface IProps {
  isOpen: boolean;
  constShow?: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

const Modal: FC<IProps> = (props) => {
  if (!props.isOpen)
    return null;

  return ReactDOM.createPortal(
    <dialog open={props.isOpen}>
      <div className={styles.modalBackground} onClick={() => props.setIsOpen(false)}/>
      <div className={`${styles.modal} ${props.className}`} style={props.style}>
        {props.children}
      </div>
    </dialog>,
    document.getElementById('modal-root')!
  );
};

export default Modal;
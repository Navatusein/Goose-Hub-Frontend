import {CSSProperties, FC, ReactNode, useEffect, useRef} from "react";
import styles from "./modal.module.scss";
import {useClickOutside} from "@/shared/hooks/use-click-outside.ts";

interface IProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

const Modal: FC<IProps> = (props) => {
  const ref = useRef(null);

  useClickOutside(ref, () => {props.setIsOpen(false)});

  useEffect(() => {
    const body = document.querySelector('body')!;
    body.style.overflow = props.isOpen ? "hidden" : "auto";
  }, [props.isOpen])

  return (
    <>
      <div
        className={`${styles.modalBackground} ${!props.isOpen && styles.hidden}`}
      />
      <div
        className={`${styles.modal} ${props.className} ${!props.isOpen && styles.hidden}`}
        style={props.style}
        ref={ref}
      >
        {props.children}
      </div>
    </>
  );
};

export default Modal;
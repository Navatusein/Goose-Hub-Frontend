import {
  CSSProperties,
  Dispatch,
  FC,
  ReactNode,
  RefObject,
  SetStateAction,
  useRef,
} from "react";
import styles from "./dropdown.module.scss";
import {useClickOutside} from "@/shared/hooks/use-click-outside.ts";

interface IProps {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  parentRef?: RefObject<HTMLElement>;
  styles?: CSSProperties;
  className?: string;
  openPosition?: "up" | "down";
}

const Dropdown: FC<IProps> = (props) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(props.parentRef ?? dropdownRef, () => {
    props.setIsOpen(false)
  });

  const positions = {"up": styles.up, "down": styles.down}

  return (
    <div
      ref={dropdownRef}
      className={`${styles.container} ${props.className ?? ""} ${positions[props.openPosition ?? "down"]} ${!props.isOpen && styles.hidden}`}
    >
      {props.children}
    </div>
  );
};

export default Dropdown;
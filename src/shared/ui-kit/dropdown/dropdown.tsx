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
  centerPosition?: "middle";
}

const Dropdown: FC<IProps> = (props) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(props.parentRef ?? dropdownRef, () => {
    props.setIsOpen(false)
  });

  const positions = {"up": styles.openPositionUp, "down": styles.openPositionDown}
  const center = {"": "", "middle": styles.centerMiddle}

  const configStyles = `${positions[props.openPosition ?? "down"]} ${center[props.centerPosition ?? ""]}`;

  return (
    <div
      ref={dropdownRef}
      className={`${styles.container} ${props.className ?? ""} ${configStyles} ${!props.isOpen && styles.hidden}`}
    >
      {props.children}
    </div>
  );
};

export default Dropdown;
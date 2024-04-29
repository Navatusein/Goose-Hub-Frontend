import {
  CSSProperties,
  Dispatch,
  FC,
  ReactNode,
  RefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState
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
}

const Dropdown: FC<IProps> = (props) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [position, setPosition] = useState<"up" | "down">("down");

  useClickOutside(props.parentRef ?? dropdownRef, () => {
    props.setIsOpen(false)
  });

  const handleDropdownPosition = () => {
    if (!dropdownRef.current)
      return;

    const dropdownHeight = dropdownRef.current.offsetHeight;
    const windowHeight = window.innerHeight;
    const dropdownTop = dropdownRef.current.getBoundingClientRect().top

    // console.log(dropdownHeight, windowHeight, dropdownTop, windowHeight - dropdownTop < dropdownHeight)

    setPosition(windowHeight - dropdownTop < dropdownHeight ? "down" : "up");
  }

  useEffect(() => {
    window.addEventListener("scroll", handleDropdownPosition);
    window.addEventListener("resize", handleDropdownPosition);

    handleDropdownPosition();

    return () => {
      window.removeEventListener("scroll", handleDropdownPosition);
      window.removeEventListener("resize", handleDropdownPosition);
    };
  }, []);

  const positions = {"up": styles.up, "down": styles.down}

  return (
    <div
      ref={dropdownRef}
      className={`${styles.container} ${props.className ?? ""} ${positions[position]} ${!props.isOpen && styles.hidden}`}
    >
      {props.children}
    </div>
  );
};

export default Dropdown;
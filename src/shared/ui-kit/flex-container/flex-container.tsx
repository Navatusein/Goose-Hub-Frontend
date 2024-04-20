import {CSSProperties, FC, ReactNode} from "react";
import styles from "./flex-container.module.scss"

interface IProps {
  children: ReactNode;
  styles?: CSSProperties;
  className?: string;
  gap?: number | "Page";
  vertical?: boolean;
}

const FlexContainer: FC<IProps> = (props) => {
  return (
    <div
      className={`${styles.flexContainer} ${props.vertical === true && styles.vertical} ${props.className ?? ""}`}
      style={{gap: props.gap ?? 10, ...props.styles}}
    >
      {props.children}
    </div>
  );
};

export default FlexContainer;
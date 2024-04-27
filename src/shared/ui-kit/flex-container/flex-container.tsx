import {CSSProperties, FC, ReactNode} from "react";
import styles from "./flex-container.module.scss"

interface IProps {
  children: ReactNode;
  styles?: CSSProperties;
  className?: string;
  gap?: number | "Page";
  vertical?: boolean;
  justify?: "start" | "end" | "center" | "space-between";
  align?: "start" | "end" | "center";
  warp?: boolean;
}

const FlexContainer: FC<IProps> = (props) => {
  const justify = {
    "start": styles.justifyStart,
    "end": styles.justifyEnd,
    "center": styles.justifyCenter,
    "space-between": styles.justifySpaceBetween
  };

  const align = {
    "start": styles.alignStart,
    "end": styles.alignEnd,
    "center": styles.alignCenter
  }

  const configStyles = `${props.justify && justify[props.justify]} ${props.align && align[props.align]} ${props.vertical === true && styles.vertical} ${props.warp === true && styles.warp}`;

  return (
    <div
      className={`${styles.flexContainer} ${configStyles} ${props.className ?? ""}`}
      style={{gap: typeof(props.gap) === "number" ? props.gap : 10, ...props.styles}}
    >
      {props.children}
    </div>
  );
};

export default FlexContainer;
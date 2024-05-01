import {CSSProperties, FC, ReactNode, useMemo} from "react";
import styles from "./flex-container.module.scss"

interface IProps {
  children: ReactNode;
  styles?: CSSProperties;
  className?: string;
  gap?: number | "page";
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

  const configStyles = `${props.justify && justify[props.justify]} ${props.align && align[props.align]} ${props.vertical === true && styles.vertical} ${props.warp === true && styles.warp} ${props.gap === "page" && styles.pageGap}`;

  const gap = useMemo(() => {
    if (props.gap === undefined)
      return 10;

    if (props.gap === "page")
      return undefined

    return props.gap
  }, [props.gap])

  return (
    <div
      className={`${styles.flexContainer} ${configStyles} ${props.className ?? ""}`}
      style={{gap: gap, ...props.styles}}
    >
      {props.children}
    </div>
  );
};

export default FlexContainer;
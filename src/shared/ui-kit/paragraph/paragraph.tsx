import {CSSProperties, FC, ReactNode} from "react";
import styles from "./paragraph.module.scss";

interface IProps {
  children: ReactNode;
  styles?: CSSProperties;
  className?: string;
  color?: "primary" | "secondary" | "accent" | "danger";
  fontSize?: "default" | "small" | "medium" | "large";
}

const Paragraph: FC<IProps> = (props) => {
  const colors = {
    "primary": "",
    "secondary": styles.secondaryColor,
    "accent": styles.accentColor,
    "danger": styles.dangerColor
  };

  const fontSizes = {
    "default": "",
    "small": styles.small,
    "medium": styles.medium,
    "large": styles.extraLarge,
    "extra-large": styles.extraLarge
  }

  const configStyles = `${colors[props.color ?? "primary"]} ${fontSizes[props.fontSize ?? "default"]}`;

  return (
    <p className={`${styles.text} ${configStyles} ${props.className ?? ""}`}>
      {props.children}
    </p>
  );
};

export default Paragraph;
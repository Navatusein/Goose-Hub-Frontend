import { CSSProperties, FC } from "react";
import {Link as ReactRouterLink} from "react-router-dom";
import styles from "./link.module.scss";

interface IProps{
  text: string;
  styles?: CSSProperties;
  className?: string;
  href: string;
  color?: "primary" | "accent" | "danger";
  size?: "default" | "small";
}

const Link: FC<IProps> = (props) => {
  const colors = {"primary": "", "accent": styles.accentColor, "danger": styles.dangerColor};
  const sizes = {"default": "", "small": styles.smallSize}

  const linkStyles = `${colors[props.color ?? "primary"]} ${sizes[props.size ?? "default"]} ${styles.outlineType}`;
  return(
    <ReactRouterLink 
      to={props.href}
      className={`${styles.link} ${linkStyles} ${props.className ?? ""}`}
      style={props.styles}
    >
      {props.text}
    </ReactRouterLink>
  );
}

export default Link;
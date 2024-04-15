import { CSSProperties, FC } from "react";
import {Link as ReactRouterLink} from "react-router-dom";
import styles from "./link.module.scss";

interface IProps{
  text: string;
  styles?: CSSProperties;
  className?: string;
  href: string;
  type?: "default" | "small" | "accent" | "smallAccent";
}

const Link: FC<IProps> = (props) => {
  const types = {"default": styles.link, "small": styles.small, "accent": styles.accent, "smallAccent": styles.smallAccent};
  return(
    <ReactRouterLink 
      to={props.href}
      className={`${styles.link} ${props.className} ${types[props.type ?? "default"]}`}
      style={props.styles}
    >
      {props.text}
    </ReactRouterLink>
  );
}

export default Link;
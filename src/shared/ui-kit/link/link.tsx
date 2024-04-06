import { CSSProperties, FC } from "react";
import {Link as ReactRouterLink} from "react-router-dom";
import styles from "./link.module.scss";

interface IProps{
  text: string;
  styles?: CSSProperties;
  className?: string;
  href: string;
}

const Link: FC<IProps> = (props) => {
  return(
    <ReactRouterLink 
      to={props.href}
      className={`${styles.link} ${props.className}`}    
      style={props.styles}
    >
      {props.text}
    </ReactRouterLink>
  );
}

export default Link;
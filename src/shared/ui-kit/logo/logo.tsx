import {CSSProperties, FC, MouseEventHandler} from "react";
import styles from "./logo.module.scss"
import logoIcon from '@/shared/assets/logo.svg'

interface IProps {
  className?: string;
  style?: CSSProperties;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

const Logo: FC<IProps> = (props) => {
  return (
    <div
      className={`${styles.logo} ${props.onClick && styles.clickable} ${props.className ?? ""}`}
      style={props.style}
      onClick={props.onClick}
    >
      <div className={styles.text}>
        GOOSE
      </div>
      <div className={styles.icon}>
        <img src={logoIcon} alt=""/>
      </div>
      <div className={styles.text}>
        HUB
      </div>
    </div>
  );
};

export default Logo;
import {FC} from "react";
import styles from "./logo.module.scss"
import logoIcon from '@/shared/assets/logo.svg'

const Logo: FC = () => {
  return (
    <div className={styles.logo}>
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
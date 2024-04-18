import {FC} from "react";
import styles from "./footer.module.scss";
import {Divider, Link, Logo} from "@/shared/ui-kit";

const Footer: FC = () => {
  return (
    <div className={styles.footer}>
      <Divider color="primary"/>
      <div className={styles.container}>
        <Logo/>
        <div className={styles.linkContainer}>
          <Link text="Наші контакти" href="/"/>
          <Link text="Правовласникам" href="/"/>
          <Link text="Політика конфіденційності" href="/"/>
        </div>
      </div>
    </div>
  );
};

export default Footer;
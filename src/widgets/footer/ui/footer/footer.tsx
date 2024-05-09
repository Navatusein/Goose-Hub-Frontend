import {CSSProperties, FC} from "react";
import styles from "./footer.module.scss";
import {Divider, Link, Logo} from "@/shared/ui-kit";

interface IProps {
  styles?: CSSProperties;
  className?: string;
}

const Footer: FC<IProps> = (props) => {
  return (
    <footer className={`${styles.footer} ${props.className ?? ""}`} style={props.styles}>
      <Divider color="primary"/>
      <div className={styles.container}>
        <Logo/>
        <nav className={styles.linkContainer}>
          <Link text="Наші контакти" className={styles.link} to="/contacts"/>
          <Link text="Правовласникам" className={styles.link} to="/lawmakers"/>
          <Link text="Політика конфіденційності" className={styles.link} to="/privacy-policy"/>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
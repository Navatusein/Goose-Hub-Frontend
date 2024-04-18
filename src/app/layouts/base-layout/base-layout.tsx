import {FC} from "react";
import {Outlet} from "react-router-dom";
import styles from "./base-layout.module.scss";
import Header from "@/widgets/header/header.tsx";
import Footer from "@/widgets/footer/footer.tsx";
const BaseLayout: FC = () => {
  return (
    <div className={styles.container}>
      <Header/>
      <main className={styles.content}>
        <Outlet/>
      </main>
      <Footer/>
    </div>
  );
};

export default BaseLayout;
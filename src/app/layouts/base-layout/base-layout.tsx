import {FC} from "react";
import {Outlet} from "react-router-dom";
import styles from "./base-layout.module.scss";
const BaseLayout: FC = () => {
  return (
    <>
      <div>Header</div>
      <main className={styles.container}>
        <Outlet/>
      </main>
      <div>Footer</div>
    </>
  );
};

export default BaseLayout;
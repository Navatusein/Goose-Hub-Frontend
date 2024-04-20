import {FC, useState} from "react";
import {Outlet} from "react-router-dom";
import styles from "./base-layout.module.scss";
import {Footer} from "@/widgets/footer";
import {Header} from "@/widgets/header";
import {IContext} from "@/shared/types/types.ts";

const BaseLayout: FC = () => {
  const [isHeaderAbsolute, setIsHeaderAbsolute] = useState<boolean>(false)
  
  return (
    <div className={styles.container}>
      <Header isAbsolute={isHeaderAbsolute}/>
      <main className={styles.content}>
        <Outlet context={{setIsHeaderAbsolute} satisfies IContext}/>
      </main>
      <Footer/>
    </div>
  );
};

export default BaseLayout;
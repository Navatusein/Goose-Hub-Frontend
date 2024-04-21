import {FC, useEffect, useState} from "react";
import {Outlet, useLocation} from "react-router-dom";
import styles from "./base-layout.module.scss";
import {Footer} from "@/widgets/footer";
import {Header} from "@/widgets/header";
import {IContext} from "@/shared/types/types.ts";

const BaseLayout: FC = () => {
  const [isHeaderAbsolute, setIsHeaderAbsolute] = useState<boolean>(false)

  const location = useLocation();

  useEffect(() => {
    console.log(location)
  }, [location]);

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
import {FC} from 'react';
import {Outlet} from "react-router-dom";
import styles from "./profile-layout.module.scss";
import {ProfileCard} from "@/widgets/profile-card";
//import {useHeaderAbsolute} from "@/shared/hooks/use-header-absolute.ts";

const ProfileLayout: FC= () => {
  //useHeaderAbsolute();
  return (
    <div className={styles.container}>
      <main className={styles.content}>
        <ProfileCard/>
        <Outlet/>
      </main>
    </div>
  );
};

export default ProfileLayout;
import {FC} from 'react';
import {Outlet} from "react-router-dom";
import styles from "./profile-layout.module.scss";
import {ProfileCard} from "@/widgets/profile-card";
import {FlexContainer, PageContainer} from "@/shared/ui-kit";
//import {useHeaderAbsolute} from "@/shared/hooks/use-header-absolute.ts";

const ProfileLayout: FC= () => {
  //useHeaderAbsolute();
  return (
    <div className={styles.container}>
      <PageContainer horizontal>
        <main className={styles.content}>
          <FlexContainer className={styles.page} gap={30}>
            <ProfileCard/>
            <Outlet/>
          </FlexContainer>
        </main>
      </PageContainer>
    </div>
  );
};

export default ProfileLayout;
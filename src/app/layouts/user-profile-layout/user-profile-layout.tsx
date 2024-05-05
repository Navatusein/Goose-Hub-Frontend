import {FC} from "react";
import styles from "./user-profile-layout.module.scss";
import {ProfileCard} from "@/widgets/profile-card";
import {PageContainer} from "@/shared/ui-kit";
import {Outlet} from "react-router-dom";

const UserProfileLayout: FC = () => {
  return (
    <PageContainer className={styles.container} horizontal>
      <ProfileCard/>
      <Outlet/>
    </PageContainer>
  );
};

export default UserProfileLayout;
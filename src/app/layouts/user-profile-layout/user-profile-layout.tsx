import {FC, useState} from "react";
import styles from "./user-profile-layout.module.scss";
import {ProfileCard} from "@/widgets/profile-card";
import {PageContainer} from "@/shared/ui-kit";
import {Outlet} from "react-router-dom";

const UserProfileLayout: FC = () => {
  const [isEdit, setIsEdit] = useState(false)
  
  return (
    <PageContainer className={styles.container} horizontal>
      <ProfileCard isEdit={isEdit}/>
      <Outlet context={{setIsEdit}}/>
    </PageContainer>
  );
};

export default UserProfileLayout;
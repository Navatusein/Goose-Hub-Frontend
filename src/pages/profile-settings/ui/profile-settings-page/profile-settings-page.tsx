import {FC} from 'react';
import {FlexContainer} from "@/shared/ui-kit";
import styles from "./profile-settings-page.module.scss";
import {UserProfileSettingsForm} from "@/widgets/user-profile-settings-form";
import {UserAuthSettingsForm} from "@/widgets/user-auth-settings-form";

const ProfileSettingsPage:FC = () => {
  return (
    <FlexContainer className={styles.container} gap="page" vertical>
      <h2>Налаштування</h2>
      <UserProfileSettingsForm/>
      <UserAuthSettingsForm/>
    </FlexContainer>
  );
};

export default ProfileSettingsPage;
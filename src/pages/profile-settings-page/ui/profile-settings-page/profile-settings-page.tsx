import {FC} from 'react';
import {ProfileSettings} from "@/widgets/profile-settings";
import {FlexContainer} from "@/shared/ui-kit";
import styles from "./profile-settings-page.module.scss";

const ProfileSettingsPage:FC = () => {
  return (
    <FlexContainer className={styles.fullWidth} align="start" justify="start" gap={30} vertical>
      <h2>Налаштування</h2>
      <ProfileSettings/>
    </FlexContainer>
  );
};

export default ProfileSettingsPage;
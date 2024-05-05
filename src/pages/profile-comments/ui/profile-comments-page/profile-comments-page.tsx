import {FC} from 'react';
import {FlexContainer} from "@/shared/ui-kit";
import {UserCommentsContainer} from "@/widgets/user-comments-container";
// import styles from "@/pages/profile-settings/ui/profile-settings-page/profile-settings-page.module.scss";

const ProfileCommentsPage: FC = () => {
  return(
    <FlexContainer gap="page" vertical>
      <h2>Ваші коментарі</h2>
      <UserCommentsContainer/>
    </FlexContainer>
  );
};

export default ProfileCommentsPage;
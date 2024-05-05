import {FC} from 'react';
// import styles from "./profile-history-page.module.scss"
import {FlexContainer} from "@/shared/ui-kit";
import {UserHistoryContainer} from "@/widgets/user-history-container";

const ProfileHistoryPage: FC = () => {
  return (
    <FlexContainer gap="page" vertical>
      <h2>Історія перегляду</h2>
      <UserHistoryContainer/>
    </FlexContainer>
  );
};

export default ProfileHistoryPage;
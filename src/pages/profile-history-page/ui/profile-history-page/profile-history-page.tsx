import {FC} from 'react';
import {FlexContainer} from "@/shared/ui-kit";
import {ProfileHistory} from "@/widgets/profile-history";



const ProfileHistoryPage: FC = () => {
  return (
    <FlexContainer align="start" justify="start" gap={30} vertical>
      <h2>Історія перегляду</h2>
      <ProfileHistory/>
    </FlexContainer>
  );
};

export default ProfileHistoryPage;
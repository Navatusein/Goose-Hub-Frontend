import {FC} from 'react';
import {ProfileComments} from "@/widgets/profile-comments";
import {FlexContainer} from "@/shared/ui-kit";

const ProfileCommentsPage: FC = () => {
  return(
    <FlexContainer align="start" justify="start" gap={30} vertical>
      <h2>Ваші коментарі</h2>
      <ProfileComments/>
    </FlexContainer>
  );
};

export default ProfileCommentsPage;
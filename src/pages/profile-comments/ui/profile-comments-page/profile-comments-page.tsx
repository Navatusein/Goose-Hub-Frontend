import {FC, useEffect} from 'react';
import {FlexContainer} from "@/shared/ui-kit";
import {UserCommentsContainer} from "@/widgets/user-comments-container";
import {useOutletContext} from "react-router-dom";
// import styles from "@/pages/profile-settings/ui/profile-settings-page/profile-settings-page.module.scss";

const ProfileCommentsPage: FC = () => {
  const {setIsEdit} = useOutletContext<{setIsEdit: (value: boolean) => void}>();

  useEffect(() => {
    setIsEdit(false);
  });

  return(
    <FlexContainer gap="page" vertical>
      <h2>Ваші коментарі</h2>
      <UserCommentsContainer/>
    </FlexContainer>
  );
};

export default ProfileCommentsPage;
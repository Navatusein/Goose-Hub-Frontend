import {FC, useEffect} from 'react';
import {FlexContainer} from "@/shared/ui-kit";
import {UserCommentsContainer} from "@/widgets/user-comments-container";
import {useOutletContext} from "react-router-dom";
import styles from "./profile-comments-page.module.scss";

const ProfileCommentsPage: FC = () => {
  const {setIsEdit} = useOutletContext<{setIsEdit: (value: boolean) => void}>();

  useEffect(() => {
    setIsEdit(false);
  });

  return(
    <FlexContainer gap="page" vertical className={styles.container}>
      <h2>Ваші коментарі</h2>
      <UserCommentsContainer/>
    </FlexContainer>
  );
};

export default ProfileCommentsPage;
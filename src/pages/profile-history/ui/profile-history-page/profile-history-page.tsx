import {FC, useEffect} from 'react';
// import styles from "./profile-history-page.module.scss"
import {FlexContainer} from "@/shared/ui-kit";
import {UserHistoryContainer} from "@/widgets/user-history-container";
import {useOutletContext} from "react-router-dom";

const ProfileHistoryPage: FC = () => {
  const {setIsEdit} = useOutletContext<{setIsEdit: (value: boolean) => void}>();

  useEffect(() => {
    setIsEdit(false);
  });

  return (
    <FlexContainer gap="page" vertical>
      <h2>Історія перегляду</h2>
      <UserHistoryContainer/>
    </FlexContainer>
  );
};

export default ProfileHistoryPage;
import {FC, useEffect} from "react";
import styles from "./profile-wish-list-page.module.scss";
import {FlexContainer} from "@/shared/ui-kit";
import {WishListContent} from "@/widgets/wish-list-content";
import {useOutletContext} from "react-router-dom";

const ProfileWishListPage: FC = () => {
  const {setIsEdit} = useOutletContext<{setIsEdit: (value: boolean) => void}>();

  useEffect(() => {
    setIsEdit(false);
  });

  return (
    <FlexContainer className={styles.container}>
      <WishListContent/>
    </FlexContainer>
  );
};

export default ProfileWishListPage;
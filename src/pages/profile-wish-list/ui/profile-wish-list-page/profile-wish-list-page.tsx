import {FC} from "react";
import styles from "./profile-wish-list-page.module.scss";
import {FlexContainer} from "@/shared/ui-kit";
import {WishListContent} from "@/widgets/wish-list-content";

const ProfileWishListPage: FC = () => {
  return (
    <FlexContainer className={styles.container}>
      <WishListContent/>
    </FlexContainer>
  );
};

export default ProfileWishListPage;
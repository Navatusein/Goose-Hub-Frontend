import {FC} from "react";
import {FlexContainer} from "@/shared/ui-kit";
import {ProfileWishListContainer} from "@/widgets/profile-wish-list-container";


const ProfileWishListsPage: FC = () => {
  return (
    <FlexContainer gap="page" vertical styles={{width: "100%"}}>
      <h2>Списки</h2>
      <ProfileWishListContainer/>
    </FlexContainer>
  );
};

export default ProfileWishListsPage;
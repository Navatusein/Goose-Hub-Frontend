import {FC, useEffect} from "react";
import {FlexContainer} from "@/shared/ui-kit";
import {ProfileWishListContainer} from "@/widgets/profile-wish-list-container";
import {useOutletContext} from "react-router-dom";


const ProfileWishListsPage: FC = () => {
  const {setIsEdit} = useOutletContext<{setIsEdit: (value: boolean) => void}>();

  useEffect(() => {
    setIsEdit(false);
  });

  return (
    <FlexContainer gap="page" vertical styles={{width: "100%"}}>
      <h2>Списки</h2>
      <ProfileWishListContainer/>
    </FlexContainer>
  );
};

export default ProfileWishListsPage;
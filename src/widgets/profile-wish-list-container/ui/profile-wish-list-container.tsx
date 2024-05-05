import {FC, useState} from "react";
import styles from "./profile-wish-list-container.module.scss";
import {Button, Card, CardGrid, CardStack, FlexContainer, Input, InputWithLabel, Modal} from "@/shared/ui-kit";
import {WishListCard} from "@/features/wish-list-card";
import {useAppSelector} from "@/shared/hooks/use-app-selector.ts";
import {userProfileApi} from "@/entities/user-profile";
import {AiOutlineFileAdd} from "react-icons/ai";
import {IWishList} from "@/entities/wish-list";

const ProfileWishListContainer: FC = () => {
  const {user} = useAppSelector(state => state.user);
  const userProfile = userProfileApi.useFetchQuery(user?.userId ?? "", {skip: user === undefined});
  const [updateProfile] = userProfileApi.useUpdateMutation();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [wishListName, setWishListName] = useState<string>("");
  const [error, setError] = useState<string | undefined>();

  const create = () => {
    if (userProfile.data == undefined)
      return;

    if (wishListName.trim().length == 0) {
      setError("Некоректна назва");
      return
    }

    const wishList: IWishList = {
      name: wishListName,
      isPrivate: false,
      notify: false,
      contents: []
    }

    updateProfile({...userProfile.data, wishLists: [...userProfile.data.wishLists, wishList]});

    setWishListName("");
    setModalOpen(false);
  }

  const cancel = () => {
    setWishListName("");
    setModalOpen(false);
  }

  return (
    <CardGrid>
      <FlexContainer vertical>
        <CardStack onClick={() => setModalOpen(true)}>
          <FlexContainer className={styles.createCard} vertical align="center" justify="center">
            <div className={styles.icon}>
              <AiOutlineFileAdd/>
            </div>
            Створити
          </FlexContainer>
        </CardStack>
      </FlexContainer>

      {userProfile.data?.wishLists?.map(item => (
        <WishListCard key={item.id} wishList={item}/>
      ))}
      <Modal isOpen={modalOpen} setIsOpen={setModalOpen}>
        <Card className={styles.modal}>
          <h3>
            Створити новий список
          </h3>
          <InputWithLabel label="Назва">
            <Input
              value={wishListName}
              onChange={(e) => setWishListName(e.target.value)}
              placeholder="Назва"
              error={error}
            />
          </InputWithLabel>
          <FlexContainer>
            <Button className={styles.button} text="Скасувати" onClick={cancel}/>
            <Button color="accent" className={styles.button} text="Створити" onClick={create} />
          </FlexContainer>
        </Card>
      </Modal>
    </CardGrid>
  );
};

export default ProfileWishListContainer;
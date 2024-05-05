import {FC, useEffect, useState} from "react";
import styles from "./wish-list-content-header.module.scss";
import {IWishList} from "@/entities/wish-list";
import {IUserProfile, userProfileApi} from "@/entities/user-profile";
import {Button, Card, FlexContainer, Input, InputWithLabel, Switch} from "@/shared/ui-kit";
import {AiOutlineClose} from "react-icons/ai";
import {useNavigate} from "react-router-dom";

interface IProps {
  wishList?: IWishList;
  userProfile?: IUserProfile;
}

const WishListContentHeader: FC<IProps> = (props) => {
  const navigate = useNavigate();

  const [updateProfile] = userProfileApi.useUpdateMutation();

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [wishList, setWishList] = useState<IWishList>({name: "", isPrivate: false, notify: false, contents: []})

  useEffect(() => {
    if (props.wishList == undefined)
      return;

    setWishList(props.wishList);
  }, [props.wishList]);

  const save = () => {
    if (props.userProfile == undefined)
      return;

    const updatedUser = {...props.userProfile};

    const index = updatedUser.wishLists.indexOf(props.wishList!);

    const wishLists = [...props.userProfile.wishLists];
    wishLists[index] = {...wishList};

    updatedUser.wishLists = wishLists;

    updateProfile(updatedUser);
    setIsEdit(false);
  }

  const remove = () => {
    if (props.userProfile == undefined)
      return;

    if (!window.confirm("Видалити"))
      return;

    updateProfile({...props.userProfile, wishLists: props.userProfile.wishLists.filter(x => x.id != props.wishList?.id)});
    setIsEdit(false);
    navigate("/profile/wish-list");
  }

  const cancel = () => {
    if (props.wishList == undefined)
      return;

    setWishList(props.wishList);
    setIsEdit(false);
  }

  return (
    <Card>
      <FlexContainer justify="space-between" align="center" className={`${isEdit && styles.containerEdit}`} gap={20}>
        {!isEdit && (
          <h3>
            {props.wishList?.name}
          </h3>
        )}
        {isEdit && (
          <FlexContainer className={styles.settings}>
            <Input
              value={wishList.name}
              onChange={e => setWishList({...wishList, name: e.target.value})}
              placeholder="Назва"
            />
            <FlexContainer className={styles.switchContainer}>
              <InputWithLabel label="Публічна" type="inline">
                <Switch
                  checked={wishList.isPrivate}
                  onChange={e => setWishList({...wishList, isPrivate: e.target.checked})}
                />
              </InputWithLabel>
              <InputWithLabel label="Сповіщення" type="inline">
                <Switch
                  checked={wishList.notify}
                  onChange={e => setWishList({...wishList, notify: e.target.checked})}
                />
              </InputWithLabel>
            </FlexContainer>
          </FlexContainer>
        )}
        {!isEdit && (
          <FlexContainer>
            <Button text="Редагувати" onClick={() => setIsEdit(true)}/>
            <Button
              className={styles.exitButton}
              shape="square"
              icon={<AiOutlineClose/>}
              onClick={() => navigate("/profile/wish-list")}
            />
          </FlexContainer>
        )}
        {isEdit && (
          <FlexContainer className={styles.buttonContainer}>
            <Button text="Зберегти" color="accent" onClick={save}/>
            <Button text="Видалити" color="danger" onClick={remove}/>
            <Button text="Відмінити" onClick={cancel}/>
          </FlexContainer>
        )}
      </FlexContainer>
    </Card>
  );
};

export default WishListContentHeader;
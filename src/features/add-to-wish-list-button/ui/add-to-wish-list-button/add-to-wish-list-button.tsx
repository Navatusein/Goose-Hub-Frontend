import {FC, useEffect, useMemo, useState} from "react";
// import styles from "./add-to-wish-list-button.module.scss";
import {Select} from "@/shared/ui-kit";
import {useAppSelector} from "@/shared/hooks/use-app-selector.ts";
import {userProfileApi} from "@/entities/user-profile";

interface IProps {
  contentId: string;
}

const AddToWishListButton: FC<IProps> = (props) => {
  const {user} = useAppSelector(state => state.user);

  const userProfile = userProfileApi.useFetchQuery(user?.userId ?? "", {skip: user === undefined});

  const [updateProfile] = userProfileApi.useUpdateMutation();

  const [wishListId, setWishListId] = useState<string | undefined>();

  const wishListsOptions = useMemo(() => {
    if (userProfile.data == undefined)
      return [];

    let options = userProfile.data.wishLists.map(item => {
      return {label: item.name, value: item.id!}
    });

    if (wishListId != undefined)
      options = [...options, {label: "Видалити", value: "delete"}];

    return options;
  }, [userProfile.data, wishListId]);

  useEffect(() => {
    if (userProfile.data == undefined)
      return;

    const wishList = userProfile.data.wishLists.find(x => x.contents.find(y => y.contentId == props.contentId) != undefined);

    setWishListId(wishList?.id);
  }, [userProfile.data, props.contentId]);

  const selectWishList = (id: string) => {
    if (userProfile.data == undefined)
      return;

    const updatedUser = {...userProfile.data};

    if (wishListId != undefined) {
      const wishList = userProfile.data.wishLists.find(x => x.id == wishListId)!;
      const index = updatedUser.wishLists.indexOf(wishList);

      const wishLists = [...updatedUser.wishLists];
      wishLists[index] = {...wishList, contents: wishList.contents.filter(x => x.contentId != props.contentId)};

      updatedUser.wishLists = wishLists;
    }

    if (id !== "delete") {
      const wishList = userProfile.data.wishLists.find(x => x.id == id)!;
      const index = updatedUser.wishLists.indexOf(wishList);

      const wishLists = [...updatedUser.wishLists];
      wishLists[index] = {...wishList, contents: [...wishList.contents, {contentId: props.contentId, priority: 0}]};

      updatedUser.wishLists = wishLists;
    }

    updateProfile(updatedUser);

    setWishListId(id === "delete" ? undefined : id);
  }

  return (
    <div>
      <Select
        options={wishListsOptions}
        values={wishListId != undefined ? [wishListId] : []}
        setValues={(value) => selectWishList(value[0] as string)}
        placeholder="Додати до списка"
      />
    </div>
  );
};

export default AddToWishListButton;
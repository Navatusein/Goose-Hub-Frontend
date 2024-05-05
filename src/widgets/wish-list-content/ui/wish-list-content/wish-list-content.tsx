import {FC, useMemo} from "react";
import {CardGrid, FlexContainer} from "@/shared/ui-kit";
import styles from "./wish-list-content.module.scss";
import {useAppSelector} from "@/shared/hooks/use-app-selector.ts";
import {userProfileApi} from "@/entities/user-profile";
import {useParams} from "react-router-dom";
import {commonApi, ContentCard} from "@/entities/common";
import WishListContentHeader
  from "@/widgets/wish-list-content/ui/wish-list-content-header/wish-list-content-header.tsx";

type PathParams = {
  wishListId: string;
}


const WishListContent: FC = () => {
  const params = useParams<PathParams>();

  const {user} = useAppSelector(state => state.user);
  const userProfile = userProfileApi.useFetchQuery(user?.userId ?? "", {skip: user === undefined});

  const wishList = useMemo(() => {
    if (userProfile.data == undefined)
      return undefined;

    return userProfile.data.wishLists.find(x => x.id == params.wishListId);
  }, [userProfile.data, params.wishListId]);

  const ids = useMemo(() => {
    const list = wishList?.contents?.map(item => {
      return item.contentId;
    })
    return [...new Set(list)];
  }, [wishList])

  const contentList = commonApi.useFetchPreviewByIdsQuery(ids!, {skip: ids === undefined});

  const previewList = useMemo(() => {
    if (contentList.data === undefined)
      return [];

    return Object.fromEntries(contentList.data!.map(item => {
      return [[item.id!.toString()], item];
    }))
  }, [contentList.data])

  return (
    <FlexContainer vertical className={styles.container} gap="page">
      <WishListContentHeader wishList={wishList} userProfile={userProfile.data}/>
      <CardGrid>
        {previewList.length != 0 && wishList?.contents.map(item => (
          <ContentCard key={item.contentId} content={previewList[item.contentId]}/>
        ))}
      </CardGrid>
    </FlexContainer>
  );
};

export default WishListContent;
import {FC, useMemo} from 'react';
import {FlexContainer} from "@/shared/ui-kit";
import {userProfileApi} from "@/entities/user-profile";
import {useAppSelector} from "@/shared/hooks/use-app-selector.ts";
import {commonApi} from "@/entities/common";

const ProfileHistoryPage: FC = () => {
  const {user} = useAppSelector(state => state.user);

  const userProfile = userProfileApi.useFetchQuery(user?.userId ?? "", {skip: user === undefined});

  // const history: IHistory[] = [
  //   {
  //     contentId: "65f4ae2ead787fc1e52d0d93",
  //     viewDate: new Date().toISOString()
  //   },
  //   {
  //     contentId: "65f4ae51ad787fc1e52d0d94",
  //     viewDate: new Date().toISOString()
  //   },
  //   {
  //     contentId: "65f62c67811382f28610c651",
  //     viewDate: new Date().toISOString()
  //   }
  // ]
  //const [update] = userProfileApi.useUpdateMutation();
  // useEffect(() => {
  //   if (userProfile.data) {
  //     update({...userProfile.data, history: history});
  //   }
  // }, [userProfile.data]);

  const ids = useMemo(() => {
    const list = userProfile.data?.history.map(item => {
      return item.contentId;
    })
    return [...new Set(list)];
  }, [userProfile.data])

  const contentList = commonApi.useFetchPreviewByIdsQuery(ids!, {skip: ids === undefined});


  const previewList = useMemo(() => {
    if (contentList.data === undefined)
      return

    return Object.fromEntries(contentList.data!.map(item => {
      return [[item.id!], item];
    }))
  }, [contentList.data])
  console.log(previewList);

  return (
    <FlexContainer align="center" justify="start" gap={30} vertical >
      <h2>Історія перегляду</h2>
    </FlexContainer>
  );
};

export default ProfileHistoryPage;
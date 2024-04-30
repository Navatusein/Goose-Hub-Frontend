import {FC, useMemo} from 'react';
import {FlexContainer} from "@/shared/ui-kit";
import {userProfileApi} from "@/entities/user-profile";
import {useAppSelector} from "@/shared/hooks/use-app-selector.ts";
import {commonApi, IPreview} from "@/entities/common";
import {ContentCard} from "@/entities/common";
import {CardGrid} from "@/shared/ui-kit";

const ProfileHistoryPage: FC = () => {

  // const history: IHistory[] = [
  //   {
  //     contentId: "65f4ae2ead787fc1e52d0d93",
  //     viewDate: "2024-03-20T18:15:31.404Z"
  //   },
  //   {
  //     contentId: "65f4ae51ad787fc1e52d0d94",
  //     viewDate: "2024-04-10T18:15:31.404Z"
  //   },
  //   {
  //     contentId: "65f62c67811382f28610c651",
  //     viewDate: "2024-04-10T18:15:31.404Z"
  //   }
  // ]
  // const [update] = userProfileApi.useUpdateMutation();
  // useEffect(() => {
  //   if (userProfile.data) {
  //     update({...userProfile.data, history: history});
  //   }
  // }, [userProfile.data]);
// const array = [
  //   { contentId: "65f4ae2ead787fc1e52d0d93", viewDate: "2024-03-20T18:15:31.404Z" },
  //   { contentId: "65f4ae51ad787fc1e52d0d94", viewDate: "2024-04-10T18:15:31.404Z" },
  //   { contentId: "65f62c67811382f28610c651", viewDate: "2024-04-10T18:15:31.404Z" }
  // ];

  // [
  //   {"2024-04-10": [
  //     {contentId: "65f4ae51ad787fc1e52d0d94"},
  //       {contentId: "65f4ae51ad787fc1e52d0d94"},
  //   ]}
  // ]


  const {user} = useAppSelector(state => state.user);

  const userProfile = userProfileApi.useFetchQuery(user?.userId ?? "", {skip: user === undefined});

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
      return [[item.id!.toString()], item];
    }))
  }, [contentList.data])


  interface GroupedByDate {
    [date: string]: IPreview[];
  }

  const groupedByDate = useMemo(() => {
    if (!userProfile?.data?.history || !previewList) {
      return {};
    }

    return userProfile.data.history.reduce((mass: GroupedByDate, obj) => {
      const date = obj.viewDate.split("T")[0];
      mass[date] = mass[date] || [];
      mass[date].push(previewList[obj.contentId]);
      return mass;
    }, {});
  }, [userProfile?.data?.history, previewList]);

  return (
    <FlexContainer align="start" justify="start" gap={30} vertical>
      <h2>Історія перегляду</h2>
      {(groupedByDate ? (
        <>
          {Object.entries(groupedByDate!).map(([date, items]) => (
            <>
              <h2 key={date}>{date}</h2>
              <FlexContainer warp gap={20}>
                <CardGrid>
                {items.map((item, index) => (
                  <ContentCard key={index} content={item} />
                ))}
                </CardGrid>
              </FlexContainer>
            </>
          ))}
        </>
      ) :
        <h2>Історії немає</h2>
      )}
    </FlexContainer>
  );
};

export default ProfileHistoryPage;
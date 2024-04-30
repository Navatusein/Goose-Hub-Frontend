import {FC, useMemo} from 'react';
import {CardGrid, FlexContainer} from "@/shared/ui-kit";
import {ContentCard} from "@/entities/common";
import {userProfileApi} from "@/entities/user-profile";
import {useAppSelector} from "@/shared/hooks/use-app-selector.ts";
import {commonApi, IPreview} from "@/entities/common";

interface GroupedByDate {
  [date: string]: IPreview[];
}

const ProfileHistory: FC= () => {

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

  let groupedByDate = useMemo(() => {
    if (!userProfile.data?.history || !previewList) {
      return {};
    }

    return userProfile.data.history.reduce((groups: GroupedByDate, obj) => {
      const date = obj.viewDate.split("T")[0];
      groups[date] = groups[date] || [];
      groups[date].push(previewList[obj.contentId]);
      return groups;
    }, {});
  }, [userProfile.data?.history, previewList]);

  const sortedArray = Object.entries(groupedByDate).sort((a, b) => {
    return b[0].localeCompare(a[0]);
  });

  groupedByDate = sortedArray.reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {} as GroupedByDate);

  return (
    (groupedByDate ? (
      <>
        {Object.entries(groupedByDate!).map(([date, items]) => (
          <>
            <h2 key={date}>{date}</h2>
            <FlexContainer warp gap={20}>
              <CardGrid>
                {items.map((item, index) => (
                  <div key={index}>
                    <ContentCard content={item} />
                  </div>
                ))}
              </CardGrid>
            </FlexContainer>
          </>
        ))}
      </>
    ) :
    <h2>Історії немає</h2>
    )
  );
};

export default ProfileHistory;
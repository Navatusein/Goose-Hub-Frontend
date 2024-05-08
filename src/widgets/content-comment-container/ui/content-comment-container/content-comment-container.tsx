import {FC, useMemo} from "react";
import styles from "./content-comment-container.module.scss";
import {FlexContainer} from "@/shared/ui-kit";
import {CommentFrom} from "@/features/comment-from";
import {commentApi} from "@/entities/comment";
import {userProfileApi} from "@/entities/user-profile";
import {CommentCard} from "@/features/comment-card";

interface IProps {
  contentId: string;
}

const ContentCommentContainer: FC<IProps> = (props) => {
  const comments = commentApi.useFetchCommentByContentIdQuery(props.contentId);

  const userIds = useMemo(() => {
    const list = comments.data?.map(x => {
      return x.userId;
    })

    return [...new Set(list)];
  }, [comments.data]);

  const userPreviews = userProfileApi.useFetchUserProfilePreviewsByIdsQuery(userIds, {skip: userIds.length === 0});

  const previewList = useMemo(() => {
    if (userPreviews.data === undefined)
      return [];

    return Object.fromEntries(userPreviews.data!.map(item => {
      return [[item.id!.toString()], item];
    }))
  }, [userPreviews.data])

  const parentComments = useMemo(() => {
    return comments.data?.filter(x => x.parentId == undefined);
  }, [comments.data])

  return (
    <FlexContainer className={styles.commentContainer} vertical gap="page" id="comments">
      <CommentFrom contentId={props.contentId}/>

      {previewList.length !== 0 && parentComments?.map((item) => (
        <CommentCard key={item.id} userPreviews={previewList} comment={item} comments={comments.data!}/>
      ))}
      {parentComments?.length === 0 && (
        <h3>Коментарів немає</h3>
      )}
    </FlexContainer>
  );
};

export default ContentCommentContainer;
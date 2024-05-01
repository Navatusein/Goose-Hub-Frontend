import {FC, useMemo} from "react";
import styles from "./content-comment-container.module.scss";
import {FlexContainer} from "@/shared/ui-kit";
import {CommentFrom} from "@/features/comment-from";
import {commentApi, IComment} from "@/entities/comment";
import {userProfileApi} from "@/entities/user-profile";
import {CommentCard} from "@/features/comment-card";

interface IProps {
  contentId: string;
}

const getUsersId = (comment: IComment): string[] => {
  let ids: string[] = [];

  if (comment.thread !== undefined) {
    comment.thread.forEach((item) => {
      ids = [...ids, ...getUsersId(item)];
    })
  }

  return [...ids, comment.userId];
}

const ContentCommentContainer: FC<IProps> = (props) => {
  const comments = commentApi.useFetchByContentIdQuery(props.contentId);

  const userIds = useMemo(() => {
    let list: string[] = [];

    comments.data?.forEach(item => {
      list = [...list, ...getUsersId(item)];
    })

    return [...new Set(list)];
  }, [comments.data]);

  const userPreviews = userProfileApi.useFetchByIdsQuery(userIds, {skip: userIds.length === 0});

  const previewList = useMemo(() => {
    if (userPreviews.data === undefined)
      return [];

    return Object.fromEntries(userPreviews.data!.map(item => {
      return [[item.id!.toString()], item];
    }))
  }, [userPreviews.data])

  return (
    <FlexContainer className={styles.commentContainer} vertical gap="page">
      <CommentFrom contentId={props.contentId}/>

      {previewList.length !== 0 && comments.data?.map((item) => (
          <CommentCard key={item.id} userPreviews={previewList} comment={item}/>
      ))}
      {comments.data?.length === 0 && (
        <h3>Коментарів немає</h3>
      )}
    </FlexContainer>
  );
};

export default ContentCommentContainer;
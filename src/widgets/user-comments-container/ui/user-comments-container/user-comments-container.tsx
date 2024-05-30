import {FC} from 'react';
import {ProfileComment} from "@/features/profile-comment";
import {commentApi} from "@/entities/comment";

const UserCommentsContainer: FC= () => {
  const comments = commentApi.useFetchCommentByUserQuery();

  return (
    (comments ? (
      <>
        {comments.data?.map((comment) => (
          <ProfileComment key={comment.id} comment={comment} />
        ))}
      </>
    ):
      <h3>Коментарів немає</h3>
    )
  );
};

export default UserCommentsContainer ;
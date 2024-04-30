import {FC} from 'react';
import {ProfileComment} from "@/features/profile-comment";
import {commentApi} from "@/entities/comment";

const ProfileComments: FC= () => {
  const comments = commentApi.useFetchUserQuery();

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

export default ProfileComments ;
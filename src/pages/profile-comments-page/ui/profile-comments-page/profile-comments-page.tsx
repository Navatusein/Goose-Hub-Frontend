import {FC} from 'react';
import {FlexContainer} from "@/shared/ui-kit";
import {ProfileComment} from "@/features/profile-comment";
import {commentApi} from "@/entities/comment";

const ProfileCommentsPage: FC = () => {
  const comments = commentApi.useFetchUserQuery();

  return (
    <FlexContainer align="start" justify="start" gap={30} vertical>
      <h2>Ваші коментарі</h2>

      {(comments ? (
        <>
          {comments.data?.map((comment) => (
            <ProfileComment key={comment.id} comment={comment} />
          ))}
        </>
      ):
      <h3>Коментарів немає</h3>
      )}

    </FlexContainer>
  );
};

export default ProfileCommentsPage;
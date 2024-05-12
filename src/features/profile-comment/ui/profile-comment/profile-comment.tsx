import {FC} from 'react';
import {FlexContainer, Paragraph, Button} from "@/shared/ui-kit";
import styles from "./profile-comment.module.scss";
import {IComment} from "@/entities/comment";
import {previewApi} from "@/entities/common";
import {useNavigate} from "react-router-dom";

const contentTypeToString = ["movie", "serial", "cartoon", "anime"];

const ProfileComment: FC<{comment: IComment}> = ({comment}) => {
  const navigate = useNavigate();
  const data = previewApi.useFetchByIdQuery(comment.contentId!);

  const onClick = () => {
    if (data.data == undefined)
      return;

    navigate(`/content/${contentTypeToString[data.data.contentType - 1]}/${data.data.id}#comments`);
  }

  return (
    <FlexContainer className={styles.commentCard} justify="space-between" align="center" gap={10}>
      <FlexContainer styles={{padding: 10}} gap={10} vertical>
        <FlexContainer>
          <Paragraph color="primary" >{data.data?.name}</Paragraph>
          <Paragraph color="secondary" >{comment.dispatch.split("T")[0]}</Paragraph>
        </FlexContainer>
        <Paragraph color="secondary">{comment.message}</Paragraph>
      </FlexContainer>
      <FlexContainer className={styles.forButton} justify="end" gap={10} vertical>
        <Button size="small" text="Перейти до" onClick={() => onClick()}/>
      </FlexContainer>
    </FlexContainer>
  );
};

export default ProfileComment;
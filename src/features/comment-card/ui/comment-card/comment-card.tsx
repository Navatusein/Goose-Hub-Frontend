import {CSSProperties, FC, useMemo, useState} from "react";
import styles from "./comment-card.module.scss";
import {IUserProfilePreview, UserAvatar} from "@/entities/user-profile";
import {IComment} from "@/entities/comment";
import {Button, Card, FlexContainer, Modal, Paragraph} from "@/shared/ui-kit";
import {CommentFrom} from "@/features/comment-from";
import {useAppSelector} from "@/shared/hooks/use-app-selector.ts";

interface IProps {
  userPreviews: {[key: string]: IUserProfilePreview};
  comment: IComment;
  comments: IComment[];
  styles?: CSSProperties;
  className?: string;
  closePrevent?: () => void;
}

const CommentCard: FC<IProps> = (props) => {
  const {user} = useAppSelector(state => state.user);

  const [answerCommentModal, setAnswerCommentModal] = useState(false);
  const [threadCommentModal, setThreadCommentModal] = useState(false);

  const userPreview = props.userPreviews[props.comment.userId!];

  const thread = useMemo(() => {
    return props.comments.filter(x => x.parentId === props.comment.id);
  }, [props.comment, props.comments])

  const closPrevent = () => {
    // setThreadCommentModal(false);
  }

  return (
    <>
      <FlexContainer>
        <UserAvatar userProfile={userPreview}/>
        <FlexContainer vertical>
          <FlexContainer vertical gap={0}>
            <Paragraph fontSize="default">{userPreview.name}</Paragraph>
            <Paragraph fontSize="small" color="secondary">{props.comment.dispatch}</Paragraph>
          </FlexContainer>
          <Paragraph fontSize="default" color="secondary">{props.comment.message}</Paragraph>
          <FlexContainer gap={5}>
            <Button
              text="Відповісти"
              size="small"
              onClick={() => setAnswerCommentModal(true)}
              disabled={user === undefined}
            />
            {props.comment.replies?.length !== 0 && (
              <Button
                text="Інші відповіді" size="small"
                type="outline"
                onClick={() => {
                  if (props.closePrevent !== undefined)
                    props.closePrevent();

                  setThreadCommentModal(true);
                }}
              />
            )}
          </FlexContainer>
        </FlexContainer>
      </FlexContainer>
      <Modal isOpen={answerCommentModal} setIsOpen={setAnswerCommentModal}>
        <FlexContainer vertical>
          <FlexContainer className={styles.answerModal} warp>
            <Paragraph className={styles.text} fontSize="large">Відповісти користувачу</Paragraph>
            <Paragraph className={styles.text} fontSize="large" color="accent">{userPreview.name}</Paragraph>
          </FlexContainer>
          <CommentFrom contentId={props.comment.contentId} replayCommentId={props.comment.id}/>
        </FlexContainer>
      </Modal>
      <Modal isOpen={threadCommentModal} setIsOpen={setThreadCommentModal}>
        <Card>
          <FlexContainer vertical>
            {thread.map(item => (
              <CommentCard
                key={item.id}
                userPreviews={props.userPreviews}
                comment={item}
                comments={props.comments}
                closePrevent={closPrevent}
              />
            ))}
          </FlexContainer>
        </Card>
      </Modal>
    </>
  );
};

export default CommentCard;
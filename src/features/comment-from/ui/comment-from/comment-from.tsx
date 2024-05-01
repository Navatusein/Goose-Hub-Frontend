import {CSSProperties, FC, useState} from "react";
import styles from "./comment-from.module.scss";
import {Button, FlexContainer, TextArea} from "@/shared/ui-kit";
import {useAppSelector} from "@/shared/hooks/use-app-selector.ts";
import {commentApi, IComment} from "@/entities/comment";

interface IProps {
  contentId: string;
  replayCommentId?: string;
  styles?: CSSProperties;
  className?: string;
}

const CommentFrom: FC<IProps> = (props) => {
  const {user} = useAppSelector(state => state.user);

  const [createByContentId] = commentApi.useCreateByContentIdMutation();
  const [createReplyById] = commentApi.useCreateReplyByIdMutation();

  const [text, setText] = useState("")
  const [error, serError] = useState("");

  const addComment = () => {
    if (text.trim().length === 0) {
      serError("Коментар пустий");
      return;
    }

    const newComment: IComment = {
      contentId: props.contentId,
      userId: user!.userId,
      dispatch: new Date().toISOString().split('T')[0],
      message: text,
      thread: []
    }

    if (props.replayCommentId === undefined) {
      createByContentId({contentId: props.contentId, comment: newComment})
    }
    else {
      createReplyById({commentId: props.replayCommentId, comment: newComment});
    }

    setText("");
  }

  return (
    <FlexContainer vertical align="start" className={`${props.className ?? ""}`} styles={props.styles}>
      <TextArea
        placeholder="Напишіть ваш відгук"
        className={styles.textArea}
        rows={5}
        disabled={user === undefined}
        value={text}
        onChange={(e) => setText(e.target.value)}
        error={error}
      />
      <Button
        text="Додати коментар"
        onClick={addComment}
        disabled={user === undefined}
      />
    </FlexContainer>
  );
};

export default CommentFrom;
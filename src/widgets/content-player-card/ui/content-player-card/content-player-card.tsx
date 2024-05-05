import {CSSProperties, FC, useMemo, useState} from "react";
import styles from "./content-player-card.module.scss";
import {CheckboxTag, Divider, FlexContainer, Paragraph, Tag} from "@/shared/ui-kit";
import {DataTypeEnum, IPreview} from "@/entities/common";
import {IMovie} from "@/entities/movie";
import {IAnime} from "@/entities/anime";
import {ISerial} from "@/entities/serial";
import {Player} from "@/features/player";
import {ContentCommentContainer} from "@/widgets/content-comment-container";
import {ScreenshotContainer} from "@/features/screenshot-container";

interface IProps {
  content: IPreview;
  styles?: CSSProperties;
  className?: string;
}

const ContentPlayerCard: FC<IProps> = (props) => {
  const movieContent = props.content as IMovie;
  const serialContent = props.content as ISerial;
  const animeContent = props.content as IAnime;

  const contentSrc = useMemo(() => {
    if (props.content.dataType === DataTypeEnum.movie) {
      return movieContent.contentUrl;
    }
    else if (props.content.dataType === DataTypeEnum.serial) {
      return serialContent.seasons[0].episodes[0].contentUrl;
    }
    else if (props.content.dataType === DataTypeEnum.anime) {
      if (animeContent.contentUrl !== undefined) {
        return animeContent.contentUrl;
      }
      else if (animeContent.episodes !== undefined) {
        return animeContent.episodes[0].contentUrl;
      }
    }

    return undefined;
  }, [props.content])

  const [player, setPlayer] = useState<"player" | "trailer">(contentSrc === undefined ? "trailer" : "player");

  return (
    <FlexContainer vertical className={`${styles.container} ${props.className ?? ""}`} styles={props.styles} gap="page">
      <FlexContainer className={styles.title} vertical>
        <h1>{props.content.name}</h1>
        <h2>{props.content.originalName}</h2>
      </FlexContainer>

      <Divider className={styles.divider}/>
      <ScreenshotContainer content={props.content}/>

      <Divider/>
      <FlexContainer>
        {contentSrc !== undefined && (
          <CheckboxTag text="Плеер" checked={player === "player"} onChange={() => setPlayer("player")}/>
        )}
        <CheckboxTag text="Трейлер" checked={player === "trailer"} onChange={() => setPlayer("trailer")}/>
      </FlexContainer>

      {player === "player" && (
        <Player src={contentSrc}/>
      )}
      {player === "trailer" && (
        <iframe style={{aspectRatio: "16/9", border: "none"}} src={movieContent.trailerUrl}/>
      )}

      <FlexContainer>
        {props.content.genres.map((value, index) => (
          <Tag key={index}>{value}</Tag>
        ))}
      </FlexContainer>

      <Divider/>
      <Paragraph>
        {props.content.description}
      </Paragraph>

      <Divider/>
      <h2>Коментарі</h2>

      <ContentCommentContainer contentId={props.content.id!}/>
    </FlexContainer>
  );
};

export default ContentPlayerCard;
import {CSSProperties, FC, useMemo, useState} from "react";
import styles from "./content-player-card.module.scss";
import {CheckboxTag, Divider, FlexContainer, Paragraph, Tag} from "@/shared/ui-kit";
import {DataTypeEnum, IPreview, previewApi} from "@/entities/common";
import {IMovie} from "@/entities/movie";
import {IAnime} from "@/entities/anime";
import {ISerial} from "@/entities/serial";
import {Player} from "@/features/player";
import {ContentCommentContainer} from "@/widgets/content-comment-container";
import {ScreenshotContainer} from "@/features/screenshot-container";
import {useAppSelector} from "@/shared/hooks/use-app-selector.ts";
import {userProfileApi} from "@/entities/user-profile";
import {Screenshot} from "@/features/screenshot";
import {franchiseApi} from "@/entities/franchise";
import {FranchiseCard} from "@/features/franchise-card";

interface IProps {
  content: IPreview;
  styles?: CSSProperties;
  className?: string;
}

const ContentPlayerCard: FC<IProps> = (props) => {
  const {user} = useAppSelector(state => state.user);
  const userProfile = userProfileApi.useFetchUserProfileByIdQuery(user?.userId ?? "", {skip: user === undefined});
  const [updateProfile] = userProfileApi.useUpdateUserProfileMutation();

  const franchise = franchiseApi.useFetchFranchiseByIdQuery(props.content.franchiseId!, {skip: props.content.franchiseId == undefined});
  const franchiseContent = previewApi.useFetchPreviewByFranchiseIdQuery(props.content.franchiseId!, {skip: props.content.franchiseId == undefined});

  const contentAsMovie = props.content as IMovie;
  const contentAsSerial = props.content as ISerial;
  const contentAsAnime = props.content as IAnime;

  const contentSrc = useMemo(() => {
    if (props.content.dataType === DataTypeEnum.movie) {
      return contentAsMovie.contentUrl;
    }
    else if (props.content.dataType === DataTypeEnum.serial) {
      return contentAsSerial.seasons[0]?.episodes[0]?.contentUrl;
    }
    else if (props.content.dataType === DataTypeEnum.anime) {
      if (contentAsAnime.contentUrl !== undefined) {
        return contentAsAnime.contentUrl;
      }
      else if (contentAsAnime.episodes !== undefined) {
        return contentAsAnime.episodes[0].contentUrl;
      }
    }

    return undefined;
  }, [props.content])

  const isInHistory = useMemo(() => {
    if (userProfile.data == undefined)
      return true;

    const date = new Date().toISOString().split('T')[0];

    return userProfile.data.history.find(x => x.contentId == props.content.id && x.viewDate == date) != undefined;
  }, [userProfile.data, props.content.id]);

  const [player, setPlayer] = useState<"player" | "trailer">(contentSrc == undefined ? "trailer" : "player");

  const addToHistory = () => {
    if (isInHistory || userProfile.data == undefined)
      return;

    const date = new Date().toISOString().split('T')[0];
    updateProfile({...userProfile.data, history: [...userProfile.data.history, {contentId: props.content.id!, viewDate: date}]})
  }

  return (
    <FlexContainer vertical className={`${styles.container} ${props.className ?? ""}`} styles={props.styles} gap="page">
      <FlexContainer className={styles.title} vertical>
        <h1>{props.content.name}</h1>
        <h2>{props.content.originalName}</h2>
      </FlexContainer>

      {contentAsMovie?.screenshotUrls?.length != 0 && (
        <>
          <Divider className={styles.divider}/>
          <ScreenshotContainer>
            {contentAsMovie?.screenshotUrls?.map(item => (
              <Screenshot url={item} key={item}/>
            ))}
          </ScreenshotContainer>
        </>
      )}

      <Divider/>
      <FlexContainer>
        {contentSrc != undefined && (
          <CheckboxTag text="Плеер" checked={player === "player"} onChange={() => setPlayer("player")}/>
        )}
        <CheckboxTag text="Трейлер" checked={player === "trailer"} onChange={() => setPlayer("trailer")}/>
      </FlexContainer>

      {player === "player" && (
        <Player src={contentSrc} onPlay={() => addToHistory()}/>
      )}
      {player === "trailer" && (
        <iframe style={{aspectRatio: "16/9", border: "none"}} src={contentAsMovie.trailerUrl}/>
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

      {franchise.data != undefined  && (
        <>
          <Divider/>
          <h2>{franchise.data.name} - всі частини</h2>
          <FlexContainer vertical className={styles.franchiseContainer}>
            {franchiseContent.data?.map((item, index) => (
              <div className={styles.franchiseCard} key={index}>
                <FranchiseCard currentContentId={props.content.id!} content={item} index={index}/>
                <Divider className={styles.franchiseCardDivider}/>
              </div>
            ))}
          </FlexContainer>
        </>
      )}

      <Divider/>
      <h2>Коментарі</h2>

      <ContentCommentContainer contentId={props.content.id!}/>
    </FlexContainer>
  );
};

export default ContentPlayerCard;
import {CSSProperties, FC, useEffect, useMemo, useState} from "react";
import styles from "./content-player-card.module.scss";
import {CheckboxTag, Divider, FlexContainer, Paragraph, Select, Tag} from "@/shared/ui-kit";
import {ContentTypeEnum, DataTypeEnum, IPreview, previewApi} from "@/entities/common";
import {IMovie} from "@/entities/movie";
import {AnimeTypeEnum, IAnime} from "@/entities/anime";
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

  const [seasonId, setSeasonId] = useState<string | undefined>(undefined);
  const [episodeId, setEpisodeId] = useState<string | undefined>(undefined);

  const contentAsMovie = props.content as IMovie;
  const contentAsSerial = props.content as ISerial;
  const contentAsAnime = props.content as IAnime;

  useEffect(() => {
    if (props.content.dataType == DataTypeEnum.serial) {
      setSeasonId(contentAsSerial.seasons[0]?.id);
    }
    else if (props.content.dataType == DataTypeEnum.anime && contentAsAnime.animeType != AnimeTypeEnum.film && contentAsAnime.episodes != undefined) {
      setEpisodeId(contentAsAnime.episodes[0]?.id);
    }
  }, [props.content]);

  useEffect(() => {
    if (props.content.dataType != DataTypeEnum.serial)
      return;

    let seasonIndex = contentAsSerial.seasons.findIndex(x => x.id == seasonId);

    if (seasonIndex == -1)
      seasonIndex = 0;

    setEpisodeId(contentAsSerial.seasons[seasonIndex]?.episodes[0]?.id);
  }, [seasonId]);

  const seasonsOptions = useMemo(() => {
    if (props.content.dataType != DataTypeEnum.serial || contentAsSerial == undefined)
      return [];

    return contentAsSerial.seasons.map(item => {
      return {label: item.name?.length == 0 ? `${item.index} сезон` : item.name!, value: item.id!}
    })
  }, [props.content, contentAsSerial]);

  const episodesOptions = useMemo(() => {
    if (props.content.contentType != ContentTypeEnum.serial && props.content.contentType != ContentTypeEnum.anime)
      return [];

    if (props.content.dataType == DataTypeEnum.serial) {
      if (contentAsSerial.seasons == undefined)
        return [];

      const index = contentAsSerial.seasons.findIndex(x => x.id == seasonId);

      if (index == -1)
        return [];

      return contentAsSerial.seasons[index].episodes.map(item => {
        return {label: item.name?.length == 0 ? `${item.index} серія` : item.name!, value: item.id};
      })
    }
    else {
      if (contentAsAnime.episodes == undefined)
        return [];

      return contentAsAnime.episodes.map(item => {
        return {label: item.name?.length == 0 ? `${item.index} серія` : item.name!, value: item.id};
      })
    }
  }, [props.content, seasonId])

  const contentSrc = useMemo(() => {
    if (props.content.dataType === DataTypeEnum.movie) {
      return contentAsMovie.contentUrl;
    }
    else if (props.content.dataType === DataTypeEnum.serial) {
      const seasonIndex = contentAsSerial.seasons.findIndex(x => x.id == seasonId);

      if (seasonIndex == -1)
        return undefined;

      const episodeIndex = contentAsSerial.seasons[seasonIndex].episodes.findIndex(x => x.id == episodeId);

      if (episodeIndex == -1)
        return undefined;

      return contentAsSerial.seasons[seasonIndex]?.episodes[episodeIndex]?.contentUrl;
    }
    else if (props.content.dataType === DataTypeEnum.anime) {
      if (contentAsAnime.animeType === AnimeTypeEnum.film) {
        return contentAsAnime.contentUrl;
      }

      if (contentAsAnime.episodes == undefined)
        return undefined;

      const episodeIndex = contentAsAnime.episodes.findIndex(x => x.id == episodeId);

      if (episodeIndex == -1)
        return undefined;

      return contentAsAnime?.episodes[episodeIndex]?.contentUrl;
    }

    return undefined;
  }, [props.content, seasonId, episodeId])

  const isInHistory = useMemo(() => {
    if (userProfile.data == undefined)
      return true;

    const date = new Date().toISOString().split('T')[0];

    return userProfile.data.history.find(x => x.contentId == props.content.id && x.viewDate == date) != undefined;
  }, [userProfile.data, props.content.id]);

  const [player, setPlayer] = useState<"player" | "trailer">("player");

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
        {1 == 1 && (
          <CheckboxTag text="Плеер" checked={player === "player"} onChange={() => setPlayer("player")}/>
        )}
        <CheckboxTag text="Трейлер" checked={player === "trailer"} onChange={() => setPlayer("trailer")}/>
      </FlexContainer>

      {player === "player" && (
        <>
          {(props.content.dataType == DataTypeEnum.serial || (props.content.dataType == DataTypeEnum.anime && contentAsAnime.animeType != AnimeTypeEnum.film)) && (
            <FlexContainer>
              {props.content.dataType == DataTypeEnum.serial && (
                <Select
                  placeholder="Сезони"
                  className={styles.select}
                  options={seasonsOptions}
                  values={seasonId ? [seasonId] : []}
                  setValues={value => setSeasonId(value[0] as string)}
                />
              )}
              <Select
                placeholder="Серії"
                className={styles.select}
                options={episodesOptions}
                values={episodeId ? [episodeId] : []}
                setValues={value => setEpisodeId(value[0] as string)}
              />
            </FlexContainer>
          )}
          <Player src={contentSrc} onPlay={() => addToHistory()}/>
        </>
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
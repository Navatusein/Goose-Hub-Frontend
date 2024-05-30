import {CSSProperties, FC, useMemo} from "react";
import styles from "./content-info-card.module.scss";
import {DataTypeEnum, IPreview} from "@/entities/common";
import {Alert, Button, Divider, FlexContainer, Paragraph, Tag} from "@/shared/ui-kit";
import {IAnime} from "@/entities/anime";
// import {ISerial} from "@/entities/serial";
import {IMovie} from "@/entities/movie";
import {AddToWishListButton} from "@/features/add-to-wish-list-button";
import {useAppSelector} from "@/shared/hooks/use-app-selector.ts";
import {jwtDecoder} from "@/shared/helpers/jwt-decoder.ts";
import {useNavigate} from "react-router-dom";
import {useCountdown} from "@/shared/hooks/use-countdown.ts";

interface IProps {
  content: IPreview;
  styles?: CSSProperties;
  className?: string;
}

const animeTypeToText = ["Спешел", "Фільм", "OVA", "ONA", "TV Серіал"]
const statusToText = ["Завершено", "Анансовано", "Виходть", "На паузі"]

const ContentInfoCard: FC<IProps> = (props) => {
  const navigate = useNavigate();

  const {user} = useAppSelector(state => state.user);

  const contentAsMovie = props.content as IMovie;
  // const serialContent = props.content as ISerial;
  const contentAsAnime = props.content as IAnime;

  const countdown = useCountdown(contentAsAnime.nextEpisodeDate);

  const jwtPayload = useMemo(() => {
    if (!user)
      return undefined;

    return jwtDecoder(user.jwtToken);
  }, [user]);

  return (
    <FlexContainer vertical className={`${styles.card} ${props.className ?? ""}`} styles={props.styles}>
      <FlexContainer vertical>
        <div className={styles.poster}>
          {props.content?.posterUrl && (
            <img src={props.content.posterUrl} alt={props.content.name}/>
          )}
        </div>

        {jwtPayload?.role == "Admin" && (
          <Button color="accent" text="Редагувати" onClick={() => navigate(`/admin/content/${props.content!.id}`)}/>
        )}

        {user != undefined && (
          <AddToWishListButton contentId={props.content.id!}/>
        )}

      </FlexContainer>
      <FlexContainer vertical>

        {countdown != undefined && (
          <Alert color="accent">
            <FlexContainer vertical align="center" gap={0}>
              <Paragraph>
                До виходу нової серії:
              </Paragraph>
              <Paragraph>
                {countdown.days}:{countdown.hours}:{countdown.minutes}:{countdown.seconds}
              </Paragraph>
            </FlexContainer>
          </Alert>
        )}

        <Divider/>
        <FlexContainer align="center" justify="space-between">
          <Paragraph>
            Статус:
          </Paragraph>
          <Tag color="accent">
            {statusToText[props.content!.status - 1]}
          </Tag>
        </FlexContainer>

        {props.content.dataType === DataTypeEnum.anime && (
          <>
            <Divider/>
            <FlexContainer align="center" justify="space-between">
              <Paragraph>
                Тип:
              </Paragraph>
              <Tag color="accent">
                {animeTypeToText[contentAsAnime.animeType - 1]}
              </Tag>
            </FlexContainer>

            <Divider/>
            <FlexContainer align="center" justify="space-between">
              <Paragraph>
                Студія:
              </Paragraph>
              <Tag>
                {contentAsAnime.studio}
              </Tag>
            </FlexContainer>
          </>
        )}

        <Divider/>
        <FlexContainer align="center" justify="space-between">
          <Paragraph>
            Вікові обмеження:
          </Paragraph>
          <Tag color={props.content.ageRestriction == "18+" ? "danger" : "accent"}>
            {props.content.ageRestriction}
          </Tag>
        </FlexContainer>

        <Divider/>
        <FlexContainer align="center" justify="space-between">
          <Paragraph>
            Країна:
          </Paragraph>
          <Tag>
            {props.content.country}
          </Tag>
        </FlexContainer>

        {(props.content.dataType == DataTypeEnum.anime || props.content.dataType == DataTypeEnum.serial) && contentAsAnime.episodesCount && (
          <>
            <Divider/>
            <FlexContainer align="center" justify="space-between">
              <Paragraph>
                Кількість серій:
              </Paragraph>
              <Paragraph fontSize="medium">
                {contentAsAnime.episodesCount}
              </Paragraph>
            </FlexContainer>
          </>
        )}

        <Divider/>
        <FlexContainer align="center" justify="space-between">
          <Paragraph>
            Час:
          </Paragraph>
          <Paragraph fontSize="medium">
            {contentAsMovie.time}
          </Paragraph>
        </FlexContainer>

        {props.content.release && (
          <>
            <Divider/>
            <FlexContainer align="center" justify="space-between">
              <Paragraph>
                Дата релізу:
              </Paragraph>
              <Paragraph fontSize="medium">
                {(new Date(props.content.release)).toLocaleDateString("uk-UK")}
              </Paragraph>
            </FlexContainer>
          </>
        )}
      </FlexContainer>
    </FlexContainer>
  );
};

export default ContentInfoCard;
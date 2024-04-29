import {CSSProperties, FC} from "react";
import styles from "./content-info-card.module.scss";
import {DataTypeEnum, IPreview} from "@/entities/common";
import {Divider, FlexContainer, Paragraph, Tag} from "@/shared/ui-kit";
import {IAnime} from "@/entities/anime";
// import {ISerial} from "@/entities/serial";
import {IMovie} from "@/entities/movie";

interface IProps {
  content?: IPreview;
  styles?: CSSProperties;
  className?: string;
}

const animeTypeToText = ["Спешел", "Фільм", "OVA", "ONA", "Фільм"]
const statusToText = ["Завершено", "Анансовано", "Виходть", "На паузі"]

const ContentInfoCard: FC<IProps> = (props) => {
  if (!props.content)
    return <div>Loading</div>

  const movieContent = props.content as IMovie;
  // const serialContent = props.content as ISerial;
  const animeContent = props.content as IAnime;

  return (
    <div className={`${styles.card} ${props.className ?? ""}`} style={props.styles}>
      <div className={styles.poster}>
        {props.content?.posterUrl && (
          <img src={props.content.posterUrl} alt={props.content.name}/>
        )}
      </div>
      <FlexContainer vertical>
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
                {animeTypeToText[animeContent.animeType - 1]}
              </Tag>
            </FlexContainer>

            <Divider/>
            <FlexContainer align="center" justify="space-between">
              <Paragraph>
                Студія:
              </Paragraph>
              <Tag>
                {animeContent.studio}
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

        <Divider/>
        <FlexContainer align="center" justify="space-between">
          <Paragraph>
            Час:
          </Paragraph>
          <Paragraph fontSize="medium">
            {movieContent.time}
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
    </div>
  );
};

export default ContentInfoCard;
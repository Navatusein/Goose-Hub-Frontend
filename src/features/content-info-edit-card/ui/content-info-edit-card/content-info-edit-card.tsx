import {CSSProperties, Dispatch, FC, SetStateAction, useEffect} from "react";
import styles from "./content-info-edit-card.module.scss";
import {ContentTypeEnum, DataTypeEnum, IPreview, StatusEnum, uploadApi} from "@/entities/common";
import {Alert, Button, Divider, FlexContainer, Input, Paragraph, RoundButton, Select} from "@/shared/ui-kit";
import {IMovie, movieApi} from "@/entities/movie";
import {animeApi, AnimeTypeEnum, IAnime} from "@/entities/anime";
import {ISerial, serialApi} from "@/entities/serial";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {SerializedError} from "@reduxjs/toolkit";
import {useNavigate} from "react-router-dom";
import FileUpload from "@/shared/ui-kit/file-upload/file-upload.tsx";
import {AiOutlineCloudUpload, AiOutlineDelete} from "react-icons/ai";

interface IProps {
  content: IPreview;
  setContent: Dispatch<SetStateAction<IPreview>>
  styles?: CSSProperties;
  className?: string;
}

const contentTypeOptions = [
  {value: ContentTypeEnum.movie, label: "Фільм"},
  {value: ContentTypeEnum.serial, label: "Серіал"},
  {value: ContentTypeEnum.cartoon, label: "Мультики"},
  {value: ContentTypeEnum.anime, label: "Аніме"},
]

const dataTypeOptions = [
  {value: DataTypeEnum.movie, label: "Фільм"},
  {value: DataTypeEnum.serial, label: "Серіал"},
]

const animeTypeOptions  = [
  {value: AnimeTypeEnum.special, label: "Спешел"},
  {value: AnimeTypeEnum.film, label: "Фільм"},
  {value: AnimeTypeEnum.ova, label: "OVA"},
  {value: AnimeTypeEnum.ona, label: "ONA"},
  {value: AnimeTypeEnum.tv, label: "TV Серіал"},
]

const statusOptions = [
  {value: StatusEnum.completed, label: "Завершено"},
  {value: StatusEnum.announcement, label: "Анансовано"},
  {value: StatusEnum.ongoing, label: "Виходть"},
  {value: StatusEnum.paused, label: "На паузі"},
]

const ageRestrictionOptions = [
  {value: "0+", label: "0+"},
  {value: "12+", label: "12+"},
  {value: "16+", label: "16+"},
  {value: "18+", label: "18+"},
]

const prepareDate = (dateString: string) => {
  return new Date(dateString).toISOString().replace(":00.000Z", "");
}

const ContentInfoEditCard: FC<IProps> = (props) => {
  const navigate = useNavigate();

  const [addMovie] = movieApi.useCreateMovieMutation();
  const [updateMovie] = movieApi.useUpdateMovieMutation();
  const [deleteMovie] = movieApi.useDeleteMovieMutation();

  const [addSerial] = serialApi.useCreateSerialMutation();
  const [updateSerial] = serialApi.useUpdateSerialMutation();
  const [deleteSerial] = serialApi.useDeleteSerialMutation();

  const [addAnime] = animeApi.useCreateAnimeMutation();
  const [updateAnime] = animeApi.useUpdateAnimeMutation();
  const [deleteAnime] = animeApi.useDeleteAnimeMutation();

  const [uploadPoster] = uploadApi.useUploadPosterMutation();
  const [deletePoster] = uploadApi.useDeletePosterMutation();

  const contentAsMovie = props.content as IMovie;
  const contentAsSerial = props.content as ISerial;
  const contentAsAnime = props.content as IAnime;

  useEffect(() => {

    switch (props.content.contentType) {
      case ContentTypeEnum.movie:
        props.setContent({...props.content, dataType: DataTypeEnum.movie});
        return;
      case ContentTypeEnum.serial:
        props.setContent({...props.content, dataType: DataTypeEnum.serial});
        return;
      case ContentTypeEnum.cartoon:
        props.setContent({...props.content, dataType: DataTypeEnum.movie});
        return;
      case ContentTypeEnum.anime:
        props.setContent({...props.content, dataType: DataTypeEnum.anime});
        return;
    }

  }, [props.content.contentType]);

  const onPosterUpload = (files: FileList | null) => {
    if (files == undefined)
      return;

    const formData = new FormData();
    formData.append("contentId", props.content.id!);
    formData.append("file", files[0]);

    uploadPoster(formData);
  }

  const onPosterDelete = () => {
    if (!window.confirm("Видалити"))
      return;

    deletePoster(props.content.id!);
  };

  const onSave = async () => {
    if (props.content.id == undefined) {
      let result: {data?: IPreview, error?: FetchBaseQueryError | SerializedError};

      switch (props.content.dataType) {
        case DataTypeEnum.movie:
          result = await addMovie({...contentAsMovie, screenshotPath: [], screenshotUrls: []});
          break;
        case DataTypeEnum.serial:
          result = await addSerial({...contentAsSerial, seasons: []});
          break;
        case DataTypeEnum.anime:
          result = await addAnime({...contentAsAnime, screenshotPath: [], screenshotUrls: []});
          break;
      }

      if (result.error != undefined)
        return;

      navigate(`/admin/content/${result.data?.id ?? ""}`);
    }
    else {
      switch (props.content.dataType) {
        case DataTypeEnum.movie:
          updateMovie({id: props.content.id, data: contentAsMovie})
          break;
        case DataTypeEnum.serial:
          updateSerial({id: props.content.id, data: contentAsSerial});
          break;
        case DataTypeEnum.anime:
          updateAnime({id: props.content.id, data: contentAsAnime});
          break;
      }
    }
  }

  const onDelete = () => {
    if (!window.confirm("Видалити"))
      return;

    switch (props.content.dataType) {
      case DataTypeEnum.movie:
        deleteMovie(props.content.id!);
        break;
      case DataTypeEnum.serial:
        deleteSerial(props.content.id!);
        break;
      case DataTypeEnum.anime:
        deleteAnime(props.content.id!);
        break;
    }

    navigate(`/content`);
  }

  console.log(contentAsSerial.nextEpisodeDate)

  return (
    <FlexContainer className={`${styles.card} ${props.className ?? ""}`} vertical>
      <FlexContainer vertical align="center" className={styles.posterContainer}>
        {props.content.id != undefined && (
          <label className={styles.poster}>
            {props.content?.posterUrl != undefined && (
              <>
                <img src={props.content.posterUrl} alt={props.content.name}/>
                <RoundButton
                  icon={<AiOutlineDelete/>}
                  color="danger"
                  className={styles.deleteButton}
                  onClick={() => onPosterDelete()}
                />
              </>
            )}
            {props.content?.posterUrl == undefined && (
              <FlexContainer align="center" justify="center" className={styles.iconContainer}>
                <div className={styles.icon}>
                  <AiOutlineCloudUpload/>
                </div>
                <FileUpload onChange={e => onPosterUpload(e.target.files)}/>
              </FlexContainer>
            )}
          </label>
        )}
        {props.content.id == undefined && (
          <Alert className={styles.alert} color="danger">
            Спочатку створи контент
          </Alert>
        )}

        <div className={styles.buttonContainer}>
          <Button
            text="Зберегти"
            color="accent"
            onClick={() => onSave()}
          />
          <Button
            text="Видалити"
            color="danger"
            onClick={() => onDelete()}
            disabled={props.content.id == undefined}
          />
        </div>
      </FlexContainer>

      <FlexContainer vertical>
        {props.content.status == StatusEnum.ongoing && (
          <>
            <Divider/>
            <FlexContainer align="center" justify="space-between">
              <Paragraph>
                Наступна серія:
              </Paragraph>
              <Input
                placeholder="Наступна серія"
                type="datetime-local"
                value={contentAsAnime.nextEpisodeDate ? prepareDate(contentAsAnime.nextEpisodeDate): ""}
                onChange={e => props.setContent({...props.content, nextEpisodeDate: e.target.value == "" ? undefined : e.target.value} as IPreview)}
              />
            </FlexContainer>
          </>
        )}

        <Divider/>
        <FlexContainer align="center" justify="space-between">
          <Paragraph>
            Тип:
          </Paragraph>
          <Select
            placeholder="Тип"
            options={contentTypeOptions}
            values={[props.content.contentType]}
            setValues={value => props.setContent({...props.content, contentType: (value[0] as number)})}
          />
        </FlexContainer>

        {props.content.contentType == ContentTypeEnum.cartoon && (
          <>
            <Divider/>
            <FlexContainer align="center" justify="space-between">
              <Paragraph>
                Тип даних:
              </Paragraph>
              <Select
                placeholder="Тип даних"
                options={dataTypeOptions}
                values={[props.content.dataType]}
                setValues={value => props.setContent({...props.content, dataType: (value[0] as number)})}
              />
            </FlexContainer>
          </>
        )}

        <Divider/>
        <FlexContainer align="center" justify="space-between">
          <Paragraph>
            Статус:
          </Paragraph>
          <Select
            placeholder="Статус"
            options={statusOptions}
            values={[props.content.status]}
            setValues={value => props.setContent({...props.content, status: (value[0] as number)})}
          />
        </FlexContainer>

        {props.content.dataType === DataTypeEnum.anime && (
          <>
            <Divider/>
            <FlexContainer align="center" justify="space-between">
              <Paragraph>
                Тип аніме:
              </Paragraph>
              <Select
                placeholder="Тип аніме"
                options={animeTypeOptions}
                values={contentAsAnime.animeType ? [contentAsAnime.animeType] : []}
                setValues={value => props.setContent({...props.content, animeType: (value[0] as number)} as IPreview)}
              />
            </FlexContainer>

            <Divider/>
            <FlexContainer align="center" justify="space-between">
              <Paragraph>
                Студія:
              </Paragraph>
              <Input
                placeholder="Студія"
                value={contentAsAnime.studio ?? ""}
                onChange={e => props.setContent({...props.content, studio: e.target.value} as IPreview)}
              />
            </FlexContainer>
          </>
        )}

        <Divider/>
        <FlexContainer align="center" justify="space-between">
          <Paragraph>
            Вікові обмеження:
          </Paragraph>
          <Select
            placeholder="Тип"
            options={ageRestrictionOptions}
            values={[props.content.ageRestriction]}
            setValues={value => props.setContent({...props.content, ageRestriction: (value[0] as string)})}
          />
        </FlexContainer>

        <Divider/>
        <FlexContainer align="center" justify="space-between">
          <Paragraph>
            Країна:
          </Paragraph>
          <Input
            value={props.content.country}
            onChange={e => props.setContent({...props.content, country: e.target.value})}
          />
        </FlexContainer>

        {(props.content.dataType == DataTypeEnum.serial || props.content.dataType == DataTypeEnum.anime) && (
          <FlexContainer align="center" justify="space-between">
            <Paragraph>
              Кількість серій:
            </Paragraph>
            <Input
              placeholder="Кількість серій"
              value={contentAsSerial.episodesCount ?? ""}
              onChange={e => props.setContent({...props.content, episodesCount: e.target.value} as IPreview)}
            />
          </FlexContainer>
        )}

        <FlexContainer align="center" justify="space-between">
          <Paragraph>
            Час:
          </Paragraph>
          <Input
            placeholder="Час"
            value={contentAsMovie.time ?? ""}
            onChange={e => props.setContent({...props.content, time: e.target.value} as IPreview)}
          />
        </FlexContainer>

        <FlexContainer align="center" justify="space-between">
          <Paragraph>
            Дата релізу:
          </Paragraph>
          <Input
            placeholder="Дата релізу"
            type="date"
            value={props.content.release}
            onChange={e => props.setContent({...props.content, release: e.target.value})}
          />
        </FlexContainer>

      </FlexContainer>
    </FlexContainer>
  );
};

export default ContentInfoEditCard;
import {CSSProperties, Dispatch, FC, SetStateAction, useMemo, useState} from "react";
import styles from "./content-player-edit-card.module.scss";
import {Alert, Button, FlexContainer, Input, InputWithLabel, IOption, Select, TextArea} from "@/shared/ui-kit";
import {ContentTypeEnum, DataTypeEnum, IPreview, uploadApi} from "@/entities/common";
import {ScreenshotContainer} from "@/features/screenshot-container";
import {IMovie} from "@/entities/movie";
import {infoApi} from "@/entities/info";
import ScreenshotEditable from "@/features/screenshot-editable/ui/screenshot-editable/screenshot-editable.tsx";
import UploadImageButton from "@/widgets/content-player-edit-card/ui/upload-image-button/upload-image-button.tsx";
import {franchiseApi} from "@/entities/franchise";
import {AiOutlineDelete, AiOutlineEdit, AiOutlinePlus} from "react-icons/ai";
import {ISerial} from "@/entities/serial";
import {IAnime} from "@/entities/anime";

interface IProps {
  content: IPreview;
  setContent: Dispatch<SetStateAction<IPreview>>
  styles?: CSSProperties;
  className?: string;
}

const ContentPlayerEditCard: FC<IProps> = (props) => {
  const previewAsMovie = props.content as IMovie;

  const [uploadScreenshot] = uploadApi.useUploadScreenshotMutation();
  const [deleteScreenshot] = uploadApi.useDeleteScreenshotMutation();

  const [uploadBanner] = uploadApi.useUploadBannerMutation();
  const [deleteBanner] = uploadApi.useDeleteBannerMutation();

  const genres = infoApi.useFetchGenresQuery(undefined);
  const franchise = franchiseApi.useFetchFranchiseByFilterQuery("");

  const contentAsSerial = props.content as ISerial;
  const contentAsAnime = props.content as IAnime;

  const [selectedSeason, setSelectedSeason] = useState<string | undefined>();
  const [selectedEpisode, setSelectedEpisode] = useState<string | undefined>();

  const genresOptions = useMemo(() => {
    return genres.data?.map((item) => {
      return {label: item, value: item};
    })
  }, [genres.data]);

  const franchiseOptions = useMemo(() => {
    if (franchise.data == undefined)
      return [];

    let options: IOption[] = franchise.data.map((item) => {
      return {label: item.name, value: item.id!};
    });

    if (props.content.franchiseId)
      options = [{label: "Видалити", value: undefined}, ...options];

    return options;
  }, [franchise.data, props.content.franchiseId]);

  const seasonsOptions = useMemo(() => {
    if (props.content.dataType != DataTypeEnum.serial || contentAsSerial == undefined)
      return [];

    return contentAsSerial.seasons.map(item => {
      return {label: item.name ?? `${item.index} сезон`, value: item.id!}
    })
  }, [props.content]);

  const episodesOptions = useMemo(() => {
    if (props.content.contentType != ContentTypeEnum.serial && props.content.contentType != ContentTypeEnum.anime)
      return [];

    if (contentAsSerial == undefined)
      return [];

    if (props.content.contentType == ContentTypeEnum.serial) {
      const index = contentAsSerial.seasons.findIndex(x => x.id == selectedSeason);

      if (index == -1)
        return [];

      return contentAsSerial.seasons[index].episodes.map(item => {
        return {label: item.name ?? `${item.index} серія`, value: item.id};
      })
    }
    else {
      if (contentAsAnime.episodes == undefined)
        return [];

      return contentAsAnime.episodes.map(item => {
        return {label: item.name ?? `${item.index} серія`, value: item.id};
      })
    }

  }, [props.content, selectedSeason])

  const onScreenshotUpload = (file: File) => {
    const formData = new FormData();
    formData.append("contentId", props.content.id!);
    formData.append("file", file);

    uploadScreenshot(formData);
  }

  const onScreenshotDelete = (path?: string) => {
    if (!window.confirm("Видалити"))
      return;

    deleteScreenshot({id: props.content.id!, path: path!});
  };

  const onBannerUpload = (file: File) => {
    const formData = new FormData();
    formData.append("contentId", props.content.id!);
    formData.append("file", file);

    uploadBanner(formData);
  }

  const onBannerDelete = () => {
    if (!window.confirm("Видалити"))
      return;

    deleteBanner(props.content.id!);
  };

  return (
    <FlexContainer className={`${styles.container} ${props.className ?? ""}`} styles={props.styles} vertical gap="page">
      <InputWithLabel label="Назва">
        <Input
          value={props.content?.name}
          onChange={e => props.setContent({...props.content, name: e.target.value})}
        />
      </InputWithLabel>

      <InputWithLabel label="Оригінальна назва">
        <Input
          value={props.content?.originalName}
          onChange={e => props.setContent({...props.content, originalName: e.target.value})}
        />
      </InputWithLabel>

      {genres.data != undefined && (
        <InputWithLabel label="Жанри">
          <Select
            placeholder="Жанри"
            options={genresOptions}
            isMulti
            isCreatable
            isSearchable
            values={props.content.genres}
            setValues={value => props.setContent({...props.content, genres: value as string[]})}
          />
        </InputWithLabel>
      )}

      {franchise.data != undefined && (
        <InputWithLabel label="Франшиза">
          <Select
            placeholder="Франшиза"
            options={franchiseOptions}
            isSearchable
            values={props.content.franchiseId ? [props.content.franchiseId] : []}
            setValues={value => props.setContent({...props.content, franchiseId: (value[0] as string)})}
          />
        </InputWithLabel>
      )}

      {props.content.dataType == DataTypeEnum.serial && (
        <InputWithLabel label="Сезони">
          <FlexContainer className={styles.fullWidth}>
            <Select
              placeholder="Сезони"
              options={seasonsOptions}
              isSearchable
              values={selectedSeason ? [selectedSeason] : []}
              setValues={value => setSelectedSeason(value[0] as string)}
            />
            <Button
              icon={<AiOutlinePlus/>}
              shape="square"
            />
            <Button
              icon={<AiOutlineEdit/>}
              shape="square"
            />
            <Button
              icon={<AiOutlineDelete/>}
              shape="square"
            />
          </FlexContainer>
        </InputWithLabel>
      )}

      {(props.content.dataType == DataTypeEnum.serial || props.content.dataType == DataTypeEnum.anime) && (
        <InputWithLabel label="Серії">
          <FlexContainer className={styles.fullWidth}>
            <Select
              placeholder="Серії"
              options={episodesOptions}
              isSearchable
              values={selectedEpisode ? [selectedEpisode] : []}
              setValues={value => setSelectedEpisode(value[0] as string)}
            />
            <Button
              icon={<AiOutlinePlus/>}
              shape="square"
            />
            <Button
              icon={<AiOutlineEdit/>}
              shape="square"
            />
            <Button
              icon={<AiOutlineDelete/>}
              shape="square"
            />
          </FlexContainer>
        </InputWithLabel>
      )}

      <InputWithLabel label="Скріншоти">
        {props.content.id != undefined && (
          <ScreenshotContainer>
            {previewAsMovie.screenshotUrls?.map((item, index) => (
              <ScreenshotEditable
                url={item}
                path={previewAsMovie.screenshotPath[index]}
                key={item}
                onDelete={onScreenshotDelete}
              />
            ))}
            <UploadImageButton onUpload={onScreenshotUpload}/>
          </ScreenshotContainer>
        )}
        {props.content.id == undefined && (
          <Alert className={styles.alert} color="danger">
            Спочатку створи контент
          </Alert>
        )}
      </InputWithLabel>

      <InputWithLabel label="Банер">
        {props.content.id != undefined && (
          <div className={styles.bannerContainer}>
            {previewAsMovie.bannerUrl == undefined && (
              <UploadImageButton onUpload={onBannerUpload}/>
            )}
            {previewAsMovie.bannerUrl != undefined && (
              <ScreenshotEditable
                url={previewAsMovie.bannerUrl}
                onDelete={onBannerDelete}
              />
            )}
          </div>
        )}
        {props.content.id == undefined && (
          <Alert className={styles.alert} color="danger">
            Спочатку створи контент
          </Alert>
        )}
      </InputWithLabel>

      <InputWithLabel label="Трейлер">
        <Input
          placeholder="Трейлер"
          value={previewAsMovie.trailerUrl ?? ""}
          onChange={e => props.setContent({...props.content, trailerUrl: e.target.value} as IPreview)}
        />
      </InputWithLabel>

      <InputWithLabel label="Опис">
        <TextArea
          placeholder="Опис"
          value={props.content?.description}
          rows={8}
          onChange={e => props.setContent({...props.content, description: e.target.value})}
        />
      </InputWithLabel>

    </FlexContainer>
  );
};

export default ContentPlayerEditCard;
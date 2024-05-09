import {CSSProperties, Dispatch, FC, SetStateAction, useMemo, useState} from "react";
import styles from "./content-player-edit-card.module.scss";
import {Alert, FlexContainer, Input, InputWithLabel, IOption, Select, TextArea} from "@/shared/ui-kit";
import {DataTypeEnum, IPreview, uploadApi} from "@/entities/common";
import {ScreenshotContainer} from "@/features/screenshot-container";
import {IMovie} from "@/entities/movie";
import {infoApi} from "@/entities/info";
import {franchiseApi} from "@/entities/franchise";
import {ScreenshotEditable} from "@/features/screenshot-editable";
import SeasonModal from "../season-modal/season-modal";
import EpisodeModal from "../episode-modal/episode-modal";
import UploadImageButton from "../upload-image-button/upload-image-button";
import UploadContentButton from "@/widgets/content-player-edit-card/ui/upload-content-button/upload-content-button.tsx";
import {AnimeTypeEnum, IAnime} from "@/entities/anime";

interface IProps {
  content: IPreview;
  setContent: Dispatch<SetStateAction<IPreview>>
  styles?: CSSProperties;
  className?: string;
}

const ContentPlayerEditCard: FC<IProps> = (props) => {
  const previewAsMovie = props.content as IMovie;
  const contentAsAnime = props.content as IAnime;

  const [uploadScreenshot] = uploadApi.useUploadScreenshotMutation();
  const [deleteScreenshot] = uploadApi.useDeleteScreenshotMutation();

  const [uploadBanner] = uploadApi.useUploadBannerMutation();
  const [deleteBanner] = uploadApi.useDeleteBannerMutation();

  const genres = infoApi.useFetchGenresQuery(undefined);
  const franchise = franchiseApi.useFetchFranchiseByFilterQuery("");

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
          {props.content.id != undefined && (
            <SeasonModal
              content={props.content}
              setContent={props.setContent}
              selectedSeason={selectedSeason}
              setSelectedSeason={setSelectedSeason}
            />
          )}
          {props.content.id == undefined && (
            <Alert className={styles.alert} color="danger">
              Спочатку створи контент
            </Alert>
          )}
        </InputWithLabel>
      )}

      {(props.content.dataType == DataTypeEnum.serial || props.content.dataType == DataTypeEnum.anime) && (
        <InputWithLabel label="Серії">
          {props.content.id != undefined && (
            <EpisodeModal
              content={props.content}
              setContent={props.setContent}
              selectedSeason={selectedSeason}
              selectedEpisode={selectedEpisode}
              setSelectedEpisode={setSelectedEpisode}
            />
          )}
          {props.content.id == undefined && (
            <Alert className={styles.alert} color="danger">
              Спочатку створи контент
            </Alert>
          )}
        </InputWithLabel>
      )}

      <InputWithLabel label="Контент">
        {props.content.id != undefined && (
          <>
            {(props.content.dataType == DataTypeEnum.movie || (props.content.dataType == DataTypeEnum.anime && contentAsAnime.animeType == AnimeTypeEnum.film)) && (
              <UploadContentButton content={props.content} contentId={props.content.id!} isEpisode={false}/>
            )}

            {(props.content.dataType == DataTypeEnum.serial || (props.content.dataType == DataTypeEnum.anime && contentAsAnime.animeType != AnimeTypeEnum.film)) && (
              <>
                {selectedEpisode == undefined && (
                  <Alert className={styles.alert} color="danger">
                    Спочатку вибери серію
                  </Alert>
                )}
                {selectedEpisode != undefined && (
                  <UploadContentButton content={props.content} contentId={selectedEpisode!} isEpisode={true}/>
                )}
              </>
            )}
          </>
        )}
        {props.content.id == undefined && (
          <Alert className={styles.alert} color="danger">
            Спочатку створи контент
          </Alert>
        )}
      </InputWithLabel>

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
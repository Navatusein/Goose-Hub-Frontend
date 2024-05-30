import {FC, useRef} from "react";
// import styles from "./upload-content-button.module.scss";
import {Button, FileUpload} from "@/shared/ui-kit";
import {DataTypeEnum, IPreview, uploadApi} from "@/entities/common";

interface IProps {
  content: IPreview;
  contentId: string;
  isEpisode: boolean;
}

const UploadContentButton: FC<IProps> = (props) => {
  const fileUploadRef = useRef<HTMLInputElement>(null);

  const [uploadMovie, uploadMovieResult] = uploadApi.useUploadMovieMutation();
  const [uploadSerial, uploadSerialResult] = uploadApi.useUploadSerialMutation();
  const [uploadAnime, uploadAnimeResult] = uploadApi.useUploadAnimeMutation();

  const onUpload = (files: FileList | null) => {
    if (files == undefined)
      return;

    const formData = new FormData();
    formData.append("contentId", props.contentId);
    formData.append("isEpisode", props.isEpisode ? "true" : "false");
    formData.append("file", files[0]);

    switch (props.content.dataType) {
      case DataTypeEnum.movie:
        uploadMovie(formData);
        return;
      case DataTypeEnum.serial:
        uploadSerial(formData);
        return;
      case DataTypeEnum.anime:
        uploadAnime(formData);
        return;
    }
  }

  const onClick = () => {
    if (fileUploadRef.current == undefined)
      return;

    fileUploadRef.current.click();
  }

  return (
    <label>
      <Button
        text="Завантажити контент"
        color="accent"
        onClick={onClick}
        disabled={uploadMovieResult.isLoading || uploadSerialResult.isLoading || uploadAnimeResult.isLoading}
      />
      <FileUpload onChange={e => onUpload(e.target.files)} ref={fileUploadRef}/>
    </label>
  );
};

export default UploadContentButton;
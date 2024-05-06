import {FC} from "react";
import styles from "./upload-image-button.module.scss";
import {AiOutlineCloudUpload} from "react-icons/ai";
import {FileUpload, FlexContainer} from "@/shared/ui-kit";

interface IProps {
  onUpload: (file: File) => void;
}

const UploadImageButton: FC<IProps> = (props) => {
  const onChange = (files: FileList | null) => {
    if (files == undefined)
      return;

    props.onUpload(files[0]);
  };

  return (
    <label className={styles.label}>
      <FlexContainer className={styles.container} align="center" justify="center" vertical>
        <div className={styles.icon}>
          <AiOutlineCloudUpload/>
        </div>
        <FileUpload onChange={(e => onChange(e.target.files))}/>
      </FlexContainer>
    </label>
  );
};

export default UploadImageButton;
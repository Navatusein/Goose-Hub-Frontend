import {ChangeEventHandler, FC} from "react";
import styles from "./file-upload.module.scss";

interface IProps {
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

const FileUpload: FC<IProps> = (props) => {
  return (
    <>
      <input className={styles.input} type="file" onChange={props.onChange}/>
    </>
  );
};

export default FileUpload;
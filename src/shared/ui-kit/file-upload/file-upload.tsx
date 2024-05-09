import {ChangeEventHandler, ForwardedRef, forwardRef, RefObject} from "react";
import styles from "./file-upload.module.scss";

interface IProps {
  onChange?: ChangeEventHandler<HTMLInputElement>;
  ref?: RefObject<HTMLInputElement>;
}

const FileUpload = forwardRef((props: IProps, ref: ForwardedRef<HTMLInputElement>) => {
  return (
    <>
      <input ref={ref} className={styles.input} type="file" onChange={props.onChange}/>
    </>
  );
});

export default FileUpload;
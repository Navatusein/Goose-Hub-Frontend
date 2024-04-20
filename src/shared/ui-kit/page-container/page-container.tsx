import {CSSProperties, FC, ReactNode} from "react";
import styles from "./page-container.module.scss";

interface IProps {
  children: ReactNode;
  styles?: CSSProperties;
  className?: string;
}

const PageContainer: FC<IProps> = (props) => {
  return (
    <div className={`${styles.pageContainer} ${props.className ?? ""}`} style={props.styles}>
      {props.children}
    </div>
  );
};

export default PageContainer;
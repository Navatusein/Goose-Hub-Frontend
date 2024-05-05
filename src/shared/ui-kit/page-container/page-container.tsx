import {CSSProperties, FC, ReactNode} from "react";
import styles from "./page-container.module.scss";
import {FlexContainer} from "@/shared/ui-kit";

interface IProps {
  children: ReactNode;
  styles?: CSSProperties;
  className?: string;
  horizontal?: boolean;
}

const PageContainer: FC<IProps> = (props) => {
  return (
    <FlexContainer className={`${styles.pageContainer} ${props.className ?? ""}`} gap="page" styles={props.styles} vertical={!props.horizontal}>
      {props.children}
    </FlexContainer>
  );
};

export default PageContainer;
import {CSSProperties, FC, ReactNode} from "react";
import styles from "./screenshot-container.module.scss";
import {FlexContainer} from "@/shared/ui-kit";

interface IProps {
  styles?: CSSProperties;
  className?: string;
  children: ReactNode;
}

const ScreenshotContainer: FC<IProps> = (props) => {
  return (
    <div className={`${styles.screenshotContainer} ${props.className ?? ""}`} style={props.styles}>
      <FlexContainer className={styles.screenshotWrapper}>
        {props.children}
      </FlexContainer>
    </div>
  );
};

export default ScreenshotContainer;
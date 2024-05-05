import {CSSProperties, FC} from "react";
import styles from "./screenshot-container.module.scss";
import {FlexContainer} from "@/shared/ui-kit";
import {IPreview} from "@/entities/common";
import {IMovie} from "@/entities/movie";

interface IProps {
  content: IPreview;
  styles?: CSSProperties;
  className?: string;
}

const ScreenshotContainer: FC<IProps> = (props) => {
  return (
    <div className={`${styles.screenshotContainer} ${props.className ?? ""}`} style={props.styles}>
      <FlexContainer className={styles.screenshotWrapper}>
        {(props.content as IMovie).screenshotUrls.map(item => (
          <div className={styles.screenshot} key={item}>
            <img src={item} alt=""/>
          </div>
        ))}
      </FlexContainer>
    </div>
  );
};

export default ScreenshotContainer;
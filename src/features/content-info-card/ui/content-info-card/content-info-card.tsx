import {CSSProperties, FC} from "react";
import styles from "./content-info-card.module.scss";
import {DataTypeEnum, IPreview} from "@/entities/common";
import {IAnime} from "@/entities/anime";

interface IProps {
  content?: IPreview;
  styles?: CSSProperties;
  className?: string;
}

const ContentInfoCard: FC<IProps> = (props) => {
  return (
    <div className={`${styles.card} ${props.className ?? ""}`}>
      <div className={styles.poster}>
        {props.content?.posterUrl && (
          <img src={props.content.posterUrl} alt={props.content.name}/>
        )}
      </div>
      <div>
        {props.content?.dataType === DataTypeEnum.anime && (
          <div>{(props.content as IAnime).studio}</div>
        )}
      </div>
    </div>
  );
};

export default ContentInfoCard;
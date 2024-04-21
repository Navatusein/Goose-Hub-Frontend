import {CSSProperties, FC} from 'react';
import {IPreview} from "@/entities/common";
import styles from "./content-card.module.scss";

interface IProps {
  content: IPreview;
  styles?: CSSProperties;
  className?: string;
}

const ContentCard: FC<IProps> = (props) => {
  const contentType = ["Movie", "Serial", "Cartoon", "Anime"];

  return (
    <div className={`${styles.cardContainer} ${props.className ?? ""}`} style={props.styles} onClick={() => {console.log(props.content.id)}}>
      <div className={styles.poster}>
        {props.content.posterUrl && (
          <img src={props.content.posterUrl} alt={props.content.name}/>
        )}
        <div className={styles.contentTypeTag}>
          {contentType[props.content.contentType - 1]}
        </div>
      </div>
      <div className={styles.name}>
        {props.content.name}
      </div>
    </div>
  );
};

export default ContentCard;
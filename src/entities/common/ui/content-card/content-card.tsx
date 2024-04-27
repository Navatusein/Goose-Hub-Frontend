import {CSSProperties, FC} from 'react';
import {IPreview} from "@/entities/common";
import styles from "./content-card.module.scss";
import {useNavigate} from "react-router-dom";

interface IProps {
  content: IPreview;
  styles?: CSSProperties;
  className?: string;
}

const contentType = ["Movie", "Serial", "Cartoon", "Anime"];

const ContentCard: FC<IProps> = (props) => {
  const navigate = useNavigate();

  const onClick = () => {
    const path = `/content/${contentType[props.content.contentType - 1].toLowerCase()}/${props.content.id}`;
    navigate(path);
  }

  return (
    <div className={`${styles.cardContainer} ${props.className ?? ""}`} style={props.styles} onClick={() => onClick()}>
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
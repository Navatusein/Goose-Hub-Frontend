import {CSSProperties, FC} from 'react';
import styles from "./content-carousel-card.module.scss";
import {IPreview} from "@/entities/common";
import {Button, Paragraph} from "@/shared/ui-kit";
import {AiOutlinePlayCircle} from "react-icons/ai";
import {useNavigate} from "react-router-dom";

interface IProps {
  content: IPreview;
  styles?: CSSProperties;
  className?: string;
}

const contentType = ["movie", "serial", "cartoon", "anime"];

const ContentCarouselCard: FC<IProps> = (props) => {

  const navigate = useNavigate();

  const redirect = () => {
    navigate(`/content/${contentType[props.content.contentType - 1]}/${props.content.id}`);
  }

  return (
    <section className={`${styles.content} ${props.className}`} style={props.styles}>
      <img src={props.content.bannerUrl} alt={props.content.name}/>
      <div className={styles.information}>
        <h1>{props.content.name}</h1>
        <Paragraph>{props.content.description}</Paragraph>
        <Button text="Дивитись" icon={<AiOutlinePlayCircle/>} className={styles.button} color="accent" onClick={() => redirect()}/>
      </div>
    </section>
  );
};

export default ContentCarouselCard;
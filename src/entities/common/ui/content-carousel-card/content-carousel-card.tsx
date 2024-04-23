import {CSSProperties, FC} from 'react';
import styles from "./content-carousel-card.module.scss";
import {IPreview} from "@/entities/common";
import {Button, Paragraph} from "@/shared/ui-kit";
import {AiOutlinePlayCircle} from "react-icons/ai";

interface IProps {
  content: IPreview;
  styles?: CSSProperties;
  className?: string;
}

const ContentCarouselCard: FC<IProps> = (props) => {
  return (
    <section className={`${styles.content} ${props.className}`} style={props.styles}>
      <img src={props.content.bannerUrl} alt={props.content.name}/>
      <div className={styles.information}>
        <h1>{props.content.name}</h1>
        <Paragraph>{props.content.description}</Paragraph>
        <Button text="Дивитись" icon={<AiOutlinePlayCircle/>} className={styles.button} color="accent"/>
      </div>
    </section>
  );
};

export default ContentCarouselCard;
import {CSSProperties, FC, useState} from 'react';
import styles from "./content-carousel.module.scss";
import {IPreview} from "@/entities/common";
import {Button} from "@/shared/ui-kit";
import {AiOutlinePlayCircle} from "react-icons/ai";

interface IProps {
  contentList: IPreview[];
  styles?: CSSProperties;
  className?: string;
}

const ContentCarousel: FC<IProps> = (props) => {
  const [contentIndex, setContentIndex] = useState(0)

  return (
    <section className={`${styles.carousel} ${props.className ?? ""}`} style={props.styles}>
      <div className={styles.contentContainer}>
        {props.contentList.map((item) => (
          <div
            className={styles.content}
            key={item.id}
            style={{ translate: `${-100 * contentIndex}%` }}
          >
            <img
              src={item.bannerUrl}
              alt={item.name}
            />
            <div className={styles.information}>
              <h1>{props.contentList[contentIndex].name}</h1>
              <p>{props.contentList[contentIndex].description}</p>
              <Button text="Дивитись" icon={<AiOutlinePlayCircle/>} styles={{width: 130}}/>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.carouselControls}>
        {props.contentList.map((_, index) => (
          <div
            className={`${styles.dotButton} ${index === contentIndex && styles.accentColor}`}
            key={index}
            onClick={() => setContentIndex(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default ContentCarousel;
import {CSSProperties, FC, useState} from 'react';
import styles from "./content-carousel.module.scss";
import {previewApi, ContentCarouselCard} from "@/entities/common";

interface IProps {
  styles?: CSSProperties;
  className?: string;
}

const ContentCarousel: FC<IProps> = (props) => {
  const [contentIndex, setContentIndex] = useState(0)

  const contentList = previewApi.useFetchPreviewByIdsQuery(import.meta.env.VITE_CONTENT_CAROUSEL_IDS.split(","));

  return (
    <section className={`${styles.carousel} ${props.className ?? ""}`} style={props.styles}>
      <div className={styles.contentContainer}>
        {contentList.data?.map((content) => (
          <ContentCarouselCard content={content} key={content.id} styles={{translate: `${-100 * contentIndex}%`}}/>
        ))}
      </div>
      <div className={styles.carouselControls}>
        {contentList.data?.map((_, index) => (
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
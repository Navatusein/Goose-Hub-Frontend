import {CSSProperties, FC, useState} from 'react';
import styles from "./content-carousel.module.scss";
import {commonApi, ContentCarouselCard} from "@/entities/common";

interface IProps {
  styles?: CSSProperties;
  className?: string;
}

const IDS = [
  "65f4ae2ead787fc1e52d0d93",
  "65f4ae51ad787fc1e52d0d94",
  "65f62c67811382f28610c651",
  "660952b44026b4a14f928767"
]

const ContentCarousel: FC<IProps> = (props) => {
  const [contentIndex, setContentIndex] = useState(0)

  const contentList = commonApi.useFetchContentByIdsQuery(IDS);

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
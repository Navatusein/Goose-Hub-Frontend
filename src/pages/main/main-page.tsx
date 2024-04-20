import {FC, useEffect} from "react";
import styles from "./main-page.module.scss"
import {
  commonApi,
  ContentCarousel,
  ContentTypeEnum,
  DataTypeEnum,
  IPreview,
  SortParamEnum,
  StatusEnum
} from "@/entities/common";
import {useOutletContext} from "react-router-dom";
import {IContext} from "@/shared/types/types.ts";
import {CardGrid} from "@/shared/ui-kit";
import ContentCard from "../../entities/common/ui/content-card/content-card.tsx";
import FilterCard from "@/features/filter-card/filter-card.tsx";

const content: IPreview = {
  name: "Клинок, який знищує демонів",
  dataType: DataTypeEnum.anime,
  contentType: ContentTypeEnum.anime,
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  genres: ["Genre1", "Genre2", "Genre3"],
  ageRestriction: "16+",
  country: "Японія",
  status: StatusEnum.announcement,
  directedBy: ["DirectedBy"],
  studio: "Studio",
  posterUrl: "https://m.media-amazon.com/images/I/712sDu2sccL._AC_SL1500_.jpg",
  bannerUrl: "https://cdn.dribbble.com/userupload/5204024/file/original-cbe25308c60226cf953ebed8944836d0.png"
}

const MainPage: FC = () => {
  const {setIsHeaderAbsolute} = useOutletContext<IContext>();

  const test = commonApi.useFetchContentQueryQuery({pageSize: 10, page: 0, genres: [], sort: SortParamEnum.none});

  useEffect(() => {
    console.log(test.data);
  }, [test]);

  useEffect(() => {
    setIsHeaderAbsolute(true);
  })

  return (
    <div className={styles.verticalContainer}>
      <ContentCarousel contentList={[content, content, content, content]}/>
      <div className={styles.horizontalContainer} style={{padding: "0 200px"}}>
        <CardGrid>
          <ContentCard content={content}/>
          <ContentCard content={content}/>
          <ContentCard content={content}/>
          <ContentCard content={content}/>
          <ContentCard content={content}/>
          <ContentCard content={content}/>
          <ContentCard content={content}/>
          <ContentCard content={content}/>
          <ContentCard content={content}/>
          <ContentCard content={content}/>
          <ContentCard content={content}/>
        </CardGrid>
        <FilterCard styles={{minWidth: 300, height: "fit-content"}}/>
      </div>
    </div>
  );
};

export default MainPage;
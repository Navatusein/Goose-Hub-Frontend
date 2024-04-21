import {FC, useEffect, useState} from "react";
import styles from "./content-container.module.scss";
import {commonApi, ContentCard, ContentTypeEnum, IQuery, SortParamEnum} from "@/entities/common";
import {CardGrid, FlexContainer, Input, Link} from "@/shared/ui-kit";
import {FilterCard} from "@/features/filter-card";
import {AiOutlineSearch} from "react-icons/ai";
import {useParams} from "react-router-dom";
import {Pagination} from "@/features/pagination";

type PathParams = {
  contentType?: "movie" | "serial" | "cartoon" | "anime";
}

const defaultQuery: IQuery = {
  pageSize: 5,
  page: 1,
  genres: [],
  statuses: [],
  animeTypes: [],
  sort: SortParamEnum.none,
  query: ""
}

const ContentContainer: FC = () => {
  const {contentType} = useParams<PathParams>();

  const [query, setQuery] = useState<IQuery>(defaultQuery)

  const content = commonApi.useFetchContentQueryQuery(query);

  useEffect(() => {
    const contentTypeList = {
      "movie": ContentTypeEnum.movie,
      "serial": ContentTypeEnum.serial,
      "cartoon": ContentTypeEnum.cartoon,
      "anime": ContentTypeEnum.anime,
    };

    setQuery({...defaultQuery, contentType: contentType && contentTypeList[contentType!]})
  }, [contentType]);

  useEffect(() => {
    setQuery({...query, page: 1});
  }, [content.data?.totalCount]);

  return (
    <FlexContainer vertical gap={30}>
      <FlexContainer justify="space-between">
        <FlexContainer align="center">
          <Link
            text="ВСІ"
            className={`${styles.link} ${query.contentType === undefined && styles.active}`}
            color={query.contentType === undefined ? "accent" : undefined}
            to="/content"
          />
          <Link
            text="ФІЛЬМИ"
            className={`${styles.link} ${query.contentType === ContentTypeEnum.movie && styles.active}`}
            color={query.contentType === ContentTypeEnum.movie ? "accent" : undefined}
            to="/content/movie"
          />
          <Link
            text="СЕРІАЛИ"
            className={`${styles.link} ${query.contentType === ContentTypeEnum.serial && styles.active}`}
            color={query.contentType === ContentTypeEnum.serial ? "accent" : undefined}
            to="/content/serial"
          />
          <Link
            text="МУЛЬТФІЛЬМИ"
            className={`${styles.link} ${query.contentType === ContentTypeEnum.cartoon && styles.active}`}
            color={query.contentType === ContentTypeEnum.cartoon ? "accent" : undefined}
            to="/content/cartoon"
          />
          <Link
            text="АНІМЕ"
            className={`${styles.link} ${query.contentType === ContentTypeEnum.anime && styles.active}`}
            color={query.contentType === ContentTypeEnum.anime ? "accent" : undefined}
            to="/content/anime"
          />
        </FlexContainer>
        <Input
          placeholder="Пошук"
          icon={<AiOutlineSearch/>}
          styles={{width: 500}}
          value={query.query}
          onChange={(e) => setQuery({...query, query: e.target.value})}
        />
      </FlexContainer>
      <FlexContainer gap={20}>
        <CardGrid className={styles.contentGrid}>
          {content.data?.returnedCount === 0 && (
            <h1>Нічого не знайдено</h1>
          )}
          {content.data?.data.map((content) => (
            <ContentCard content={content} key={content.id}/>
          ))}
        </CardGrid>
        <FilterCard
          query={query}
          setQuery={setQuery}
          className={styles.filterCard}
        />
      </FlexContainer>
      <Pagination
        currentPage={query.page}
        setCurrentPage={(currentPage) => setQuery({...query, page: currentPage})}
        total={Math.ceil((content.data?.totalCount ?? 1) / (content.data?.pageSize ?? 1))}
        styles={{alignSelf: "center"}}
      />
    </FlexContainer>
  );
};

export default ContentContainer;
import {FC, useEffect, useState} from "react";
import styles from "./content-container.module.scss";
import {commonApi, ContentCard, ContentTypeEnum, IQuery, SortParamEnum} from "@/entities/common";
import {Button, CardGrid, FlexContainer, Input, Link, Modal} from "@/shared/ui-kit";
import {FilterCard} from "@/features/filter-card";
import {AiOutlineControl, AiOutlineSearch} from "react-icons/ai";
import {useParams} from "react-router-dom";
import {Pagination} from "@/features/pagination";
import useMediaQuery from "@/shared/hooks/use-media-query.ts";

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

  const closeFilterMenu = useMediaQuery("(max-width: 1024px)")

  const [query, setQuery] = useState<IQuery>(defaultQuery)
  const [showFilterModal, setShowFilterModal] = useState(false)

  const content = commonApi.useFetchPreviewByFilterQuery(query);

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
      <FlexContainer justify="space-between" className={styles.navigationBar}>
        <FlexContainer align="center" className={styles.linkContainer}>
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
        <FlexContainer className={styles.inputContainer}>
          <Input
            placeholder="Пошук"
            icon={<AiOutlineSearch/>}
            value={query.query}
            onChange={(e) => setQuery({...query, query: e.target.value})}
          />
          <Button
            shape="square"
            icon={<AiOutlineControl/>}
            className={styles.filterMenuButton}
            onClick={() => setShowFilterModal(!showFilterModal)}
          />
        </FlexContainer>
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
        <Modal isOpen={showFilterModal && closeFilterMenu} setIsOpen={setShowFilterModal} className={styles.modal}>
          <FilterCard
            query={query}
            setQuery={setQuery}
            className={styles.filterCard}
          />
        </Modal>
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
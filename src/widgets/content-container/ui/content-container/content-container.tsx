import {FC, useState} from 'react';
import {commonApi, ContentCard, IQuery, SortParamEnum} from "@/entities/common";
import {CardGrid, FlexContainer} from "@/shared/ui-kit";
import FilterCard from "@/features/filter-card/filter-card.tsx";

const defaultQuery: IQuery = {
  pageSize: 20,
  page: 1,
  genres: [],
  sort: SortParamEnum.none
}

const ContentContainer: FC = () => {
  const [query, setQuery] = useState<IQuery>(defaultQuery)

  const content = commonApi.useFetchContentQueryQuery(query);

  return (
    <FlexContainer gap={20}>
      <CardGrid>
        {content.data?.data.map((content) => (
          <ContentCard content={content}/>
        ))}
      </CardGrid>
      <FilterCard query={query} setQuery={setQuery}/>
    </FlexContainer>
  );
};

export default ContentContainer;
import {ChangeEvent, CSSProperties, Dispatch, FC, SetStateAction, useMemo} from "react";
import {Button, CheckboxTag, FlexContainer, InputWithLabel, RangeSlider, Select} from "@/shared/ui-kit";
import styles from "./filter-card.module.scss"
import {AiOutlineDelete} from "react-icons/ai";
import {ContentTypeEnum, IQuery, SortParamEnum, StatusEnum} from "@/entities/common";
import {infoApi} from "@/entities/info";
import {AnimeTypeEnum} from "@/entities/anime";

const sort = [
  {label: "За датою", value: 0},
]

interface IProps {
  query: IQuery;
  setQuery: Dispatch<SetStateAction<IQuery>>;
  styles?: CSSProperties;
  className?: string;
}

const FilterCard: FC<IProps> = (props) => {
  const genres = infoApi.useFetchGenresQuery(props.query.contentType);
  const years = infoApi.useFetchYearsQuery(props.query.contentType);

  const genresOptions = useMemo(() => {
    return genres.data?.map((genre) => {
      return {label: genre, value: genre};
    })
  }, [genres.data]);

  const toggleStatusValue = (event: ChangeEvent<HTMLInputElement>, value: StatusEnum) => {
    const isChecked = event.target.checked;

    const updated = isChecked
      ? [...props.query.statuses, value]
      : props.query.statuses.filter(x => x !== value);

    props.setQuery({ ...props.query, statuses: updated });
  };

  const isStatusValueChecked = (value: StatusEnum) => {
    return props.query.statuses.find(x => x === value) != undefined;
  }

  const toggleAnimeTypeValue = (event: ChangeEvent<HTMLInputElement>, value: AnimeTypeEnum) => {
    const isChecked = event.target.checked;

    const updated = isChecked
      ? [...props.query.animeTypes, value]
      : props.query.animeTypes.filter(x => x !== value);

    props.setQuery({ ...props.query, animeTypes: updated });
  };

  const isAnimeTypeValueChecked = (value: AnimeTypeEnum) => {
    return props.query.animeTypes.find(x => x === value) != undefined;
  }

  const setYearValue = (value: number[]) => {
    props.setQuery({...props.query, yearStart: Math.min(...value), yearEnd: Math.max(...value)});
  }

  const clear = () => {
    props.setQuery({
      ...props.query,
      genres: [],
      statuses: [],
      animeTypes: [],
      yearStart: years.data?.minYear,
      yearEnd: years.data?.maxYear
    })
  }

  return (
    <div className={`${styles.filterCard} ${props.className ?? ""}`} style={props.styles}>
      <InputWithLabel label="Сортування">
        <Select
          placeholder="Сортування"
          options={sort}
          values={[props.query.sort as number]}
          setValues={(values) => props.setQuery({...props.query, sort: (values as SortParamEnum[])[0]})}
        />
      </InputWithLabel>
      <InputWithLabel label="Жанр">
        <Select
          placeholder="Жанр"
          isMulti
          isSearchable
          isCreatable
          options={genresOptions}
          values={props.query.genres}
          setValues={(values) => props.setQuery({...props.query, genres: (values as string[])})}
        />
      </InputWithLabel>
      <InputWithLabel label="Статус">
        <FlexContainer warp>
          <CheckboxTag
            text="Aнонс"
            onChange={(e) => toggleStatusValue(e, StatusEnum.announcement)}
            checked={isStatusValueChecked(StatusEnum.announcement)}
          />
          <CheckboxTag
            text="Виходить"
            onChange={(e) => toggleStatusValue(e, StatusEnum.ongoing)}
            checked={isStatusValueChecked(StatusEnum.ongoing)}
          />
          <CheckboxTag
            text="На паузі"
            onChange={(e) => toggleStatusValue(e, StatusEnum.paused)}
            checked={isStatusValueChecked(StatusEnum.paused)}
          />
          <CheckboxTag
            text="Завершено"
            onChange={(e) => toggleStatusValue(e, StatusEnum.completed)}
            checked={isStatusValueChecked(StatusEnum.completed)}
          />
        </FlexContainer>
      </InputWithLabel>
      {props.query.contentType === ContentTypeEnum.anime && (
        <InputWithLabel label="Тип">
          <FlexContainer warp>
            <CheckboxTag
              text="Спешл"
              onChange={(e) => toggleAnimeTypeValue(e, AnimeTypeEnum.special)}
              checked={isAnimeTypeValueChecked(AnimeTypeEnum.special)}
            />
            <CheckboxTag
              text="Фільм"
              onChange={(e) => toggleAnimeTypeValue(e, AnimeTypeEnum.film)}
              checked={isAnimeTypeValueChecked(AnimeTypeEnum.film)}
            />
            <CheckboxTag
              text="OVA"
              onChange={(e) => toggleAnimeTypeValue(e, AnimeTypeEnum.ova)}
              checked={isAnimeTypeValueChecked(AnimeTypeEnum.ova)}
            />
            <CheckboxTag
              text="ONA"
              onChange={(e) => toggleAnimeTypeValue(e, AnimeTypeEnum.ona)}
              checked={isAnimeTypeValueChecked(AnimeTypeEnum.ona)}
            />
            <CheckboxTag
              text="TV Серіал"
              onChange={(e) => toggleAnimeTypeValue(e, AnimeTypeEnum.tv)}
              checked={isAnimeTypeValueChecked(AnimeTypeEnum.tv)}
            />
          </FlexContainer>
        </InputWithLabel>
      )}
      <InputWithLabel label="Рік виходу">
        <RangeSlider
          value={[props.query.yearStart ?? years.data?.minYear ?? 2000, props.query.yearEnd ?? years.data?.maxYear ?? 2000]}
          setValue={(value) => setYearValue(value)}
          min={years.data?.minYear ?? 2000}
          max={years.data?.maxYear ?? 2000}
        />
      </InputWithLabel>
      <Button icon={<AiOutlineDelete/>} text="Очистити" onClick={() => clear()}/>
    </div>
  );
};

export default FilterCard;
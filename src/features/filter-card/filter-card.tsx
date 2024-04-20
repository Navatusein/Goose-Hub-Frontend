import {ChangeEvent, CSSProperties, Dispatch, FC, SetStateAction} from "react";
import {Button, CheckboxTag, InputWithLabel, RangeSlider, Select} from "@/shared/ui-kit";
import styles from "./filter-card.module.scss"
import {AiOutlineDelete} from "react-icons/ai";
import {IQuery, StatusEnum} from "@/entities/common";

const sort = [
  {label: "За датою", value: "1"},
]

const genres = [
  { value: "екшн", label: "Екшн" },
  { value: "пригоди", label: "Пригоди" },
  { value: "комедія", label: "Комедія" },
  { value: "драма", label: "Драма" },
  { value: "фентезі", label: "Фентезі" },
  { value: "жахи", label: "Жахи" },
  { value: "трилер", label: "Трилер" },
  { value: "романтика", label: "Романтика" },
  { value: "наукова фантастика", label: "Наукова фантастика" },
  { value: "детектив", label: "Детектив" },
  { value: "історичний", label: "Історичний" },
  { value: "бойовик", label: "Бойовик" },
  { value: "фантастика", label: "Фантастика" },
  { value: "містика", label: "Містика" },
  { value: "документальний", label: "Документальний" }
];

interface IProps {
  query: IQuery;
  setQuery: Dispatch<SetStateAction<IQuery>>;
  styles?: CSSProperties;
  className?: string;
}

const FilterCard: FC<IProps> = (props) => {

  const toggleStatusValue = (event: ChangeEvent<HTMLInputElement>, value: StatusEnum) => {
    if (event.target.checked)
      props.setQuery({...props.query, status: props.query.status.filter(x => x == value)});
    else
      props.setQuery({...props.query, status: [...props.query.status, value]});
  };

  return (
    <div className={`${styles.filterCard} ${props.className ?? ""}`} style={props.styles}>
      <InputWithLabel label="Сортування">
        <Select placeholder="Сортування" options={sort}/>
      </InputWithLabel>
      <InputWithLabel label="Жанр">
        <Select placeholder="Жанр" isMulti isSearchable options={genres}/>
      </InputWithLabel>
      <InputWithLabel label="Статус">
        <div className={styles.horizontalContainer}>
          <CheckboxTag text="Aнонс" onChange={(e) => toggleStatusValue(e, StatusEnum.announcement)}/>
          <CheckboxTag text="Виходить" onChange={(e) => toggleStatusValue(e, StatusEnum.ongoing)}/>
          <CheckboxTag text="На паузі" onChange={(e) => toggleStatusValue(e, StatusEnum.paused)}/>
          <CheckboxTag text="Завершено" onChange={(e) => toggleStatusValue(e, StatusEnum.completed)}/>
        </div>
      </InputWithLabel>
      <InputWithLabel label="Тип">
        <div className={styles.horizontalContainer}>
          <CheckboxTag text="Спешл"/>
          <CheckboxTag text="Фільм"/>
          <CheckboxTag text="OVA"/>
          <CheckboxTag text="ONA"/>
          <CheckboxTag text="TV Серіал"/>
        </div>
      </InputWithLabel>
      <InputWithLabel label="Рік виходу">
        <RangeSlider min={1945} max={2024}/>
      </InputWithLabel>
      <Button icon={<AiOutlineDelete/>} text="Очистити"/>
    </div>
  );
};

export default FilterCard;
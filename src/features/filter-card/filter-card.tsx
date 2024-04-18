import {CSSProperties, FC} from "react";
import {Button, CheckboxTag, InputWithLabel, RangeSlider, Select} from "@/shared/ui-kit";
import styles from "./filter-card.module.scss"
import {AiOutlineDelete} from "react-icons/ai";

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
  styles?: CSSProperties;
  className?: string;
}

const FilterCard: FC<IProps> = (props) => {
  return (
    <div className={`${styles.filterCard} ${props.className ?? ""}`} style={props.styles}>
      <InputWithLabel label="Сортування">
        <Select placeholder="Сортування" values={sort}/>
      </InputWithLabel>
      <InputWithLabel label="Жанр">
        <Select placeholder="Жанр" isMulti isSearchable values={genres}/>
      </InputWithLabel>
      <InputWithLabel label="Статус">
        <div className={styles.horizontalContainer}>
          <CheckboxTag text="Aнонс"/>
          <CheckboxTag text="Виходить"/>
          <CheckboxTag text="На паузі"/>
          <CheckboxTag text="Завершено"/>
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
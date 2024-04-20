import {FC} from 'react';
import {
  Alert,
  Button, CardGrid,
  Checkbox,
  CheckboxTag,
  Divider,
  Input,
  InputWithLabel,
  Link,
  RangeSlider,
  RoundButton,
  Select,
  Switch,
  Tag,
  TextArea
} from "@/shared/ui-kit";
import {AiOutlineComment, AiOutlineDelete, AiOutlinePlayCircle, AiOutlineSearch} from "react-icons/ai";
import styles from "./developer-page.module.scss";
import ContentCard from "@/entities/common/ui/content-card/content-card.tsx";
import {ContentCarousel, ContentTypeEnum, DataTypeEnum, IPreview, StatusEnum} from "@/entities/common";
import FilterCard from "@/features/filter-card/filter-card.tsx";

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

const DeveloperPage: FC = () => {
  return (
    <div className={styles.verticalContainer}>

      <ContentCarousel contentList={[content, content, content, content]}/>

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

      <FilterCard styles={{width: 320}}/>

      <div className={styles.horizontalContainer}>
        <Button type="default" color="primary" text="Дивитися" icon={<AiOutlinePlayCircle/>}/>
        <Button type="default" color="accent" text="Дивитися" icon={<AiOutlinePlayCircle/>}/>
        <Button type="default" color="danger" text="Дивитися" icon={<AiOutlinePlayCircle/>}/>
        <Button type="outline" color="primary" text="Коментарі" icon={<AiOutlineComment/>}/>
        <Button type="outline" color="accent" text="Коментарі" icon={<AiOutlineComment/>}/>
        <Button type="outline" color="danger" text="Коментарі" icon={<AiOutlineComment/>}/>
      </div>

      <div className={styles.horizontalContainer}>
        <Button size="small" type="default" color="primary" text="Дивитися" icon={<AiOutlinePlayCircle/>}/>
        <Button size="small" type="default" color="accent" text="Дивитися" icon={<AiOutlinePlayCircle/>}/>
        <Button size="small" type="default" color="danger" text="Дивитися" icon={<AiOutlinePlayCircle/>}/>
        <Button size="small" type="outline" color="primary" text="Коментарі" icon={<AiOutlineComment/>}/>
        <Button size="small" type="outline" color="accent" text="Коментарі" icon={<AiOutlineComment/>}/>
        <Button size="small" type="outline" color="danger" text="Коментарі" icon={<AiOutlineComment/>}/>
      </div>

      <div className={styles.horizontalContainer}>
        <RoundButton color="primary" text="Видалити" icon={<AiOutlineDelete/>}/>
        <RoundButton color="accent" text="Видалити" icon={<AiOutlinePlayCircle/>}/>
        <RoundButton color="danger" text="Видалити" icon={<AiOutlineDelete/>}/>
      </div>

      <div className={styles.horizontalContainer}>
        <RoundButton color="primary" icon={<AiOutlineDelete/>}/>
        <RoundButton color="accent" icon={<AiOutlinePlayCircle/>}/>
        <RoundButton color="danger" icon={<AiOutlineDelete/>}/>
      </div>

      <RangeSlider min={1990} max={2024}/>

      <div className={styles.horizontalContainer} style={{alignItems: "center"}}>
        <CheckboxTag text="Check box"/>
        <Switch/>
        <Checkbox/>
      </div>

      <div className={styles.horizontalContainer}>
        <Tag color="primary">
          Tag: Text
        </Tag>
        <Tag color="accent">
          Tag: Text
        </Tag>
        <Tag color="danger">
          Tag: Text
        </Tag>
      </div>

      <div className={styles.horizontalContainer}>
        <Alert color="primary">
          Alert: Все нормально
        </Alert>
        <Alert color="accent">
          Alert: Попередження
        </Alert>
        <Alert color="danger">
          Alert: Помилка
        </Alert>
      </div>

      <div className={styles.horizontalContainer}>
        <Select placeholder="Select" values={genres} styles={{width: 250}}/>
        <Select placeholder="Select" values={genres} disabled styles={{width: 250}}/>
        <Select placeholder="Select" values={genres} error="Some error message" styles={{width: 250}}/>
      </div>

      <div className={styles.horizontalContainer}>
        <Select placeholder="Multi Select" isMulti values={genres} styles={{width: 250}}/>
        <Select placeholder="Select with Search" isSearchable values={genres} styles={{width: 250}}/>
        <Select placeholder="Creatable" isSearchable isCreatable values={genres} styles={{width: 250}}/>
      </div>


      <div className={styles.verticalContainer}>
        <TextArea text="Text"/>
        <TextArea text="Text" disabled/>
        <TextArea text="Text" error={"Some error message"}/>
      </div>

      <InputWithLabel label="Пошук">
        <Input placeholder="Text" icon={<AiOutlineSearch/>}/>
      </InputWithLabel>

      <InputWithLabel label="Пошук" type="inline">
        <Input placeholder="Text" icon={<AiOutlineSearch/>}/>
      </InputWithLabel>

      <div className={styles.horizontalContainer}>
        <Input placeholder="Text" icon={<AiOutlineSearch/>}/>
        <Input placeholder="Text" disabled icon={<AiOutlineSearch/>}/>
        <Input placeholder="Text" error="Some error message" icon={<AiOutlineSearch/>}/>
      </div>

      <div className={styles.horizontalContainer}>
        <Input placeholder="Text"/>
        <Input placeholder="Text" disabled/>
        <Input placeholder="Text" error="Some error message"/>
      </div>


      <Divider color="primary"/>
      <Divider color="secondary"/>

      <div className={styles.horizontalContainer}>
        <Link size="default" color="primary" text="Наші контакти" href="/"/>
        <Link size="default" color="accent" text="Наші контакти" href="/"/>
        <Link size="default" color="danger" text="Наші контакти" href="/"/>
      </div>

      <div className={styles.horizontalContainer}>
        <Link size="small" color="primary" text="Наші контакти" href="/"/>
        <Link size="small" color="accent" text="Наші контакти" href="/"/>
        <Link size="small" color="danger" text="Наші контакти" href="/"/>
      </div>

    </div>
  );
};

export default DeveloperPage;
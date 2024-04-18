import {FC} from 'react';
import {
  Button,
  RangeSlider,
  Divider,
  Input,
  InputWithLabel,
  TextArea,
  Link,
  Alert,
  RoundButton,
  CheckboxTag,
  Tag,
  Checkbox,
  Switch, Select
} from "@/shared/ui-kit";
import {AiOutlinePlayCircle, AiOutlineComment, AiOutlineDelete, AiOutlineSearch} from "react-icons/ai";
import styles from "./developer-page.module.scss";

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

const DeveloperPage: FC = () => {
  return (
    <div className={styles.verticalContainer}>

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
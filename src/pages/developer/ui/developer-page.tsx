import {FC} from 'react';
import {Button, RangeSlider, Input, InputWithLabel, TextArea, Link, Alert, RoundButton, CheckboxTag, Tag} from "@/shared/ui-kit";
import {AiOutlinePlayCircle, AiOutlineComment, AiOutlineDelete, AiOutlineSearch} from "react-icons/ai";
import styles from "./developer-page.module.scss";

const DeveloperPage: FC = () => {
  return (
    <div className={styles.flex_container}>
      <Button type="default" text="Дивитися" icon={<AiOutlinePlayCircle/>} styles={{margin: 10}}/>
      <Button type="outline" text="Коментарі" icon={<AiOutlineComment/>} styles={{margin: 10}} />
      <Button type="small" text="Видалити" icon={<AiOutlineDelete/>} styles={{margin: 10}} />

      <RoundButton text="Видалити" icon={<AiOutlineDelete/>} styles={{margin: 10}}/>

      <RangeSlider min={1990} max={2024} />
      <CheckboxTag text="Check box" styles={{margin: 10}}/>

      <div className={styles.flex_items}>
        <Tag text=" Tag: Text" color="primary" styles={{margin: 5}}/>
        <Tag text="Text" color="accent" styles={{margin: 5}}/>
        <Tag text="Text" color="danger" styles={{margin: 5}}/>
      </div>
      <div className={styles.flex_items}>
        <Alert text="Alert: Все нормально" color="primary" styles={{margin: 5}}/>
        <Alert text="Попередження" color="accent" styles={{margin: 5}}/>
        <Alert text="Помилка" color="danger" styles={{margin: 5}}/>
      </div>
          
      <TextArea styles={{margin: 10}}/>
      <InputWithLabel text="Text" label="Label" icon={<AiOutlineSearch/>} styles={{margin: 10}} />
      <Input text="Text" icon={<AiOutlineSearch/>} styles={{margin: 10}}/>
      <Link text="Наші контакти" href="/" styles={{margin: 10}}/>
    </div>
  );
};

export default DeveloperPage;
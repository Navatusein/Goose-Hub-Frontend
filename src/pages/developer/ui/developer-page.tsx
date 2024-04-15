import {FC} from 'react';
import {Button, RangeSlider, TextWithIcon, Line, Input, InputWithLabel, TextArea, Link, Alert, RoundButton, CheckboxTag, Tag} from "@/shared/ui-kit";
import {AiOutlinePlayCircle, AiOutlineStar, AiOutlineComment, AiOutlineDelete, AiOutlineSearch} from "react-icons/ai";
import styles from "./developer-page.module.scss";

const DeveloperPage: FC = () => {
  return (
    <div className={styles.flex_container}>

      <div className={styles.flex_items}>
        <Button type="default" text="Дивитися" icon={<AiOutlinePlayCircle/>} styles={{margin: 10}}/>
        <Button type="defaultAccent" text="Дивитися" icon={<AiOutlinePlayCircle/>} styles={{margin: 10}}/>
        <Button type="outline" text="Коментарі" icon={<AiOutlineComment/>} styles={{margin: 10}}/>
        <Button type="outlineAccent" text="Коментарі" icon={<AiOutlineComment/>} styles={{margin: 10}}/>
      </div>

      <Button type="small" text="Видалити" icon={<AiOutlineDelete/>} styles={{margin: 10}}/>

      <div>
        <RoundButton text="Видалити" icon={<AiOutlineDelete/>} styles={{margin: 10}}/>
        <RoundButton type="accent" icon={<AiOutlinePlayCircle/>} styles={{margin: 10}}/>
        <RoundButton type="danger" text="Видалити" icon={<AiOutlineDelete/>} styles={{margin: 10}}/>
      </div>

      <RangeSlider min={1990} max={2024} styles={{margin: 10}}/>

      <CheckboxTag text="Check box" styles={{margin: 10}}/>

      <div>
        <Tag text=" Tag: Text" color="primary" styles={{margin: 5}}/>
        <Tag text="Text" color="accent" styles={{margin: 5}}/>
        <Tag text="Text" color="danger" styles={{margin: 5}}/>
      </div>

      <div>
        <Alert text="Alert: Все нормально" color="primary" styles={{margin: 5}}/>
        <Alert text="Попередження" color="accent" styles={{margin: 5}}/>
        <Alert text="Помилка" color="danger" styles={{margin: 5}}/>
      </div>

      <div className={styles.flex_items}>
        <TextArea styles={{margin: 10}}/>
        <TextArea type="disabled" styles={{margin: 10}}/>
      </div>

      <InputWithLabel text="Text" label="Пошук" icon={<AiOutlineSearch/>} styles={{margin: 10}}/>
      <InputWithLabel type={"inline"} text="Text" label="Пошук" icon={<AiOutlineSearch/>} styles={{margin: 10}}/>
      <div>
        <Input text="Text" icon={<AiOutlineSearch/>} styles={{margin: 10}}/>
        <Input type={"disabled"} text="Text" icon={<AiOutlineSearch/>} styles={{margin: 10}}/>
        <Input type={"error"} text="Text" icon={<AiOutlineSearch/>} styles={{margin: 10}}/>
      </div>


      <Line styles={{margin: 10}}/>
      <Line type={"secondary"} styles={{margin: 10}}/>

      <TextWithIcon text={"Rate"} icon={<AiOutlineStar/>}></TextWithIcon>

      <div>
        <Link text="Наші контакти" href="/" styles={{margin: 10}}/>
        <Link type="small" text="Наші контакти" href="/" styles={{margin: 10}}/>
        <Link type="accent" text="Наші контакти" href="/" styles={{margin: 10}}/>
        <Link type="smallAccent" text="Наші контакти" href="/" styles={{margin: 10}}/>
      </div>

    </div>
  );
};

export default DeveloperPage;
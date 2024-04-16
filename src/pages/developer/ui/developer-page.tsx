import {FC} from 'react';
import {Button, RangeSlider, Divider, Input, InputWithLabel, TextArea, Link, Alert, RoundButton, CheckboxTag, Tag} from "@/shared/ui-kit";
import {AiOutlinePlayCircle, AiOutlineComment, AiOutlineDelete, AiOutlineSearch} from "react-icons/ai";
import styles from "./developer-page.module.scss";

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

      <CheckboxTag text="Check box"/>

      <div className={styles.horizontalContainer}>
        <Tag text="Tag: Text" color="primary"/>
        <Tag text="Text" color="accent"/>
        <Tag text="Text" color="danger"/>
      </div>

      <div className={styles.horizontalContainer}>
        <Alert text="Alert: Все нормально" color="primary"/>
        <Alert text="Попередження" color="accent"/>
        <Alert text="Помилка" color="danger"/>
      </div>

      <div className={styles.verticalContainer}>
        <TextArea text="Text"/>
        <TextArea text="Text" disabled/>
        <TextArea text="Text" error={"Some error message"}/>
      </div>

      <InputWithLabel label="Пошук">
        <Input text="Text" icon={<AiOutlineSearch/>}/>
      </InputWithLabel>

      <InputWithLabel label="Пошук" type="inline">
        <Input text="Text" icon={<AiOutlineSearch/>}/>
      </InputWithLabel>

      <div className={styles.horizontalContainer}>
        <Input text="Text" icon={<AiOutlineSearch/>}/>
        <Input text="Text" disabled icon={<AiOutlineSearch/>}/>
        <Input text="Text" error={"Some error message"} icon={<AiOutlineSearch/>}/>
      </div>

      <div className={styles.horizontalContainer}>
        <Input text="Text"/>
        <Input text="Text" disabled/>
        <Input text="Text" error={"Some error message"}/>
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
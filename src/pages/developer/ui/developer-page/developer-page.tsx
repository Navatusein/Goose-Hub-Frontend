import {FC} from 'react';
import {
  Alert,
  Button,
  Checkbox,
  CheckboxTag,
  Divider,
  Link,
  RoundButton,
  Switch,
  Tag,
  TextArea
} from "@/shared/ui-kit";
import {AiOutlineComment, AiOutlineDelete, AiOutlinePlayCircle} from "react-icons/ai";
import {SignUp} from "@/features/sign-up";
import {SignIn} from "@/features/sign-in";
import styles from "./developer-page.module.scss";


const DeveloperPage: FC = () => {
  return (
    <div className={styles.verticalContainer}>

      <div className={styles.verticalContainer}>
        <SignUp/>
        <SignIn/>
      </div>

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


      <div className={styles.verticalContainer}>
        <TextArea text="Text"/>
        <TextArea text="Text" disabled/>
        <TextArea text="Text" error={"Some error message"}/>
      </div>


      <Divider color="primary"/>
      <Divider color="secondary"/>

      <div className={styles.horizontalContainer}>
        <Link size="default" color="primary" text="Наші контакти" to="/"/>
        <Link size="default" color="accent" text="Наші контакти" to="/"/>
        <Link size="default" color="danger" text="Наші контакти" to="/"/>
      </div>

      <div className={styles.horizontalContainer}>
        <Link size="small" color="primary" text="Наші контакти" to="/"/>
        <Link size="small" color="accent" text="Наші контакти" to="/"/>
        <Link size="small" color="danger" text="Наші контакти" to="/"/>
      </div>

    </div>
  );
};

export default DeveloperPage;
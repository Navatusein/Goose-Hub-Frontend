import {ChangeEvent, CSSProperties, FC} from "react";
import {InputWithLabel, Input, Link, Button, FlexContainer} from "@/shared/ui-kit";
import styles from "./sign-in.module.scss";

interface IProps {
  className?: string;
  style?: CSSProperties;
}

const SignIn: FC<IProps> = (props) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log("New value", event.target.value);
  };

  return (
    <div
      className={`${styles.signIn} ${props.className ?? ""}`}
      style={props.style}
    >
      <FlexContainer gap={10} justify="start" align="center" vertical>
        <h1>Вхід</h1>
        <p className={styles.small} >Вітаємо Вас на нашому сайті!</p>
      </FlexContainer>

      <FlexContainer gap={10} justify="start" align="center" vertical>
        <InputWithLabel label="Пошта" >
          <Input placeholder="Пошта"  value="" onChange={handleChange}/>
        </InputWithLabel>
        <InputWithLabel label="Пароль" styles={{width: "100%"}}>
          <Input placeholder="Пароль" styles={{width: "100%"}} value="" onChange={handleChange}/>
        </InputWithLabel>
      </FlexContainer>

      <Button color="accent" text="Вхід"/>

      <FlexContainer className={styles.name} align="center" gap={10} justify="center" warp>
        <p>Ще не зареєстровані?</p>
        <Link text="Реєстрація" size="small" color="accent" to="#"/>
      </FlexContainer>
    </div>
  );
}

export default SignIn;
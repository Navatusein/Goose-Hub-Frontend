import {ChangeEvent, CSSProperties, FC} from "react";
import styles from "./sign-up.module.scss";
import {InputWithLabel, Input, Checkbox, Link, Button, FlexContainer} from "@/shared/ui-kit";

interface IProps {
  className?: string;
  style?: CSSProperties;
}

const SignUp: FC<IProps> = (props) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log("New value", event.target.value);
  };
  return (
    <div
      className={`${styles.signUp} ${props.className ?? ""}`}
      style={props.style}
    >
      <FlexContainer gap={10} justify="start" align="center" vertical>
        <h1>Реєстрація</h1>
        <p className={styles.small}>Вітаємо Вас на нашому сайті!</p>
      </FlexContainer>

      <FlexContainer gap={10} justify="start" align="center" vertical>
        <InputWithLabel label="Пошта">
          <Input placeholder="Пошта" value="" onChange={handleChange}/>
        </InputWithLabel>
        <InputWithLabel label="Нікнейм">
          <Input placeholder="Нікнейм" value="" onChange={handleChange}/>
        </InputWithLabel>
        <InputWithLabel label="Пароль">
          <Input placeholder="Пароль" value="" onChange={handleChange}/>
        </InputWithLabel>
        <InputWithLabel label="Повторіть пароль">
          <Input placeholder="Повторіть пароль" value="" onChange={handleChange}/>
        </InputWithLabel>
      </FlexContainer>

      <FlexContainer align="center" gap={10} warp>
        <Checkbox/>
        <p>Погоджуюся з</p>
        <Link text="Правилами користування" size="small" color="accent" to="#"/>
      </FlexContainer>

      <Button color="accent" text="Зареєструватися"/>

      <FlexContainer className={styles.name} align="center" gap={10} justify="center" warp>
        <p>Вже зареєстровані?</p>
        <Link text="Увійти" size="small" color="accent" to="#"/>
      </FlexContainer>
    </div>
  );
}

export default SignUp;
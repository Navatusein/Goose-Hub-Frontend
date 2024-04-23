import {ChangeEvent, CSSProperties, FC, useState} from "react";
import styles from "./sign-up.module.scss";
import {InputWithLabel, Input, Checkbox, Link, Button, FlexContainer, Paragraph} from "@/shared/ui-kit";
import {IRegisterData, userApi} from "@/entities/user";

interface IProps {
  className?: string;
  style?: CSSProperties;
}

interface IError {
  email: string | undefined;
  repeatPassword: string | undefined;
  name: string | undefined;
}

const SignUp: FC<IProps> = (props) => {
  const [registerData, setRegisterData] = useState<IRegisterData>({email: "", password: "", name: ""});
  const [error, setError] = useState<IError>(
    {email: undefined, name: undefined, repeatPassword: undefined}
  );

  const [repeatPassword, setRepeatPassword] = useState("");

  const [registerUser] = userApi.useRegisterUserMutation();

  const comparePasswords = (e:  ChangeEvent<HTMLInputElement>) => {
    setRepeatPassword(e.target.value);
    if(registerData.password !== e.target.value){
      setError({...error, repeatPassword: "Паролі не співпадають"})
    }
    else if (registerData.password === e.target.value) {
      setError({...error, repeatPassword: undefined})
    }
  }

  const register = async () => {
    await registerUser(registerData);
  }

  return (
    <div
      className={`${styles.signUp} ${props.className ?? ""}`}
      style={props.style}
    >
      <FlexContainer gap={10} justify="start" align="center" vertical>
        <h3>Реєстрація</h3>
        <Paragraph color="secondary">Вітаємо Вас на нашому сайті!</Paragraph>
      </FlexContainer>

      <FlexContainer gap={10} justify="start" align="center" vertical>
        <InputWithLabel label="Пошта">
          <Input
            placeholder="Пошта"
            value={registerData.email}
            error={error.email}
            onChange={(e) => {setRegisterData({...registerData, email: e.target.value})}}/>
        </InputWithLabel>
        <InputWithLabel label="Нікнейм">
          <Input
            placeholder="Нікнейм"
            value={registerData.name}
            error={error.name}
            onChange={(e) => {setRegisterData({...registerData, name: e.target.value})}}/>
        </InputWithLabel>
        <InputWithLabel label="Пароль">
          <Input
            type="password"
            placeholder="Пароль"
            value={registerData.password}
            onChange={(e) => {setRegisterData({...registerData, password: e.target.value})}}/>
        </InputWithLabel>
        <InputWithLabel label="Повторіть пароль">
          <Input
            type="password"
            placeholder="Повторіть пароль"
            value={repeatPassword}
            onChange={(e) => {comparePasswords(e)}}
            error={error.repeatPassword}
          />
        </InputWithLabel>
      </FlexContainer>

      <FlexContainer align="center" gap={10} warp>
        <Checkbox/>
        <Paragraph fontSize="medium">Погоджуюся з</Paragraph>
        <Link text="Правилами користування" size="small" color="accent" to="#"/>
      </FlexContainer>

      <Button color="accent" text="Зареєструватися" onClick={() => register()} />

      <FlexContainer className={styles.name} align="center" gap={10} justify="center" warp>
        <Paragraph>Вже зареєстровані?</Paragraph>
        <Link text="Увійти" size="small" color="accent" to="/login"/>
      </FlexContainer>
    </div>
  );
}

export default SignUp;
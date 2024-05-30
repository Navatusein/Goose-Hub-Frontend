import {CSSProperties, FC, useState} from "react";
import styles from "./sign-up.module.scss";
import {InputWithLabel, Input, Checkbox, Link, Button, FlexContainer, Paragraph} from "@/shared/ui-kit";
import {IRegisterData, IUser, userApi} from "@/entities/user";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {IError} from "@/entities/error";
import {SerializedError} from "@reduxjs/toolkit";
import {useNavigate} from "react-router-dom";

interface IProps {
  className?: string;
  style?: CSSProperties;
}

interface IFormData extends IRegisterData {
  repeatPassword: string;
}

interface IFormError {
  email: string | undefined;
  repeatPassword: string | undefined;
  password: string | undefined;
  name: string | undefined;
}

const defaultFormData: IFormData = {
  email: "",
  password: "",
  repeatPassword: "",
  name: ""
}

const defaultFormError: IFormError = {
  email: undefined,
  repeatPassword: undefined,
  password: undefined,
  name: undefined
}

const SignUp: FC<IProps> = (props) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<IFormData>(defaultFormData);
  const [error, setError] = useState<IFormError>(defaultFormError);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const [registerUser] = userApi.useRegisterUserMutation();

  const register = async () => {
    setError(() => {
      return {...defaultFormError}
    });

    const emailRegular = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!emailRegular.test(formData.email)) {
      setError((prevState) => {
        return {...prevState, email: "Невірна почта"}
      });
      return;
    }

    let errorPasswordMessage = "";
    if (formData.password.length < 6) {
      errorPasswordMessage += "Мінімальна довжина 6 символів\n";
    }

    if (!/[A-Za-z]/.test(formData.password)) {
      errorPasswordMessage += "Має містити букви\n";
    }

    if (!/\d/.test(formData.password)) {
      errorPasswordMessage += "Має містити цифри\n";
    }

    if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(formData.password)) {
      errorPasswordMessage += "Має містити спеціальні символи\n";
    }

    if (errorPasswordMessage.length > 0) {
      setError((prevState) => {
        return {...prevState, password: errorPasswordMessage}
      });
      return;
    }

    if (formData.password !== formData.repeatPassword) {
      setError((prevState) => {
        return {...prevState, repeatPassword: "Паролі не співпадають"}
      });
      return;
    }

    const registerData: IRegisterData = {
      email: formData.email,
      name: formData.name,
      password: formData.password
    }
    //TODO Fix this type shit
    const result: {data?: IUser, error?: FetchBaseQueryError | SerializedError} = await registerUser(registerData);

    if ((result.error as FetchBaseQueryError)?.data !== undefined) {
      console.log((result.error as FetchBaseQueryError).data);
      setError((prevState) => {
        return {...prevState, email: ((result.error as FetchBaseQueryError).data as IError)?.message}
      });
      return;
    }

    navigate("/content");
  }

  return (
    <div
      className={`${styles.signUp} ${props.className ?? ""}`}
      style={props.style}
    >
      <FlexContainer gap={10} justify="start" align="center" vertical>
        <h2>Реєстрація</h2>
        <Paragraph color="secondary">Вітаємо Вас на нашому сайті!</Paragraph>
      </FlexContainer>

      <FlexContainer gap={10} justify="start" align="center" vertical>
        <InputWithLabel label="Пошта">
          <Input
            placeholder="Пошта"
            value={formData.email}
            error={error.email}
            name="email"
            onChange={(e) => {
              setFormData({...formData, email: e.target.value, });
              setError({...error, email: undefined});
            }}/>
        </InputWithLabel>
        <InputWithLabel label="Нікнейм">
          <Input
            placeholder="Нікнейм"
            value={formData.name}
            error={error.name}
            name="nickname"
            onChange={(e) => {setFormData({...formData, name: e.target.value})}}/>
        </InputWithLabel>
        <InputWithLabel label="Пароль">
          <Input
            type="password"
            placeholder="Пароль"
            value={formData.password}
            error={error.password}
            onChange={(e) => {setFormData({...formData, password: e.target.value})}}/>
        </InputWithLabel>
        <InputWithLabel label="Повторіть пароль">
          <Input
            type="password"
            placeholder="Повторіть пароль"
            value={formData.repeatPassword}
            onChange={(e) => {setFormData({...formData, repeatPassword: e.target.value})}}
            error={error.repeatPassword}
          />
        </InputWithLabel>
      </FlexContainer>

      <FlexContainer align="center" gap={10} warp>
        <Checkbox onChange={(e) => {setIsChecked(e.target.checked)}} />
        <Paragraph fontSize="medium">Погоджуюся з</Paragraph>
        <Link text="Правилами користування" size="small" color="accent" to="/privacy-policy"/>
      </FlexContainer>

      <Button color="accent" disabled={!isChecked} text="Зареєструватися" onClick={() => register()} />

      <FlexContainer className={styles.name} align="center" gap={10} justify="center" warp>
        <Paragraph>Вже зареєстровані?</Paragraph>
        <Link text="Увійти" size="small" color="accent" to="/login"/>
      </FlexContainer>
    </div>
  );
}

export default SignUp;
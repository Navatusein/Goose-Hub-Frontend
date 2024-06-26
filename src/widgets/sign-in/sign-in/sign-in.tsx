import {CSSProperties, FC, useState} from "react";
import {InputWithLabel, Input, Link, Button, FlexContainer, Paragraph} from "@/shared/ui-kit";
import styles from "./sign-in.module.scss";
import {ILoginData, IUser, userApi} from "@/entities/user";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {SerializedError} from "@reduxjs/toolkit";
import {IError} from "@/entities/error";
import {useNavigate} from "react-router-dom";

interface IProps {
  className?: string;
  style?: CSSProperties;
}

const SignIn: FC<IProps> = (props) => {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState<ILoginData>({email: "", password: ""});
  const [error, setError] = useState<string | undefined>(undefined);

  const [loginUser] = userApi.useLoginUserMutation();

  const login = async () => {
    //TODO Fix this type shit
    const result: {data?: IUser, error?: FetchBaseQueryError | SerializedError} = await loginUser(loginData);

    if ((result.error as FetchBaseQueryError)?.data !== undefined) {
      setError(((result.error as FetchBaseQueryError).data as IError)?.message ?? undefined);
      return;
    }

    setError(undefined);
    navigate("/content");
  }

  return (
    <div
      className={`${styles.signIn} ${props.className ?? ""}`}
      style={props.style}
    >
      <FlexContainer gap={10} justify="start" align="center" vertical>
        <h2>Вхід</h2>
        <Paragraph color="secondary">Вітаємо Вас на нашому сайті!</Paragraph>
      </FlexContainer>

      <FlexContainer gap={10} justify="start" align="center" vertical>
        <InputWithLabel label="Пошта" >
          <Input
            placeholder="Пошта"
            name="email"
            value={loginData.email}
            onChange={(e) => {setLoginData({...loginData, email: e.target.value})}}
            error={error}
          />
        </InputWithLabel>
        <InputWithLabel label="Пароль">
          <Input
            placeholder="Пароль"
            name="password"
            type="password"
            value={loginData.password}
            onChange={(e) => {setLoginData({...loginData, password: e.target.value})}}
            error={error}
          />
        </InputWithLabel>
      </FlexContainer>

      <Button color="accent" text="Вхід" onClick={() => login()}/>

      <FlexContainer className={styles.name} align="center" gap={10} justify="center" warp>
        <Paragraph>Ще не зареєстровані?</Paragraph>
        <Link text="Реєстрація" size="small" color="accent" to="/register"/>
      </FlexContainer>
    </div>
  );
}

export default SignIn;
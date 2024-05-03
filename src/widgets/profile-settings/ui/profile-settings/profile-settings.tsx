import {FC, useState} from 'react';
import {FlexContainer} from "@/shared/ui-kit";
import styles from "./profile-settings.module.scss";
import {InputWithLabel, Input, ProfileSettingsFormHeader} from "@/shared/ui-kit";
import {AiOutlineUser, AiOutlineSetting} from "react-icons/ai";
import {useAppSelector} from "@/shared/hooks/use-app-selector.ts";
import {IUserProfile, userProfileApi} from "@/entities/user-profile";
import {IUpdateUser, userApi} from "@/entities/user";


interface IPersonalData {
  active?: boolean;
  nickname?: string | undefined;
  dateOfBirth?: string | undefined;
}

interface ISecurity {
  active?: boolean;
  oldPassword: string | undefined;
  newPassword?: string | undefined;
  repeatPassword?: string | undefined;
  email?: string | undefined;
}

interface IFormError {
  email: string | undefined;
  repeatPassword: string | undefined;
  newPassword: string | undefined;
  oldPassword: string | undefined;
}

const defaultPersonalData: IPersonalData = {
  nickname: undefined, 
  dateOfBirth: undefined,
  active: false
}

const defaultSecurity: ISecurity = {
  active: false,
  oldPassword: undefined,
  newPassword: undefined,
  repeatPassword: undefined,
  email: undefined
}

const defaultFormError: IFormError = {
  email: undefined,
  repeatPassword: undefined,
  newPassword: undefined,
  oldPassword: undefined
}

const ProfileSettings:FC = () => {
  const {user} = useAppSelector(state => state.user);

  const userProfile = userProfileApi.useFetchQuery(user?.userId ?? "", {skip: user === undefined});

  const [error, setError] = useState<IFormError>(defaultFormError);
  const [personalData, setPersonalData] = useState<IPersonalData>(defaultPersonalData);
  const [securityData, setSecurityData] = useState<ISecurity>(defaultSecurity);

  const [updateProfile] = userProfileApi.useUpdateMutation();
  const [updateUser] = userApi.useUpdateUserMutation();

  const savePersonalData = () => {
    let newUser: IUserProfile = {...userProfile.data!};

    if (personalData.nickname !== undefined)
      newUser = {...newUser, name: personalData.nickname};

    if (personalData.dateOfBirth !== undefined)
      newUser = {...newUser, birthday: personalData.dateOfBirth}

    if (newUser !== userProfile.data)
      updateProfile(newUser);

    return;
  }

  const saveSecurityData = () => {
    setError(() => {
      return {...defaultFormError}
    });

    if (securityData.oldPassword === undefined){
      setError((prevState) => {
        return {...prevState, oldPassword: "Повинен містити пароль"}
      });
      return;
    }
    const updateData: IUpdateUser = {
      email: userProfile.data!.email,
      oldPassword: securityData.oldPassword
    };

    let errorPasswordMessage = "";
    if (securityData.newPassword!.length < 6) {
      errorPasswordMessage += "Мінімальна довжина 6 символів\n";
    }

    if (!/[A-Za-z]/.test(securityData.newPassword!)) {
      errorPasswordMessage += "Має містити букви\n";
    }

    if (!/\d/.test(securityData.newPassword!)) {
      errorPasswordMessage += "Має містити цифри\n";
    }

    if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(securityData.newPassword!)) {
      errorPasswordMessage += "Має містити спеціальні символи\n";
    }

    if (errorPasswordMessage.length > 0) {
      setError((prevState) => {
        return {...prevState, newPassword: errorPasswordMessage}
      });
      return;
    }
    if (securityData.newPassword !== securityData.repeatPassword) {
      setError((prevState) => {
        return {...prevState, repeatPassword: "Паролі не співпадають"}
      });
      return;
    }
    updateData.newPassword = securityData.newPassword;

    if (securityData.email !== undefined) {
      const emailRegular = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      if (!emailRegular.test(securityData.email)) {
        setError((prevState) => {
          return {...prevState, email: "Невірна почта"}
        });
        return;
      }
      updateData.email = securityData.email;
    }

    updateUser(updateData)

    updateProfile({...userProfile.data!, email: securityData.email!});

  }

  return (
    <>
      <FlexContainer className={`${styles.sector} ${styles.fullWidth}`} justify="start"  gap={10} vertical>
        <ProfileSettingsFormHeader OnClick={savePersonalData} icon={<AiOutlineUser/>} name="Особисті дані"
          onActive={() => {setPersonalData({...defaultPersonalData, active: !personalData.active})}}/>
        <FlexContainer className={styles.inputs} justify="start" align="start" gap={10}>
          <InputWithLabel className={styles.inputSize} label="Нікнейм">
            <Input value={personalData.active ? personalData.nickname! : userProfile.data?.name}
                   placeholder="Нікнейм" disabled={!personalData.active}
                   onChange={(e) => {setPersonalData({...personalData, nickname: e.target.value})}} />
          </InputWithLabel>
          <InputWithLabel className={styles.inputSize} label="Дата народження">
            <Input value={personalData.active ? personalData.dateOfBirth! : userProfile.data?.birthday ?? ""}
                   disabled={!personalData.active} placeholder="Дата народження"
                   onChange={(e) => {setPersonalData({...personalData, dateOfBirth: e.target.value})}} />
          </InputWithLabel>
        </FlexContainer>
      </FlexContainer>

      <FlexContainer className={`${styles.sector} ${styles.fullWidth}`} justify="start"  gap={10} vertical>
        <ProfileSettingsFormHeader OnClick={saveSecurityData} icon={<AiOutlineSetting/>} name="Безпека"
          onActive={() => {setSecurityData({...defaultSecurity, active: !securityData.active})}}/>
        <FlexContainer className={styles.inputs} justify="start" align="start" gap={10}>
          <InputWithLabel className={styles.inputSize} label="Пароль">
            <Input value={securityData.active ? securityData.oldPassword! : ""}
                   placeholder="Пароль" disabled={!securityData.active} type="password" error={error.oldPassword}
                   onChange={(e) => {setSecurityData({...securityData, oldPassword: e.target.value})}} />
          </InputWithLabel>
          <InputWithLabel className={styles.inputSize} label="Новий пароль">
            <Input value={securityData.active ? securityData.newPassword! : ""}
                   placeholder="Новий пароль" disabled={!securityData.active} type="password" error={error.newPassword}
                   onChange={(e) => {setSecurityData({...securityData, newPassword: e.target.value})}} />
          </InputWithLabel>
          <InputWithLabel className={styles.inputSize} label="Повторіть пароль">
            <Input  value={securityData.active ? securityData.repeatPassword! : ""}
                   placeholder="Повторіть пароль" disabled={!securityData.active} type="password" error={error.repeatPassword}
                   onChange={(e) => {setSecurityData({...securityData, repeatPassword: e.target.value})}} />
          </InputWithLabel>
        </FlexContainer>
        <FlexContainer justify="start" align="center" gap={10}>
          <InputWithLabel label="Пошта">
            <Input className={styles.inputSize} error={error.email} placeholder="Пошта" disabled={!securityData.active}
                   value={securityData.active ? securityData.email : userProfile.data?.email}
                   onChange={(e) => {setSecurityData({...securityData, email: e.target.value})}} />
          </InputWithLabel>
        </FlexContainer>
      </FlexContainer>
    </>
  );
};

export default ProfileSettings;
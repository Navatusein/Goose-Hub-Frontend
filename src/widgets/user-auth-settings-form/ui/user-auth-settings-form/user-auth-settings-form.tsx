import {CSSProperties, FC, useEffect, useState} from "react";
import {useAppSelector} from "@/shared/hooks/use-app-selector.ts";
import {userProfileApi} from "@/entities/user-profile";
import {IUpdateUser, userApi} from "@/entities/user";
import {SettingsForm} from "@/features/settings-form";
import {AiOutlineSetting} from "react-icons/ai";
import {Input, InputWithLabel} from "@/shared/ui-kit";
import {passwordValidator} from "@/shared/helpers/password-validator.ts";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {IError} from "@/entities/error";
import {SerializedError} from "@reduxjs/toolkit";
// import styles from "./user-auth-settings-form.module.scss";

interface IProps {
  styles?: CSSProperties;
  className?: string;
}

interface IFormError {
  email?: string;
  oldPassword?: string;
  newPassword?: string;
  repeatPassword?: string;
}

interface IFormData extends IUpdateUser {
  repeatPassword: string;
}

const defaultFormError: IFormError = {
  email: undefined,
  repeatPassword: undefined,
  newPassword: undefined,
  oldPassword: undefined,
}

const UserAuthSettingsForm: FC<IProps> = (props) => {
  const {user} = useAppSelector(state => state.user);
  const userProfile = userProfileApi.useFetchUserProfileByIdQuery(user?.userId ?? "", {skip: user === undefined});

  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState<IFormData>({email: "", oldPassword: "", newPassword: "", repeatPassword: ""});
  const [error, setError] = useState<IFormError>(defaultFormError);

  const [updateProfile] = userProfileApi.useUpdateUserProfileMutation();
  const [updateUser] = userApi.useUpdateUserMutation();

  useEffect(() => {
    if (userProfile.data == undefined)
      return;

    setFormData({email: userProfile.data.email, oldPassword: "", newPassword: "", repeatPassword: ""});
  }, [userProfile.data]);

  const onSave = async () => {
    setError(() => {
      return {...defaultFormError}
    });

    const emailRegular = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!emailRegular.test(formData.email)){
      setError({email: "Некоректна пошта"});
      return;
    }

    if (formData.oldPassword.trim().length == 0){
      setError({oldPassword: "Повинен містити пароль"});
      return;
    }

    if (formData.newPassword?.trim().length !== 0){
      const {error, valid} = passwordValidator(formData.newPassword!);

      if (valid){
        setError({newPassword: error});
        return;
      }

      if (formData.newPassword !== formData.repeatPassword) {
        setError({repeatPassword: "Паролі не співпадають"});
        return;
      }
    }

    //TODO Fix this type shit
    const result: {data?: void, error?: FetchBaseQueryError | SerializedError} = await updateUser(formData);

    if ((result.error as FetchBaseQueryError)?.data !== undefined) {
      const message = ((result.error as FetchBaseQueryError).data as IError)?.message ?? undefined;

      switch (message) {
        case "Invalid old password":
          setError({oldPassword: "Не правильный пароль"});
          return;
        case "Email is already taken":
          setError({email: "Пошта вже занята"});
          return
        default:
          setError({email: message});
          return;
      }
    }

    updateProfile({...userProfile.data!, email: formData.email});
    setIsEdit(false);
  }

  const onCancel = () => {
    setFormData({email: userProfile.data!.email, oldPassword: "", newPassword: "", repeatPassword: ""});
    setIsEdit(false);
  }

  return (
    <SettingsForm
      name="Безпека"
      icon={<AiOutlineSetting/>}
      isEdit={isEdit}
      setIsEdit={setIsEdit}
      onCancel={onCancel}
      onSave={onSave}
      className={props.className}
      styles={props.styles}
    >
      <>
        <InputWithLabel label="Пароль">
          <Input
            value={formData.oldPassword}
            placeholder="Пароль"
            name="old-password"
            type="password"
            disabled={!isEdit}
            error={error.oldPassword}
            onChange={(e) => {setFormData({...formData, oldPassword: e.target.value})}}
          />
        </InputWithLabel>
        <InputWithLabel label="Новий пароль">
          <Input
            value={formData.newPassword}
            placeholder="Новий пароль"
            name="new-password"
            type="password"
            disabled={!isEdit}
            error={error.newPassword}
            onChange={(e) => {setFormData({...formData, newPassword: e.target.value})}}
          />
        </InputWithLabel>
        <InputWithLabel label="Повторіть пароль">
          <Input
            value={formData.repeatPassword}
            placeholder="Повторіть пароль"
            name="repeat-password"
            type="password"
            disabled={!isEdit}
            error={error.repeatPassword}
            onChange={(e) => {setFormData({...formData, repeatPassword: e.target.value})}}
          />
        </InputWithLabel>
        <InputWithLabel label="Пошта">
          <Input
            value={formData.email}
            placeholder="Пошта"
            name="email"
            disabled={!isEdit}
            error={error.email}
            onChange={(e) => {setFormData({...formData, email: e.target.value})}}
          />
        </InputWithLabel>
      </>
    </SettingsForm>
  );
};

export default UserAuthSettingsForm;
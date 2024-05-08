import {CSSProperties, FC, useEffect, useState} from "react";
// import styles from "./user-profile-settings-form.module.scss";
import {SettingsForm} from "@/features/settings-form";
import {useAppSelector} from "@/shared/hooks/use-app-selector.ts";
import {IUserProfile, userProfileApi} from "@/entities/user-profile";
import {AiOutlineUser} from "react-icons/ai";
import {Input, InputWithLabel} from "@/shared/ui-kit";


interface IProps {
  styles?: CSSProperties;
  className?: string;
}

interface IFormError {
  nickname?: string;
  birthday?: string;
}

const UserProfileSettingsForm: FC<IProps> = (props) => {
  const {user} = useAppSelector(state => state.user);
  const userProfile = userProfileApi.useFetchUserProfileByIdQuery(user?.userId ?? "", {skip: user === undefined});

  const [updateProfile] = userProfileApi.useUpdateUserProfileMutation();

  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState<IUserProfile>({...userProfile.data!});
  const [error, setError] = useState<IFormError>({nickname: undefined, birthday: undefined});

  useEffect(() => {
    setFormData({...userProfile.data!})
  }, [userProfile.data]);

  const onSave = () => {
    setError({nickname: undefined, birthday: undefined});

    if (formData.name.trim().length < 1) {
      setError({nickname: "Довжина нікнейму коротка"});
      return;
    }

    if (formData.birthday?.trim().length === 0 ) {
      setError({birthday: "Неправильна дата"});
      return;
    }

    updateProfile(formData);
    setIsEdit(false);
  }

  const onCancel = () => {
    setFormData(userProfile.data!);
    setIsEdit(false);
  }

  return (
    <SettingsForm
      name="Особисті дані"
      icon={<AiOutlineUser/>}
      isEdit={isEdit}
      setIsEdit={setIsEdit}
      onCancel={onCancel}
      onSave={onSave}
      className={props.className}
      styles={props.styles}
    >
      <>
        <InputWithLabel label="Нікнейм">
          <Input
            value={formData.name ?? ""}
            placeholder="Нікнейм"
            disabled={!isEdit}
            error={error.nickname}
            onChange={(e) => {setFormData({...formData, name: e.target.value})}}
          />
        </InputWithLabel>
        <InputWithLabel label="Дата народження">
          <Input
            value={formData.birthday ?? ""}
            placeholder="Дата народження"
            type="date"
            disabled={!isEdit}
            error={error.birthday}
            onChange={(e) => {setFormData({...formData, birthday: e.target.value})}}
          />
        </InputWithLabel>
      </>
    </SettingsForm>
  );
};

export default UserProfileSettingsForm;
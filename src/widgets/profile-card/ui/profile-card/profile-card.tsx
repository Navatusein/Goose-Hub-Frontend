import {FC} from 'react';
import styles from "./profile-card.module.scss";
import {FlexContainer, Button, Divider, RoundButton, FileUpload} from "@/shared/ui-kit";
import {useAppDispatch, useAppSelector} from "@/shared/hooks/use-app-selector.ts";
import {UserAvatar, userProfileApi} from "@/entities/user-profile";
import {
  AiOutlineSave,
  AiOutlineHistory,
  AiOutlineComment,
  AiOutlineSetting,
  AiOutlineLogout,
  AiOutlineCloudUpload, AiOutlineDelete
} from "react-icons/ai";
import {useLocation, useNavigate} from "react-router-dom";
import {logout} from "@/entities/user/model/user-slice.ts";

interface IProps {
  isEdit: boolean;
}

const ProfileCard:FC<IProps> = (props) => {
  const {user} = useAppSelector(state => state.user);

  const userProfile = userProfileApi.useFetchUserProfileByIdQuery(user?.userId ?? "", {skip: user === undefined});

  const [uploadAvatar] = userProfileApi.useUploadAvatarMutation();
  const [deleteAvatar] = userProfileApi.useDeleteAvatarMutation();

  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const onDelete = () => {
    if (!window.confirm("Видалити"))
      return;

    deleteAvatar();
  }

  const onUpload = (files: FileList | null) => {
    if (files == undefined)
      return;

    const formData = new FormData();
    formData.append("file", files[0]);

    uploadAvatar(formData);
  }

  return (
    <FlexContainer className={styles.container} gap={20} align="center" vertical>
      {userProfile.data !== undefined && (
        <FlexContainer align="center" vertical>
          {props.isEdit && (
            <FlexContainer className={styles.avatarContainer}>
              {userProfile.data.avatarPath != undefined && (
                <>
                  <UserAvatar size="medium" userProfile={userProfile!.data}/>
                  <RoundButton icon={<AiOutlineDelete/>} color="danger" className={styles.deleteButton} onClick={onDelete}/>
                </>
              )}
              {userProfile.data.avatarPath == undefined && (
                <label className={styles.uploadButton}>
                  <AiOutlineCloudUpload/>
                  <FileUpload onChange={e => onUpload(e.target.files)}/>
                </label>
              )}
            </FlexContainer>
          )}
          {!props.isEdit && (
            <UserAvatar size="medium" userProfile={userProfile!.data}/>
          )}
          <h2>{userProfile.data?.name}</h2>
        </FlexContainer>
      )}
      <FlexContainer className={styles.menu} align="start" vertical>
        <Button
          color={location.pathname.includes("/profile/wish-list") ? "accent" : "primary"}
          onClick={() => navigate("/profile/wish-list")}
          type="outline" text="Списки" icon={<AiOutlineSave />}/>
        <Divider />
        <Button
          color={location.pathname === "/profile/history" ? "accent" : "primary"}
          onClick={() => navigate("/profile/history")}
          type="outline" text="Історія перегляду" icon={<AiOutlineHistory />}/>
        <Divider />
        <Button
          color={location.pathname === "/profile/comments" ? "accent" : "primary"}
          onClick={() => navigate("/profile/comments")}
          type="outline" text="Ваші коментарі"  icon={<AiOutlineComment />}/>
        <Divider />
        <Button
          color={location.pathname === "/profile/settings" ? "accent" : "primary"}
          onClick={() => navigate("/profile/settings")}
          type="outline" text="Налаштування"  icon={<AiOutlineSetting />}/>
        <Divider/>
        <Button type="outline" text="Вихід" onClick={() => {dispatch(logout())}} icon={<AiOutlineLogout/>}/>
      </FlexContainer>
    </FlexContainer>
  );
};

export default ProfileCard;
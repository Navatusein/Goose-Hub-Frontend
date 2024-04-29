import {FC} from 'react';
import styles from "./profile-card.module.scss";
import {FlexContainer, Button, Divider} from "@/shared/ui-kit";
import {useAppSelector} from "@/shared/hooks/use-app-selector.ts";
import {UserAvatar, userProfileApi} from "@/entities/user-profile";
import {AiOutlineSave, AiOutlineHistory, AiOutlineComment, AiOutlineSetting, AiOutlineLogout} from "react-icons/ai";
import {useLocation} from "react-router-dom";

const ProfileCard:FC = () => {
  const {user} = useAppSelector(state => state.user);

  const userProfile = userProfileApi.useFetchQuery(user?.userId ?? "", {skip: user === undefined});

  const location = useLocation();

  return (
    <FlexContainer gap={20} align="center" vertical>
      {(user !== undefined && userProfile.data !== undefined) && (
        <>
          <UserAvatar size="medium" userProfile={userProfile!.data} />
          <h2>{userProfile.data?.name}</h2>
        </>
      )}
      <FlexContainer className={styles.menu} align="start" vertical>
        <Button
          color={location.pathname === "/profile/lists" ? "accent" : "primary"}
          type="outline" text="Списки" icon={<AiOutlineSave />}/>
        <Divider />
        <Button
          color={location.pathname === "/profile/history" ? "accent" : "primary"}
          type="outline" text="Історія перегляду" icon={<AiOutlineHistory />}/>
        <Divider />
        <Button
          color={location.pathname === "/profile/comments" ? "accent" : "primary"}
          type="outline" text="Ваші коментарі"  icon={<AiOutlineComment />}/>
        <Divider />
        <Button
          color={location.pathname === "/profile/settings" ? "accent" : "primary"}
          type="outline" text="Налаштування"  icon={<AiOutlineSetting />}/>
        <Divider/>
        <Button type="outline" text="Вихід"  icon={<AiOutlineLogout />}/>
      </FlexContainer>
    </FlexContainer>
  );
};

export default ProfileCard;
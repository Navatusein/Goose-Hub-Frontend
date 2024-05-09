import {CSSProperties, FC, useMemo} from "react";
import styles from "./header.module.scss"
import {Button, FlexContainer, Logo} from "@/shared/ui-kit";
import {AiOutlineUser} from "react-icons/ai";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "@/shared/hooks/use-app-selector.ts";
import {UserAvatar, userProfileApi} from "@/entities/user-profile";
import NotificationButton from "@/widgets/header/ui/notification-button/notification-button.tsx";
import AdminMenuButton from "@/widgets/header/ui/admin-menu-button/admin-menu-button.tsx";
import {jwtDecoder} from "@/shared/helpers/jwt-decoder.ts";

interface IProps {
  isAbsolute?: boolean;
  styles?: CSSProperties;
  className?: string;
}

const Header: FC<IProps> = (props) => {
  const navigate = useNavigate();

  const {user} = useAppSelector(state => state.user);

  const userProfile = userProfileApi.useFetchUserProfileByIdQuery(user?.userId ?? "", {skip: user === undefined});

  const jwtPayload = useMemo(() => {
    if (!user)
      return undefined;

    return jwtDecoder(user.jwtToken);
  }, [user]);

  return (
    <header
      className={`${styles.header} ${props.isAbsolute === true && styles.positionAbsolute} ${props.className ?? ""}`}
      style={props.styles}
    >
      <Logo onClick={() => navigate("/content")}/>
      <FlexContainer align="center" className={styles.menuContainer}>
        {user === undefined && (
          <Button text="Вхід" type="outline" icon={<AiOutlineUser/>} onClick={() => navigate("/login")}/>
        )}
        {(user !== undefined && userProfile.data !== undefined) && (
          <>
            {jwtPayload?.role == "Admin" && (
              <AdminMenuButton/>
            )}
            <NotificationButton userProfile={userProfile.data}/>
            <FlexContainer
              align="center"
              className={`${styles.userProfile} ${styles.outlineType}`}
              onClick={() => navigate("/profile/wish-list")}
            >
              <UserAvatar userProfile={userProfile!.data}/>
              {userProfile.data?.name}
            </FlexContainer>
          </>
        )}
      </FlexContainer>
      <FlexContainer align="center" className={styles.burgerMenuContainer}>

        {user === undefined && (
          <Button text="Вхід" type="outline" icon={<AiOutlineUser/>} onClick={() => navigate("/login")}/>
        )}
        {(user !== undefined && userProfile.data !== undefined) && (
          <>
            {jwtPayload?.role == "Admin" && (
              <AdminMenuButton/>
            )}
            <NotificationButton userProfile={userProfile.data}/>
            <FlexContainer
              align="center"
              className={`${styles.userProfile} ${styles.outlineType}`}
              onClick={() => navigate("/profile/wish-list")}
            >
              <UserAvatar userProfile={userProfile!.data}/>
            </FlexContainer>
          </>
        )}
      </FlexContainer>
    </header>
  );
};

export default Header;
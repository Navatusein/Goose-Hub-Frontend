import {CSSProperties, FC} from "react";
import styles from "./header.module.scss"
import {Button, FlexContainer, Logo} from "@/shared/ui-kit";
import {AiOutlineBell, AiOutlineFolder, AiOutlineMenu, AiOutlineUser} from "react-icons/ai";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "@/shared/hooks/use-app-selector.ts";
import {UserAvatar, userProfileApi} from "@/entities/user-profile";

interface IProps {
  isAbsolute?: boolean;
  styles?: CSSProperties;
  className?: string;
}

const Header: FC<IProps> = (props) => {
  const navigate = useNavigate();

  const {user} = useAppSelector(state => state.user);

  const userProfile = userProfileApi.useFetchByTokenQuery(undefined, {skip: user === undefined});

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
        {userProfile.data !== undefined && (
          <>
            <Button type="outline" shape="square" icon={<AiOutlineFolder/>}/>
            <Button type="outline" shape="square" icon={<AiOutlineBell/>}/>
            <FlexContainer align="center">
              <UserAvatar userProfile={userProfile!.data}/>
              {userProfile.data?.name}
            </FlexContainer>
          </>
        )}
      </FlexContainer>
      <FlexContainer align="center" className={styles.burgerMenuContainer}>
        <Button type="outline" icon={<AiOutlineMenu/>}/>
      </FlexContainer>
    </header>
  );
};

export default Header;
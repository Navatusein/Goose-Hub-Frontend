import {CSSProperties, FC} from "react";
import styles from "./header.module.scss"
import {Button, FlexContainer, Logo} from "@/shared/ui-kit";
import {AiOutlineBell, AiOutlineFolder, AiOutlineMenu, AiOutlineUser} from "react-icons/ai";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "@/shared/hooks/use-app-selector.ts";
import {UserAvatar, userProfileApi} from "@/entities/user-profile";
import {logout} from "@/entities/user/model/user-slice.ts";

interface IProps {
  isAbsolute?: boolean;
  styles?: CSSProperties;
  className?: string;
}

const Header: FC<IProps> = (props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {user} = useAppSelector(state => state.user);

  const userProfile = userProfileApi.useFetchQuery(user?.userId ?? "", {skip: user === undefined});

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
            <Button type="outline" shape="square" icon={<AiOutlineFolder/>}/>
            <Button type="outline" shape="square" icon={<AiOutlineBell/>}/>
            <FlexContainer align="center">
              <UserAvatar userProfile={userProfile!.data} onClick={() => {dispatch(logout())}}/>
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
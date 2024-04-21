import {CSSProperties, FC} from "react";
import styles from "./header.module.scss"
import {Button, Logo} from "@/shared/ui-kit";
import {AiOutlineUser} from "react-icons/ai";
import {useNavigate} from "react-router-dom";

interface IProps {
  isAbsolute?: boolean;
  styles?: CSSProperties;
  className?: string;
}

const Header: FC<IProps> = (props) => {
  const navigate = useNavigate();

  return (
    <header
      className={`${styles.header} ${props.isAbsolute === true && styles.positionAbsolute} ${props.className ?? ""}`}
      style={props.styles}
    >
      <Logo onClick={() => navigate("/content")}/>
      <Button text="Вхід" type="outline" icon={<AiOutlineUser/>} onClick={() => navigate("/login")}/>
    </header>
  );
};

export default Header;
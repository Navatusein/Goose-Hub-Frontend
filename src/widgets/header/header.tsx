import {CSSProperties, FC} from "react";
import styles from "./header.module.scss"
import {Button, Logo} from "@/shared/ui-kit";
import {AiOutlineUser} from "react-icons/ai";

interface IProps {
  isAbsolute?: boolean;
  styles?: CSSProperties;
  className?: string;
}

const Header: FC<IProps> = (props) => {
  return (
    <header
      className={`${styles.header} ${props.isAbsolute === true && styles.positionAbsolute} ${props.className ?? ""}`}
      style={props.styles}
    >
      <Logo/>
      <Button text="Вхід" type="outline" icon={<AiOutlineUser/>}/>
    </header>
  );
};

export default Header;
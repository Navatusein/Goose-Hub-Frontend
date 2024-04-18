import {FC} from "react";
import styles from "./header.module.scss"
import {Button, Logo} from "@/shared/ui-kit";
import {AiOutlineUser} from "react-icons/ai";

const Header: FC = () => {
  return (
    <div className={styles.header}>
      <Logo/>
      <Button text="Вхід" type="outline" icon={<AiOutlineUser/>}/>
    </div>
  );
};

export default Header;
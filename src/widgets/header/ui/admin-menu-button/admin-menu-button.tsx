import {FC, useRef, useState} from "react";
import styles from "./admin-menu-button.module.scss";
import {AiOutlineControl} from "react-icons/ai";
import {Button, Dropdown, Paragraph} from "@/shared/ui-kit";
import {useNavigate} from "react-router-dom";

const AdminMenuButton: FC = () => {
  const navigate = useNavigate();
  const ref = useRef(null);

  const [open, setOpen] = useState(false);

  const navigateTo = (path: string) => {
    setOpen(false);
    navigate(path);
  }

  return (
    <div className={styles.container} ref={ref}>
      <Button
        type="outline"
        shape="square"
        icon={<AiOutlineControl/>}
        onClick={() => setOpen(!open)}
      />
      <Dropdown
        isOpen={open}
        setIsOpen={setOpen}
        parentRef={ref}
        className={styles.dropDownContainer}
        centerPosition="middle"
      >
        <Paragraph>
          Адмін меню
        </Paragraph>
        <Button text="Додати контент" onClick={() => navigateTo("/admin/content")}/>
        <Button text="Додати франшизу" onClick={() => navigateTo("/admin/franchise")}/>
      </Dropdown>
    </div>
  );
};

export default AdminMenuButton;
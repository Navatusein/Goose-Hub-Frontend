import {FC, useRef, useState} from "react";
import styles from "./notification-button.module.scss";
import {AiOutlineBell} from "react-icons/ai";
import {Alert, Button, Dropdown, FlexContainer, Paragraph} from "@/shared/ui-kit";
import {IUserProfile} from "@/entities/user-profile";
import Notification from "@/widgets/header/ui/notification/notification.tsx";

interface IProps {
  userProfile?: IUserProfile;
}

const NotificationButton: FC<IProps> = (props) => {
  const ref = useRef(null);

  const [open, setOpen] = useState(false);

  return (
    <div className={styles.container} ref={ref}>
      <div className={styles.buttonContainer} title={props.userProfile?.notifications.length.toString() ?? "0"}>
        <Button
          type="outline"
          shape="square"
          icon={<AiOutlineBell/>}
          onClick={() => setOpen(!open)}
        />
      </div>
      <Dropdown
        isOpen={open}
        setIsOpen={setOpen}
        parentRef={ref}
        className={styles.dropDownContainer}
        centerPosition="middle"
      >
        <FlexContainer align="center" justify="space-between">
          <Paragraph>
            Сповіщення
          </Paragraph>
          <Button
            shape="square"
            size="small"
            text="X"
            onClick={() => setOpen(false)}
          />
        </FlexContainer>
        {props.userProfile?.notifications?.map((item, index) => (
          <Notification
            notification={item}
            userProfile={props.userProfile!}
            index={index}
            key={index}
            closeMenu={() => setOpen(false)}
          />
        ))}
        {props.userProfile?.notifications?.length == 0 && (
          <Alert color="primary">
            Немає сповіщень
          </Alert>
        )}
      </Dropdown>
    </div>
  );
};

export default NotificationButton;
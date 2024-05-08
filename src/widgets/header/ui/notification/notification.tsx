import {FC} from "react";
import styles from "./notification.module.scss";
import {INotification, IUserProfile, userProfileApi} from "@/entities/user-profile";
import {FlexContainer} from "@/shared/ui-kit";
import {useNavigate} from "react-router-dom";

interface IProps {
  userProfile: IUserProfile;
  notification: INotification;
  index: number;
  closeMenu: () => void;
}

const Notification: FC<IProps> = (props) => {
  const navigate = useNavigate();

  const [updateProfile] = userProfileApi.useUpdateUserProfileMutation();

  const goToLink = () => {
    if (props.notification.linkRaw == undefined)
      return;

    props.closeMenu();

    updateProfile({...props.userProfile, notifications: props.userProfile.notifications.filter((_, index) => index != props.index)});

    navigate(props.notification.linkRaw);
  }

  return (
    <FlexContainer vertical className={styles.container} onClick={() => goToLink()}>
      <p>
        {props.notification.message}
      </p>
    </FlexContainer>
  );
};

export default Notification;
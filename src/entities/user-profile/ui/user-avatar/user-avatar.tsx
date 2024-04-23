import {CSSProperties, FC} from "react";
import styles from "./user-avatar.module.scss";
import {IUserProfile} from "@/entities/user-profile";

interface IProps {
  userProfile: IUserProfile;
  className?: string;
  style?: CSSProperties;
}

const UserAvatar: FC<IProps> = (props) => {
  return (
    <div className={`${styles.avatar} ${props.className ?? ""}`} style={props.style}>
      {props.userProfile.avatarUrl !== null && (
        <img src={props.userProfile.avatarUrl} alt={props.userProfile.name}/>
      )}
      {props.userProfile.avatarPath === null && (
        <div className={styles.text}>
          {props.userProfile.name.substring(0, 1)}
        </div>
      )}
    </div>
  );
};

export default UserAvatar;
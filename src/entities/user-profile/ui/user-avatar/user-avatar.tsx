import {CSSProperties, FC, MouseEventHandler} from "react";
import styles from "./user-avatar.module.scss";
import {IUserProfile, IUserProfilePreview} from "@/entities/user-profile";

interface IProps {
  userProfile: IUserProfile | IUserProfilePreview;
  size?: "small" | "medium";
  className?: string;
  style?: CSSProperties;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

const UserAvatar: FC<IProps> = (props) => {
  const sizes = {"small": "", "medium": styles.medium}
  return (
    <div
      className={`${styles.avatar} ${sizes[props.size ?? "small"]} ${props.className ?? ""}`}
      style={props.style}
      onClick={props.onClick}
    >
      {props.userProfile.avatarUrl !== null && (
        <img src={props.userProfile.avatarUrl} alt={props.userProfile.name}/>
      )}
      {props.userProfile.avatarPath === null && (
        <div className={styles.text}>
          {props.userProfile.name.substring(0, 1).toUpperCase()}
        </div>
      )}
    </div>
  );
};

export default UserAvatar;
import {FC} from "react";
import styles from "./franchise-card.module.scss";
import {DataTypeEnum, IPreview} from "@/entities/common";
// import {IAnime} from "@/entities/anime";
import {Tag} from "@/shared/ui-kit";
import {useNavigate} from "react-router-dom";

interface IProps {
  currentContentId: string;
  content: IPreview;
  index: number;
}

// const animeTypeToText = ["Спешел", "Фільм", "OVA", "ONA", "TV Серіал"]
const statusToText = ["Завершено", "Анансовано", "Виходть", "На паузі"]

const contentType = ["movie", "serial", "cartoon", "anime"];

const FranchiseCard: FC<IProps> = (props) => {
  const navigate = useNavigate()

  const onClick = () => {
    if (props.currentContentId == props.content.id!)
      return;

    navigate(`/content/${contentType[props.content.contentType - 1]}/${props.content.id}`);
  }

  return (
    <div
      className={`${styles.container} ${props.currentContentId == props.content.id! ? styles.accentColor : styles.outlineType}`}
      onClick={onClick}
    >
      <p className={styles.index}>{props.index + 1}</p>
      <p className={styles.name}>{props.content.name}</p>

      {/*{props.content.dataType == DataTypeEnum.anime && (*/}
      {/*  <Tag color={props.currentContentId == props.content.id! ? "primary" : "accent"}>*/}
      {/*    {(props.content as IAnime).status}*/}
      {/*  </Tag>*/}
      {/*)}*/}
      {props.content.dataType != DataTypeEnum.anime && (
        <div/>
      )}
      <p className={styles.release}>{props.content.release}</p>
      <Tag className={styles.status} color={props.currentContentId == props.content.id! ? "primary" : "accent"}>
        {statusToText[props.content.status - 1]}
      </Tag>
    </div>
  );
};

export default FranchiseCard;
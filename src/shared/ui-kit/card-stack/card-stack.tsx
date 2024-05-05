import {CSSProperties, FC, MouseEventHandler, ReactNode} from "react";
import styles from "./card-stack.module.scss";
import {FlexContainer} from "@/shared/ui-kit";

interface IProps {
  children: ReactNode;
  styles?: CSSProperties;
  className?: string;
  onClick?:  MouseEventHandler<HTMLDivElement>;
}

const CardStack: FC<IProps> = (props) => {
  return (
    <FlexContainer
      className={`${styles.cardStack} ${props.className ?? ""}`}
      align="center" gap={0}
      vertical
      onClick={props.onClick}
    >
      <div className={styles.card1}/>
      <div className={styles.card2}/>
      <div className={styles.cardMain}>
        {props.children}
      </div>
    </FlexContainer>
  );
};

export default CardStack;
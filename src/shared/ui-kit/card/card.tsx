import {CSSProperties, FC, ReactNode} from "react";
import styles from "./card.module.scss";
import {FlexContainer} from "@/shared/ui-kit";

interface IProps {
  children: ReactNode;
  styles?: CSSProperties;
  className?: string;
}

const Card: FC<IProps> = (props) => {
  return (
    <FlexContainer className={`${styles.content} ${props.className ?? ""}`} styles={props.styles} vertical>
      {props.children}
    </FlexContainer>
  );
};

export default Card;
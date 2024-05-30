import {CSSProperties, FC, ReactNode} from "react";
import styles from "./card-grid.module.scss";

interface IProps {
  children?: ReactNode;
  styles?: CSSProperties;
  className?: string;
}

const CardGrid: FC<IProps> = (props) => {
  return (
    <section className={`${styles.cardGrid} ${props.className ?? ""}`} style={props.styles}>
      {props.children}
    </section>
  );
};

export default CardGrid;
import {CSSProperties, FC, ReactNode} from 'react';
import {FlexContainer, Paragraph} from "@/shared/ui-kit";
import styles from "./text-with-label.module.scss";

interface IProps {
  styles?: CSSProperties;
  className?: string;
  icon: ReactNode;
  text: string;
}

const TextWithLabel:FC<IProps> = (props) => {
  return (
    <FlexContainer styles={props.styles} className={props.className} align="center" justify="start" gap={10}>
      <div className={styles.icon}>{props.icon}</div>
      <Paragraph>{props.text}</Paragraph>
    </FlexContainer>
  );
};

export default TextWithLabel;
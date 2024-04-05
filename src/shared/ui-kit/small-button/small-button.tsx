import { CSSProperties, FC, MouseEventHandler } from 'react'
import styles from './smal-button.module.scss'

interface IProps {
  text?: string;
  styles?: CSSProperties;
  className?: string;
  onClick?: MouseEventHandler;
}

const SmallButton: FC<IProps> = (props) => {
  return (
    <button
      className={`${styles.button} ${props.className}`}
      style={props.styles}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
}

export default SmallButton;
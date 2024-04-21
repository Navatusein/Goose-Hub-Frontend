import {CSSProperties, FC, useEffect} from "react";
import styles from "./range-slider.module.scss";
import * as Slider from "@radix-ui/react-slider";

interface IProps {
  value: number[];
  setValue: (value: number[]) => void;
  min: number;
  max: number;
  styles?: CSSProperties;
  className?: string;
}

const RangeSlider: FC<IProps> = (props) => {
  useEffect(() => {
    props.setValue([props.min, props.max]);
  }, [props.min, props.max]);

  const onValueChange = (value: number[]) => {
    props.setValue(value);
  }

  return (
    <div className={`${styles.rangeSliderContainer} ${props.className ?? ""}`} style={props.styles}>
      {Math.min(...props.value)}
      <Slider.Root
        className={styles.rangeSliderRoot}
        max={props.max}
        min={props.min}
        value={props.value}
        step={1}
        onValueChange={onValueChange}
      >
        <Slider.Track className={styles.rangeSliderTrack}>
          <Slider.Range className={styles.rangeSliderRange}/>
        </Slider.Track>
        <Slider.Thumb className={`${styles.rangeSliderThumb} ${styles.accentColor}`}/>
        <Slider.Thumb className={`${styles.rangeSliderThumb} ${styles.accentColor}`}/>
      </Slider.Root>
      {Math.max(...props.value)}
    </div>
  );
};

export default RangeSlider;
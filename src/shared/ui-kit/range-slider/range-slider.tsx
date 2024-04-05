import {FC, useState} from "react";
import styles from "./range-slider.module.scss";
import * as Slider from "@radix-ui/react-slider";

interface IProps {
  min: number;
  max: number;
}

const RangeSlider: FC<IProps> = (props) => {
  const [min, setMin] = useState<number>(props.min);
  const [max, setMax] = useState<number>(props.max);

  const onValueChange = (value: number[]) => {
    setMin(Math.min(...value));
    setMax(Math.max(...value));
  }

  return (
    <div className={styles.rangeSliderContainer}>
      {min}
      <Slider.Root
        className={styles.rangeSliderRoot}
        defaultValue={[props.min, props.max]}
        max={props.max}
        min={props.min}
        step={1}
        onValueChange={onValueChange}
      >
        <Slider.Track className={styles.rangeSliderTrack}>
          <Slider.Range className={styles.rangeSliderRange}/>
        </Slider.Track>
        <Slider.Thumb className={styles.rangeSliderThumb}/>
        <Slider.Thumb className={styles.rangeSliderThumb}/>
      </Slider.Root>
      {max}
    </div>
  );
};

export default RangeSlider;
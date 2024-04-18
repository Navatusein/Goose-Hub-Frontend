import {Dispatch, FC, SetStateAction} from "react";
import {IValue} from "@/shared/ui-kit/multi-select/model/types.ts";
import styles from "./select-single-value.module.scss"

interface IProps {
  selectedValues: IValue[];
  setSelectedValues: Dispatch<SetStateAction<IValue[]>>;
}

const SelectSingleValue: FC<IProps> = (props) => {
  return (
    <div className={styles.container}>
      {props.selectedValues[0].label}
    </div>
  );
};

export default SelectSingleValue;
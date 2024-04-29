import {FC, useMemo} from "react";
import {IOption, ValueType} from "@/shared/ui-kit/select/model/types.ts";
import styles from "./select-single-value.module.scss"

interface IProps {
  options: IOption[];
  values: ValueType;
}

const SelectSingleValue: FC<IProps> = (props) => {
  const selected = useMemo(() => {
    return props.options.find(x => x.value === props.values[0]);
  }, [props.options, props.values]);

  return (
    <div className={styles.container}>
      {selected?.label}
    </div>
  );
};

export default SelectSingleValue;
import {FC, MouseEvent, useMemo} from 'react';
import {Tag} from "@/shared/ui-kit";
import {IValue, ValueType} from "@/shared/ui-kit/select/model/types.ts";

interface IProps {
  options: IValue[];
  values: ValueType;
  setValues: (value: ValueType) => void;
}

const SelectMultiValue: FC<IProps> = (props) => {
  const removeSelect = (event: MouseEvent, value: IValue) => {
    event.stopPropagation();
    props.setValues(props.values.filter(x => x !== value.value));
  }

  const selected = useMemo(() => {
    return props.options.filter(x => props.values.find(y => y === x.value) !== undefined);
  }, [props.options, props.values]);

  return (
    <>
      {selected.map((value, index) =>
        <Tag key={index} color="accent" size="auto" onClose={(event) => removeSelect(event, value)}>
          {value.label}
        </Tag>
      )}
    </>
  );
};

export default SelectMultiValue;
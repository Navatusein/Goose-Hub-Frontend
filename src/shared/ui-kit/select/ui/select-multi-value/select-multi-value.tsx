import {Dispatch, FC, SetStateAction, MouseEvent} from 'react';
import {Tag} from "@/shared/ui-kit";
import {IValue} from "@/shared/ui-kit/multi-select/model/types.ts";

interface IProps {
  selectedValues: IValue[];
  setSelectedValues: Dispatch<SetStateAction<IValue[]>>;
}

const SelectMultiValue: FC<IProps> = (props) => {
  const removeSelect = (event: MouseEvent, value: IValue) => {
    event.stopPropagation();
    props.setSelectedValues(props.selectedValues.filter(x => x.value != value.value));
  }

  return (
    <>
      {props.selectedValues.map((value, index) =>
        <Tag key={index} color="accent" size="auto" onClose={(event) => removeSelect(event, value)}>
          {value.label}
        </Tag>
      )}
    </>
  );
};

export default SelectMultiValue;
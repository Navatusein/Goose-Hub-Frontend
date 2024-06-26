import {FC, MouseEvent, useMemo} from 'react';
import {Tag} from "@/shared/ui-kit";
import {CallBackType, IOption, ValueType} from "@/shared/ui-kit/select/model/types.ts";

interface IProps {
  options: IOption[];
  values: ValueType;
  setValues: CallBackType;
}

const SelectMultiValue: FC<IProps> = (props) => {
  const removeSelect = (event: MouseEvent, value: IOption) => {
    event.stopPropagation();
    props.setValues(props.values.filter(x => x !== value.value));
  }

  const selected = useMemo(() => {
    const selected = props.options.filter(x => props.values.find(y => y === x.value) != undefined);
    const notInOptions = props.values.filter(x => props.options.find(y => y.value === x) == undefined).map(x => {
      return {value: x, label: x as string};
    });

    return [...selected, ...notInOptions];
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
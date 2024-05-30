import {Dispatch, FC, RefObject, SetStateAction, useMemo, useState} from "react";
import styles from "./menu.module.scss";
import {Dropdown, Input} from "@/shared/ui-kit";
import {CallBackType, IOption, ValueType} from "@/shared/ui-kit/select/model/types.ts";

interface IProps {
  options?: IOption[];
  values: ValueType;
  setValues: CallBackType;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isSearchable: boolean;
  isCreatable: boolean;
  isMulti: boolean;
  parentRef: RefObject<HTMLElement>;
}

const Menu: FC<IProps> = (props) => {
  const [query, setQuery] = useState<string>("");

  const searchedValues = useMemo(() => {
    if (props.options === undefined)
      return [];

    let options = props.options;

    if (props.isCreatable) {
      const notInOptions = props.values.filter(x => props.options?.find(y => y.value === x) == undefined).map(x => {
        return {value: x, label: x as string};
      });

      options = [...options, ...notInOptions];
    }

    let filtered = options.filter(x => x.label.toLowerCase().includes(query.toLowerCase()));

    if (props.isCreatable && filtered.length === 0 && query.trim().length !== 0)
      filtered = [{label: query, value: query}]

    return filtered;
  }, [query, props.options, props.isCreatable])

  const isSelected = (value: IOption): boolean => {
    return props.values.find(x => x === value.value) != undefined;
  }

  const toggleSelect = (selectedValue: IOption) => {
    if (props.isMulti) {
      const updatedValues = isSelected(selectedValue)
        ? props.values.filter(x => x !== selectedValue.value)
        : [...props.values, selectedValue.value];
      props.setValues(updatedValues);
    }
    else {
      props.setValues([selectedValue.value]);
    }

    props.setIsOpen(false);
  }

  return (
    <Dropdown isOpen={props.isOpen} setIsOpen={props.setIsOpen} parentRef={props.parentRef}>
      {props.isSearchable && (
        <Input placeholder="Пошук" value={query} onChange={e => setQuery(e.target.value)}/>
      )}
      {searchedValues.length === 0 && (
        <div>Нічого не знайдено</div>
      )}
      {searchedValues.length !== 0 && (
        <ul className={styles.menuList}>
          {searchedValues.map((value, index) =>
            <li
              className={`${styles.menuItem} ${isSelected(value) ? styles.accentColor : styles.secondaryColor}`}
              aria-selected={isSelected(value)}
              key={index}
              onClick={() => toggleSelect(value)}
            >
              {value.label}
            </li>
          )}
        </ul>
      )}
    </Dropdown>
  );
};

export default Menu;
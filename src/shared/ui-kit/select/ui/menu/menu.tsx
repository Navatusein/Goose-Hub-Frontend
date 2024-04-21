import {Dispatch, FC, SetStateAction, useMemo, useState} from "react";
import styles from "./menu.module.scss";
import {Input} from "@/shared/ui-kit";
import {IValue, ValueType} from "@/shared/ui-kit/select/model/types.ts";

interface IProps {
  options?: IValue[];
  values: ValueType;
  setValues: (value: ValueType) => void;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isSearchable: boolean;
  isCreatable: boolean;
  isMulti: boolean;
}

const Menu: FC<IProps> = (props) => {
  const [query, setQuery] = useState<string>("");

  const searchedValues = useMemo(() => {
    if (props.options === undefined)
      return [];

    let filtered = props.options.filter(x => x.label.toLowerCase().includes(query.toLowerCase()));

    if (props.isCreatable && filtered.length === 0)
      filtered = [{label: query, value: query}]

    return filtered;
  }, [query, props.options, props.isCreatable])

  const toggleSelect = (selectedValue: IValue) => {
    if (props.isMulti) {
      if (isSelected(selectedValue)) {
        props.setValues(props.values.filter(x => x !== selectedValue.value));
      }
      else {
        props.setValues([...props.values, selectedValue.value]);
      }
    }
    else {
      props.setValues([selectedValue.value]);
    }

    props.setIsOpen(false);
  }

  const isSelected = (value: IValue): boolean => {
    return props.values.find(x => x === value.value) != undefined;
  }

  return (
    <div className={`${styles.menu} ${!props.isOpen && styles.hidden}`}>
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
    </div>
  );
};

export default Menu;
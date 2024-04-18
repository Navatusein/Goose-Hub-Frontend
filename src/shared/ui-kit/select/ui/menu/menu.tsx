import {Dispatch, FC, SetStateAction, useMemo, useState} from "react";
import styles from "./menu.module.scss";
import {Input} from "@/shared/ui-kit";
import {IValue} from "@/shared/ui-kit/multi-select/model/types.ts";

interface IProps {
  values: IValue[];
  selectedValues: IValue[];
  setSelectedValues: Dispatch<SetStateAction<IValue[]>>;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isSearchable: boolean;
  isCreatable: boolean;
  isMulti: boolean;
}

const Menu: FC<IProps> = (props) => {
  const [query, setQuery] = useState<string>("");

  const searchedValues = useMemo(() => {
    let filtered = props.values.filter(x => x.label.toLowerCase().includes(query.toLowerCase()));

    if (props.isCreatable && filtered.length === 0)
      filtered = [{label: query, value: query}]

    return filtered;
  }, [query, props.values, props.isCreatable])

  const toggleSelect = (selectedValue: IValue) => {
    if (props.isMulti) {
      if (isSelected(selectedValue)) {
        props.setSelectedValues(props.selectedValues.filter(x => x.value != selectedValue.value));
      }
      else {
        props.setSelectedValues([...props.selectedValues, selectedValue]);
      }
    }
    else {
      props.setSelectedValues([selectedValue]);
    }

    props.setIsOpen(false);
  }

  const isSelected = (value: IValue): boolean => {
    return props.selectedValues.find(x => x.value === value.value) != undefined;
  }

  return (
    <div className={`${styles.menu} ${!props.isOpen && styles.hidden}`}>
      {props.isSearchable && (
        <Input placeholder="Пошук" onChange={e => setQuery(e.target.value)}/>
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
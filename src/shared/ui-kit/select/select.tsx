import styles from "./select.module.scss"
import {CSSProperties, FC, useRef, useState} from "react";
import {useClickOutside} from "@/shared/hooks/use-click-outside.ts";
import {AiOutlineDown} from "react-icons/ai";
import {IValue} from "./model/types.ts";
import Menu from "./ui/menu/menu.tsx";
import SelectMultiValue from "./ui/select-multi-value/select-multi-value.tsx";
import SelectSingleValue from "./ui/select-single-value/select-single-value.tsx";

interface IProps {
  placeholder: string;
  options: IValue[];
  isMulti?: boolean;
  isSearchable?: boolean;
  isCreatable?: boolean;
  disabled?: boolean;
  error?: string;
  styles?: CSSProperties;
  className?: string;
}

const Select: FC<IProps> = (props) => {
  const ref = useRef(null)

  const [isOpen, setIsOpen] = useState(false)
  const [selectedValues, setSelectedValues] = useState<IValue[]>([])

  useClickOutside(ref, () => {setIsOpen(false)});

  const toggleMenu = () => {
    if (props.disabled === true)
      return;

    setIsOpen(!isOpen);
  }

  return (
    <div className={`${styles.select} ${props.className ?? ""}`} ref={ref} style={props.styles}>
      <div className={`${styles.control} ${styles.field} ${props.error && styles.error}`} aria-disabled={props.disabled} onClick={() => toggleMenu()}>
        <div className={styles.valuesContainer}>
          {selectedValues.length === 0 && (
            <p className={styles.placeholder}>{props.placeholder}</p>
          )}
          {(selectedValues.length !== 0 && props.isMulti === true) && (
            <SelectMultiValue selectedValues={selectedValues} setSelectedValues={setSelectedValues}/>
          )}
          {(selectedValues.length !== 0 && props.isMulti !== true) && (
            <SelectSingleValue selectedValues={selectedValues} setSelectedValues={setSelectedValues}/>
          )}
        </div>
        <div className={styles.icon}>
          <AiOutlineDown/>
        </div>
      </div>
      <Menu
        values={props.options}
        selectedValues={selectedValues}
        setSelectedValues={setSelectedValues}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isSearchable={props.isSearchable ?? false}
        isCreatable={props.isCreatable ?? false}
        isMulti={props.isMulti ?? false}
      />
      {props.error && <p>{props.error}</p>}
    </div>
  );
};

export default Select;
import styles from "./select.module.scss"
import {CSSProperties, FC, useRef, useState} from "react";
import {AiOutlineDown} from "react-icons/ai";
import {CallBackType, IOption, ValueType} from "./model/types.ts";
import Menu from "./ui/menu/menu.tsx";
import SelectMultiValue from "./ui/select-multi-value/select-multi-value.tsx";
import SelectSingleValue from "./ui/select-single-value/select-single-value.tsx";

interface IProps {
  values: ValueType;
  setValues: CallBackType;
  placeholder: string;
  options?: IOption[];
  isMulti?: boolean;
  isSearchable?: boolean;
  isCreatable?: boolean;
  disabled?: boolean;
  error?: string;
  styles?: CSSProperties;
  className?: string;
}

const Select: FC<IProps> = (props) => {
  const ref = useRef(null);

  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    if (props.disabled === true)
      return;

    setIsOpen(!isOpen);
  }

  return (
    <div className={`${styles.select} ${props.className ?? ""}`} style={props.styles} ref={ref}>
      <div className={`${styles.control} ${styles.field} ${props.error && styles.error}`} aria-disabled={props.disabled} onClick={() => toggleMenu()}>
        <div className={styles.valuesContainer}>
          {props.values.length === 0 && (
            <p className={styles.placeholder}>{props.placeholder}</p>
          )}
          {(props.values.length !== 0 && props.isMulti === true) && (
            <SelectMultiValue
              options={props.options!}
              values={props.values}
              setValues={props.setValues}
            />
          )}
          {(props.values.length !== 0 && props.isMulti !== true) && (
            <SelectSingleValue
              options={props.options!}
              values={props.values}
            />
          )}
        </div>
        <div className={styles.icon}>
          <AiOutlineDown/>
        </div>
      </div>
      <Menu
        options={props.options}
        values={props.values}
        parentRef={ref}
        setValues={props.setValues}
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
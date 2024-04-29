export interface IOption {
  label: string;
  value: string | number;
}

export type ValueType = (string | number)[];
export type CallBackType = (value: ValueType) => void;
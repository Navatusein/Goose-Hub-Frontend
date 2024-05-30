export interface IOption {
  label: string;
  value: string | number | undefined;
}

export type ValueType = (string | number | undefined)[];
export type CallBackType = (value: ValueType) => void;
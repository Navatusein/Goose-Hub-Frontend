import {Dispatch, SetStateAction} from "react";

export interface IContext {
  setIsHeaderAbsolute: Dispatch<SetStateAction<boolean>>;
}

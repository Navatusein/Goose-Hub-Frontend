import {useEffect} from "react";
import {useOutletContext} from "react-router-dom";
import {IContext} from "@/shared/types/types.ts";

export const useHeaderAbsolute = (state: boolean = false) => {
  const {setIsHeaderAbsolute} = useOutletContext<IContext>();

  useEffect(() => {
    setIsHeaderAbsolute(state);
  })
}
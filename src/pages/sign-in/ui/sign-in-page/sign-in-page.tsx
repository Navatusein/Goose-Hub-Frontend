import {FC, useEffect} from "react";
import styles from "./sign-in-page.module.scss";
import {FlexContainer} from "@/shared/ui-kit";
import {SignIn} from "@/widgets/sign-in";
import {useOutletContext} from "react-router-dom";
import {IContext} from "@/shared/types/types.ts";


const SignInPage: FC = () => {
  const {setIsHeaderAbsolute} = useOutletContext<IContext>();

  useEffect(() => {
    setIsHeaderAbsolute(false);
  })

  return (
    <FlexContainer vertical gap={30} justify="center" align="center" className={styles.container}>
      <SignIn className={styles.form}/>
    </FlexContainer>
  );
};

export default SignInPage;
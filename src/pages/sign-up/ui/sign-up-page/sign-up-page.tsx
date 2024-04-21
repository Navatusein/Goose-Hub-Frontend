import {FC, useEffect} from "react";
import styles from "./sign-up-page.module.scss";
import {FlexContainer} from "@/shared/ui-kit";
import {useOutletContext} from "react-router-dom";
import {IContext} from "@/shared/types/types.ts";
import {SignUp} from "@/widgets/sign-up";


const SignUpPage: FC = () => {
  const {setIsHeaderAbsolute} = useOutletContext<IContext>();

  useEffect(() => {
    setIsHeaderAbsolute(false);
  })

  return (
    <FlexContainer vertical gap={30} justify="center" align="center" className={styles.container}>
      <SignUp className={styles.form}/>
    </FlexContainer>
  );
};

export default SignUpPage;
import {FC} from "react";
import styles from "./sign-in-page.module.scss";
import {FlexContainer} from "@/shared/ui-kit";
import {SignIn} from "@/widgets/sign-in";
import {useHeaderAbsolute} from "@/shared/hooks/use-header-absolute.ts";


const SignInPage: FC = () => {
  useHeaderAbsolute();

  return (
    <FlexContainer vertical gap={30} justify="center" align="center" className={styles.container}>
      <SignIn className={styles.form}/>
    </FlexContainer>
  );
};

export default SignInPage;
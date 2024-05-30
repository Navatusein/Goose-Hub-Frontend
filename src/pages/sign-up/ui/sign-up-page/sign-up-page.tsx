import {FC} from "react";
import styles from "./sign-up-page.module.scss";
import {FlexContainer} from "@/shared/ui-kit";
import {SignUp} from "@/widgets/sign-up";
import {useHeaderAbsolute} from "@/shared/hooks/use-header-absolute.ts";


const SignUpPage: FC = () => {
  useHeaderAbsolute();

  return (
    <FlexContainer vertical gap={30} justify="center" align="center" className={styles.container}>
      <SignUp className={styles.form}/>
    </FlexContainer>
  );
};

export default SignUpPage;
import {FC} from "react";
import {Card, FlexContainer, PageContainer, Paragraph} from "@/shared/ui-kit";
import styles from "./contacts-page.module.scss";
import {AiOutlineMail} from "react-icons/ai";
import {FaTelegramPlane} from "react-icons/fa";



const ContactsPage: FC = () => {
  return (
    <PageContainer>
      <h1 className={styles.title}>Наші контакти</h1>
      <Card className={styles.container}>
        <FlexContainer gap={30} vertical>
          <FlexContainer align="center">
            <div className={styles.icon}>
              <AiOutlineMail/>
            </div>
            <Paragraph>
              <a href="mailto:mail@goosehub.duckdns.org" className={styles.link}>
                mail@goosehub.duckdns.org
              </a>
            </Paragraph>
          </FlexContainer>
          <FlexContainer align="center">
            <div className={styles.icon}>
              <FaTelegramPlane/>
            </div>
            <Paragraph>
              <a href="https://t.me/goosehub-ua" className={styles.link}>
                t.me/goosehub-ua
              </a>
            </Paragraph>
          </FlexContainer>
        </FlexContainer>
      </Card>
    </PageContainer>
  );
};

export default ContactsPage;
import {FC, useEffect} from 'react';
import "./privacy-policy-page.module.scss";
import {useOutletContext} from "react-router-dom";
import {IContext} from "@/shared/types/types.ts";
import {FlexContainer, Paragraph} from "@/shared/ui-kit";
import styles from "@/pages/lawmakers/ui/lawmakers-page/lawmakers-page.module.scss";

const PrivacyPolicyPage:FC = () => {
  const {setIsHeaderAbsolute} = useOutletContext<IContext>();

  useEffect(() => {
    setIsHeaderAbsolute(false);
  })

  return (
    <FlexContainer justify="start" align="center" vertical>
      <h1>Політика конфіденційності</h1>
      <FlexContainer className={styles.container} justify="center" align="start" gap={30}>
        <FlexContainer className={styles.content} justify="start" align="start" gap={30} vertical>
          <Paragraph>
            Вітаємо на сайті Goose.Hub. Ми прагнемо забезпечити найвищий рівень конфіденційності та безпеки для наших
            користувачів. Прошу ознайомитися з нашою політикою конфіденційності, щоб ви знали, як ми обробляємо та захищаємо вашу особисту інформацію.
          </Paragraph>

          <Paragraph>
            <ol>
              <li>
                Збір та використання інформації:
                <ul>
                  <li>
                    Ми можемо збирати особисту інформацію, таку як електронна пошта та ім'я, тільки за вашим згодою.
                  </li>
                  <li>
                    Інша неособиста інформація, така як IP-адреса, тип браузера та мова, може автоматично збиратися для
                    поліпшення взаємодії з нашим сайтом.
                  </li>
                </ul>
              </li>
              <li>
                Захист інформації:
                <ul>
                  <li>
                    Ми вживаємо технічних та організаційних заходів для захисту вашої особистої інформації від
                    несанкціонованого доступу, втрати чи руйнування.
                  </li>
                  <li>
                    Доступ до особистої інформації має обмежений кількістю співробітників і партнерів, які необхідно
                    мати цю інформацію для надання послуг.
                  </li>
                </ul>
              </li>
              <li>
                Використання файлів "cookies":
                <ul>
                  <li>
                    Ми можемо використовувати файли "cookies" для забезпечення зручності користувачів та для аналізу
                    використання сайту.
                  </li>
                  <li>
                    Ви можете змінити налаштування свого браузера, щоб відмовитися від використання файлів "cookies",
                    але це може вплинути на функціональність сайту.
                  </li>
                </ul>
              </li>
              <li>
                Реклама та партнерські програми:
                <ul>
                  <li>
                    Ми можемо співпрацювати з рекламними та партнерськими програмами, але ваші особисті дані не
                    будуть передаватися без вашого дозволу.
                  </li>
                </ul>
              </li>
              <li>
                Зміни в політиці конфіденційності:
                <ul>
                  <li>
                    Ми можемо час від часу оновлювати нашу політику конфіденційності. Будь ласка, періодично перевіряйте
                    цю сторінку для ознайомлення з останніми змінами.
                  </li>
                </ul>
              </li>
            </ol>
          </Paragraph>

          <Paragraph>
            Безпека та конфіденційність наших користувачів є нашим пріоритетом. Дякуємо, що обрали наш сайт для свого
            розвагового відпочинку. Якщо у вас є будь-які питання чи зауваження, будь ласка, зв'яжіться з нами за
            допомогою контактної інформації, наданої на сайті.
          </Paragraph>
        </FlexContainer>
      </FlexContainer>
    </FlexContainer>
  );
};

export default PrivacyPolicyPage;
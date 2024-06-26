import {FC} from "react";
import styles from "./lawmakers-page.module.scss";
import {Card, FlexContainer, PageContainer, Paragraph} from "@/shared/ui-kit";
import {useHeaderAbsolute} from "@/shared/hooks/use-header-absolute.ts";

const LawmakersPage: FC = () => {
  useHeaderAbsolute();

  return (
    <PageContainer>
      <h1 className={styles.title}>Правовласникам</h1>
      <Card>
        <FlexContainer justify="start" align="start" gap={30} vertical>
          <Paragraph>
            Вітаємо вас на нашому сайті для перегляду фільмів, серіалів, мультфільмів та аніме. Ми розуміємо
            важливість захисту авторських прав і прагнемо дотримуватися високих стандартів в цьому питанні. Прошу вас
            відзначити нижче нашу політику відносно авторських прав, щоб забезпечити взаєморозуміння та ефективну
            співпрацю.
          </Paragraph>

          <Paragraph>
            <ol>
              <li>
                Легальність вмісту:
                <ul>
                  <li>
                    Ми виключно співпрацюємо з правовласниками та володарями авторських прав, які надали належні
                    дозволи для розміщення їхнього вмісту на нашому сайті.
                  </li>
                  <li>
                    Якщо ви є власником авторських прав і вважаєте, що ваш вміст був розміщений без дозволу, будь ласка,
                    повідомте нас, і ми негайно вживемо заходів для вирішення цього питання.
                  </li>
                </ul>
              </li>
              <li>
                Ліцензії та Угоди:
                <ul>
                  <li>
                    Всі правовласники повинні надавати належні ліцензії та угоди на використання їхнього вмісту на
                    нашому сайті.
                  </li>
                  <li>
                    Ми віддані дотриманню умов ліцензій та угод, які визначають права та обов'язки обох сторін.
                  </li>
                </ul>
              </li>
              <li>
                Захист від несанкціонованого вмісту:
                <ul>
                  <li>
                    Ми вживаємо заходів для запобігання розміщенню несанкціонованого вмісту та контролюємо його
                    виникнення.
                  </li>
                  <li>
                    Застереження та сигнали від правовласників є надзвичайно важливими для нас, і ми відповідатимемо на
                    них негайно.
                  </li>
                </ul>
              </li>
              <li>
                Співпраця та Зворотний Зв'язок:
                <ul>
                  <li>
                    Ми завжди готові до співпраці з правовласниками для вирішення будь-яких питань, пов'язаних з
                    авторськими правами.
                  </li>
                  <li>
                    Ваш відгук та пропозиції важливі для нас, і ми завжди відкриті для вдосконалення наших процедур та політик.
                  </li>
                </ul>
              </li>
              <li>
                Контактна Інформація:
                <ul>
                  <li>
                    Якщо у вас є будь-які питання, пов'язані з авторськими правами чи нашою політикою, будь ласка,
                    зв'яжіться з нами за допомогою контактної інформації, наданої на сайті.
                  </li>
                </ul>
              </li>

            </ol>
          </Paragraph>

          <Paragraph>
            Дякуємо за вашу увагу до цього питання. Ми віримо в прозору та взаємовигідну співпрацю з правовласниками для
            забезпечення легального та етичного використання авторського вмісту на нашому сайті.
          </Paragraph>
        </FlexContainer>
      </Card>
    </PageContainer>
  );
};

export default LawmakersPage;
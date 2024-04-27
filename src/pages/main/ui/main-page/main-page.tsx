import {FC} from "react";
// import styles from "./main-page.module.scss"
import {FlexContainer, PageContainer} from "@/shared/ui-kit";
import {ContentContainer} from "@/widgets/content-container";
import {ContentCarousel} from "@/widgets/content-carousel";
import {useHeaderAbsolute} from "@/shared/hooks/use-header-absolute.ts";

const MainPage: FC = () => {
  useHeaderAbsolute(true);

  return (
    <FlexContainer gap={30} vertical>
      <ContentCarousel/>
      <PageContainer>
        <ContentContainer/>
      </PageContainer>
    </FlexContainer>
  );
};

export default MainPage;
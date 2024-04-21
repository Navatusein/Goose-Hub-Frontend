import {FC, useEffect} from "react";
// import styles from "./main-page.module.scss"
import {useOutletContext} from "react-router-dom";
import {IContext} from "@/shared/types/types.ts";
import {FlexContainer, PageContainer} from "@/shared/ui-kit";
import {ContentContainer} from "@/widgets/content-container";
import {ContentCarousel} from "@/widgets/content-carousel";

const MainPage: FC = () => {
  const {setIsHeaderAbsolute} = useOutletContext<IContext>();

  useEffect(() => {
    setIsHeaderAbsolute(true);
  })

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
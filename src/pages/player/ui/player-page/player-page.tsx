import {FC} from "react";
import styles from "./player-page.module.scss"
import {useParams} from "react-router-dom";
import {useHeaderAbsolute} from "@/shared/hooks/use-header-absolute.ts";
import {contentApi} from "@/entities/common";
import {FlexContainer, PageContainer} from "@/shared/ui-kit";
import ContentInfoCard from "@/features/content-info-card/ui/content-info-card/content-info-card.tsx";
import {ContentPlayerCard} from "@/widgets/content-player-card";

type PathParams = {
  contentId: string;
}

const PlayerPage: FC = () => {
  useHeaderAbsolute();

  const params = useParams<PathParams>();
  const data = contentApi.useFetchContentByIdQuery(params.contentId!);

  if (data.data === undefined)
    return <div>Loading</div>

  return (
    <PageContainer styles={{height: "100%"}}>
      <FlexContainer className={styles.container} gap="page">
        <ContentInfoCard content={data.data} className={styles.infoCard}/>
        <ContentPlayerCard content={data.data} className={styles.playerCard}/>
      </FlexContainer>
    </PageContainer>
  );
};

export default PlayerPage;
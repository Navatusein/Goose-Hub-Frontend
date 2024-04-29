import {FC} from "react";
import styles from "./player-page.module.scss"
import {useParams} from "react-router-dom";
import {useHeaderAbsolute} from "@/shared/hooks/use-header-absolute.ts";
import {commonApi} from "@/entities/common";
import {Divider, FlexContainer, PageContainer, Paragraph, Tag} from "@/shared/ui-kit";
import ContentInfoCard from "@/features/content-info-card/ui/content-info-card/content-info-card.tsx";
import {Player} from "@/features/player";

type PathParams = {
  contentId: string;
}

const PlayerPage: FC = () => {
  useHeaderAbsolute();

  const params = useParams<PathParams>();
  const data = commonApi.useFetchByIdQuery(params.contentId!);
  return (
    <PageContainer styles={{height: "100%"}}>
      <FlexContainer className={styles.container}>
        <ContentInfoCard content={data.data} className={styles.infoCard}/>
        <FlexContainer vertical className={styles.playerContainer}>
          <h1>
            {data.data?.name}
          </h1>

          <Divider/>
          <Player src={"https://minio.navatuseinlab.duckdns.org/dev-goose-hub-content/30397b5c-6322-4727-90c6-8152fd3091ff/main.m3u8"}/>
          <FlexContainer>
            {data.data?.genres.map((value, index) => (
              <Tag key={index}>{value}</Tag>
            ))}
          </FlexContainer>

          <Divider/>
          <Paragraph>
            {data.data?.description}
          </Paragraph>

        </FlexContainer>
      </FlexContainer>
    </PageContainer>
  );
};

export default PlayerPage;
import {FC} from "react";
import styles from "./player-page.module.scss"
import {useParams} from "react-router-dom";
import {useHeaderAbsolute} from "@/shared/hooks/use-header-absolute.ts";
import {contentApi, ContentTypeEnum, DataTypeEnum, IPreview, StatusEnum} from "@/entities/common";
import {FlexContainer, PageContainer, ScrollToAnchor} from "@/shared/ui-kit";
import ContentInfoCard from "@/features/content-info-card/ui/content-info-card/content-info-card.tsx";
import {ContentPlayerCard} from "@/widgets/content-player-card";

type PathParams = {
  contentId: string;
}

const defaultContent: IPreview = {
  name: "",
  originalName: "",
  genres: [],
  description: "",
  contentType: ContentTypeEnum.movie,
  dataType: DataTypeEnum.movie,
  country: "",
  ageRestriction: "",
  status: StatusEnum.announcement,
  directedBy: []
}

const PlayerPage: FC = () => {
  useHeaderAbsolute();

  const params = useParams<PathParams>();
  const data = contentApi.useFetchContentByIdQuery(params.contentId!);

  return (
    <PageContainer styles={{height: "100%"}}>
      <ScrollToAnchor/>
      <FlexContainer className={styles.container} gap="page">
        <ContentInfoCard content={data.data ?? defaultContent} className={styles.infoCard}/>
        <ContentPlayerCard content={data.data ?? defaultContent} className={styles.playerCard}/>
      </FlexContainer>
    </PageContainer>
  );
};

export default PlayerPage;
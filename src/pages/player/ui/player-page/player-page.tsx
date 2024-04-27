import {FC} from "react";
import {useParams} from "react-router-dom";
import {useHeaderAbsolute} from "@/shared/hooks/use-header-absolute.ts";
import {commonApi} from "@/entities/common";
import {PageContainer} from "@/shared/ui-kit";
import ContentInfoCard from "@/features/content-info-card/ui/content-info-card/content-info-card.tsx";

type PathParams = {
  contentId: string;
}

const PlayerPage: FC = () => {
  useHeaderAbsolute();

  const params = useParams<PathParams>();
  const data = commonApi.useFetchByIdQuery(params.contentId!);

  return (
    <PageContainer horizontal>
      <ContentInfoCard content={data.data} styles={{width: "30%"}}/>
    </PageContainer>
  );
};

export default PlayerPage;
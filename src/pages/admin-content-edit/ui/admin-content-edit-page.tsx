import {FC, useEffect, useState} from "react";
import styles from "./admin-content-edit-page.module.scss";
import {FlexContainer, PageContainer} from "@/shared/ui-kit";
import {ContentPlayerEditCard} from "@/widgets/content-player-edit-card/ui";
import {ContentTypeEnum, DataTypeEnum, IPreview, StatusEnum, contentApi} from "@/entities/common";
import {useParams} from "react-router-dom";
import {ContentInfoEditCard} from "@/features/content-info-edit-card";


type PathParams = {
  contentId?: string;
}

const defaultPreview: IPreview = {
  name: "",
  originalName: "",
  description: "",
  dataType: DataTypeEnum.movie,
  contentType: ContentTypeEnum.movie,
  directedBy: [],
  status: StatusEnum.announcement,
  genres: [],
  ageRestriction: "0+",
  release: "2024-01-01",
  country: ""
}

const AdminContentEditPage: FC = () => {
  const [content, setContent] = useState<IPreview>(defaultPreview);

  const params = useParams<PathParams>();
  const data = contentApi.useFetchContentByIdQuery(params.contentId!, {skip: params.contentId == undefined});

  useEffect(() => {
    if (data.data == undefined)
      return;

    setContent(data.data);
  }, [data.data]);

  return (
    <PageContainer>
      <FlexContainer className={styles.container} gap="page">
        <ContentInfoEditCard className={styles.infoCard} content={content} setContent={setContent}/>
        <ContentPlayerEditCard className={styles.playerCard} content={content} setContent={setContent}/>
      </FlexContainer>
    </PageContainer>
  );
};

export default AdminContentEditPage;
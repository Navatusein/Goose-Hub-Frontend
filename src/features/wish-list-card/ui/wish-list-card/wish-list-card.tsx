import {FC} from "react";
import styles from "./wish-list-card.module.scss";
import {IWishList} from "@/entities/wish-list";
import {CardStack, FlexContainer, Paragraph} from "@/shared/ui-kit";
import {commonApi} from "@/entities/common";
import {useNavigate} from "react-router-dom";

interface IProps {
  wishList: IWishList;
}

const WishListCard: FC<IProps> = (props) => {
  const contentId = props.wishList.contents[0]?.contentId;

  const navigate = useNavigate();

  const previews = commonApi.useFetchPreviewByIdsQuery([contentId!], {skip: contentId == undefined})

  return (
    <FlexContainer className={styles.container} vertical>
      <CardStack onClick={() => navigate(`/profile/wish-list/${props.wishList.id}`)}>
       <div className={styles.card}>
         {previews.data !== undefined && (
           <img src={previews.data[0].posterUrl} alt=""/>
         )}
       </div>
      </CardStack>
      <Paragraph className={styles.text} fontSize="default">
        {props.wishList.name}
      </Paragraph>
    </FlexContainer>
  );
};

export default WishListCard;
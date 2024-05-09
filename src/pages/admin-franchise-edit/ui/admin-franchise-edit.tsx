import {FC} from "react";
import {PageContainer} from "@/shared/ui-kit";
import FranchiseEditCard from "@/widgets/franchise-edit-card/ui/franchise-edit-card/franchise-edit-card.tsx";
// import styles from "./admin-franchise-edit.module.scss";

const AdminFranchiseEdit: FC = () => {
  return (
    <PageContainer>
      <FranchiseEditCard/>
    </PageContainer>
  );
};

export default AdminFranchiseEdit;
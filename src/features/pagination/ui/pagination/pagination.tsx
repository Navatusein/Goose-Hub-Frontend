import {CSSProperties, FC} from "react";
import styles from "./pagination.module.scss";
import {Button, FlexContainer} from "@/shared/ui-kit";
import {AiOutlineEllipsis, AiOutlineLeft, AiOutlineRight} from "react-icons/ai";
import {DOTS, usePagination} from "@/features/pagination/hooks/usePagination.ts";

interface IProps {
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
  total: number;
  styles?: CSSProperties;
  className?: string;
}

const Pagination: FC<IProps> = (props) => {

  const paginationRange = usePagination(props.total, props.currentPage)!;

  if (paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    if (props.currentPage + 1 > props.total)
      return;

    props.setCurrentPage(props.currentPage + 1);
  };

  const onPrevious = () => {
    if (props.currentPage === 1)
      return;

    props.setCurrentPage(props.currentPage - 1);
  };

  return (
    <FlexContainer className={`${props.className ?? ""}`} styles={props.styles}>
      <Button icon={<AiOutlineLeft/>} className={styles.button} onClick={onPrevious}/>

      {paginationRange.map((pageNumber, index) => (
        <div key={index}>
          {pageNumber === DOTS && (
            <div className={styles.dots}>
              <AiOutlineEllipsis/>
            </div>
          )}
          {pageNumber !== DOTS && (
            <Button
              text={pageNumber.toString()}
              className={styles.button}
              color={pageNumber === props.currentPage ? "accent" : "primary"}
              onClick={() => props.setCurrentPage(pageNumber)}
            />
          )}
        </div>
      ))}

      <Button icon={<AiOutlineRight/>} className={styles.button} onClick={onNext}/>
    </FlexContainer>
  );
};

export default Pagination;
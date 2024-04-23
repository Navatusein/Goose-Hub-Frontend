import {CSSProperties, FC} from "react";
import styles from "./pagination.module.scss";
import {Button, FlexContainer} from "@/shared/ui-kit";
import {AiOutlineEllipsis, AiOutlineLeft, AiOutlineRight} from "react-icons/ai";
import {DOTS, usePagination} from "@/features/pagination/hooks/usePagination.ts";
import useMediaQuery from "@/shared/hooks/use-media-query.ts";

interface IProps {
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
  total: number;
  styles?: CSSProperties;
  className?: string;
}

const Pagination: FC<IProps> = (props) => {

  const sibling = useMediaQuery("(max-width: 460px)");
  const paginationRange = usePagination(props.total, props.currentPage, sibling ? 0 : 1)!;


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
    <FlexContainer className={`${styles.container} ${props.className ?? ""}`} styles={props.styles}>
      <FlexContainer className={styles.buttonsContainer}>
        {paginationRange.map((pageNumber, index) => (
          <div key={index} className={styles.buttonContainer}>
            {pageNumber === DOTS && (
              <div className={styles.button}>
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
      </FlexContainer>
      <FlexContainer className={styles.controlsContainer}>
        <Button icon={<AiOutlineLeft/>} className={`${styles.button} ${styles.flexLeft}`} onClick={onPrevious}/>
        <Button icon={<AiOutlineRight/>} className={`${styles.button} ${styles.flexRight}`} onClick={onNext}/>
      </FlexContainer>
    </FlexContainer>
  );
};

export default Pagination;
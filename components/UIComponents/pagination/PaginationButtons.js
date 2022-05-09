import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./PaginationButtons.module.scss";

const PaginationButtons = ({ totalPages }) => {
  const router = useRouter();
  const [titleId, pageId] = router.query.title;

  // Make page options of all pages with selected={true, false}
  const options = [];
  let tempOption;
  for (let i = 1; i < totalPages + 1; i++) {
    tempOption = (
      <option value={i} key={i}>
        {i.toString()}
      </option>
    );
    options.push(tempOption);
  }

  // When select option changed push the new route
  const selectChangeHandler = (event) => {
    router.push(titleId + "/" + event.target.value);
  };

  return (
    <div className={`${styles.container}`}>
      <div
        className={`${styles.arrowContainer} ${
          +pageId === 1 ? styles.hidden : null
        }`}
      >
        <Link href={`/${titleId}/${+pageId - 1}`}>&larr;</Link>
      </div>
      <div className={`${styles.selectContainer}`}>
        <select
          name="pages"
          onChange={selectChangeHandler}
          defaultValue={+pageId}
        >
          {options}
        </select>
      </div>
      <div className={`${styles.spanContainer}`}>
        <span>/</span>
      </div>
      <div className={`${styles.lastPageButtonContainer}`}>
        <Link href={`/${titleId}/${totalPages}`}>{totalPages.toString()}</Link>
      </div>
      <div
        className={`${styles.arrowContainer} ${
          +pageId === totalPages ? styles.hidden : null
        }`}
      >
        <Link href={`/${titleId}/${+pageId + 1}`}>&rarr;</Link>
      </div>
    </div>
  );
};

export default PaginationButtons;

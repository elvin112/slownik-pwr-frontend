import Link from "next/link";

import styles from "./TitleItem.module.scss";

const TitleItem = ({ children, id }) => {
  return (
    <Link className={`${styles.link}`} href={`${id}`} passHref>
      <div className={`${styles.container}`}>
        <div>
          <a>{children}</a>
        </div>
        <div className={`${styles.badgerContainer}`}>
          <p>133</p>
        </div>
      </div>
    </Link>
  );
};

export default TitleItem;

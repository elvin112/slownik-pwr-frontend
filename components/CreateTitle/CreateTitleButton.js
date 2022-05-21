import Link from "next/link";

import styles from "./CreateTitleButton.module.scss";

const CreateTitleButton = () => {
  return (
    <Link href="/create-title" className={`${styles.link}`} passHref>
      <div className={`${styles.container}`}>
        <a className={`${styles.anchorLink}`}>Create Title</a>
      </div>
    </Link>
  );
};

export default CreateTitleButton;

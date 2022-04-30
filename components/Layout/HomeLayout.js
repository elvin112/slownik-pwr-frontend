import Header from "../HomeComponents/Header/Header";
import ContentContainer from "../HomeComponents/ContentContainer/ContentContainer";
import Sidebar from "../HomeComponents/Sidebar/Sidebar";

import styles from "./HomeLayout.module.scss";

const HomeLayout = ({ children }) => {
  return (
    <div className={`${styles.container}`}>
      <Header />
      <div className={`${styles.subContainer}`}>
        <Sidebar />
        <div className={`${styles.childrenContainer}`}>{children}</div>
      </div>
    </div>
  );
};

export default HomeLayout;

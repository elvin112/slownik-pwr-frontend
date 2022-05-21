import CreateTitleButton from "../CreateTitle/CreateTitleButton";
import Header from "../HomeComponents/Header/Header";
import Sidebar from "../HomeComponents/Sidebar/Sidebar";
import Feedback from "../UIComponents/feedback/Feedback";

import styles from "./HomeLayout.module.scss";

const HomeLayout = ({ children }) => {
  return (
    <>
      <Feedback />
      <div className={`${styles.container}`}>
        <Header />
        <div className={`${styles.subContainer}`}>
          <div className={`${styles.leftContainer}`}>
            <CreateTitleButton />
            <Sidebar />
          </div>
          <div className={`${styles.childrenContainer}`}>{children}</div>
        </div>
      </div>
    </>
  );
};

export default HomeLayout;

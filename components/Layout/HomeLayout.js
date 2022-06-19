import { useState } from "react";

import CreateTitleButton from "../CreateTitle/CreateTitleButton";
import Header from "../HomeComponents/Header/Header";
import Sidebar from "../HomeComponents/Sidebar/Sidebar";
import Feedback from "../UIComponents/feedback/Feedback";

import styles from "./HomeLayout.module.scss";

const HomeLayout = ({ children }) => {
  const [hideSearchResultWindow, setHideSearchResultWindow] = useState(true);

  const bringSearchResultWindowHandler = () => {
    setHideSearchResultWindow(false);
  };

  const closeSearchResultWindowHandler = () => {
    setHideSearchResultWindow(true);
  };

  return (
    <>
      <Feedback />
      <div className={`${styles.container}`}>
        <Header
          hideSearchResultWindow={hideSearchResultWindow}
          onBringSearchResult={bringSearchResultWindowHandler}
          onCloseSearchResult={closeSearchResultWindowHandler}
        />
        <div
          className={`${styles.subContainer}`}
          onClick={() => closeSearchResultWindowHandler()}
        >
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

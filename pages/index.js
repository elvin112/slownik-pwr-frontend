import Header from "../components/HomeComponents/Header/Header";
import Sidebar from "../components/HomeComponents/Sidebar/Sidebar";
import ContentContainer from "../components/HomeComponents/ContentContainer/ContentContainer";

import styles from "./Home.module.scss";
import { lightTheme } from "../constants/theme";

export default function Home() {
  return (
    <div className={`${styles.container}`}>
      <Header />
      <div className={`${styles.subContainer}`}>
        <Sidebar />
        <ContentContainer />
      </div>
    </div>
  );
}

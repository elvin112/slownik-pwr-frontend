import axios from "axios";

import Header from "../components/HomeComponents/Header/Header";
import Sidebar from "../components/HomeComponents/Sidebar/Sidebar";
import ContentContainer from "../components/HomeComponents/ContentContainer/ContentContainer";

import styles from "./Home.module.scss";

export default function Home() {
  return (
    <div className={`${styles.container}`}>
      <Header />
      {/* <div className={`${styles.subContainer}`}>
        <Sidebar />
        <ContentContainer />
      </div> */}
    </div>
  );
}

export async function getStaticProps() {
  try {
    const result = await axios.get(`http://localhost:8080/posts/get-titles`);
    const data = result.data;

    if (result.status !== 200) {
      throw new Error("Couldn't fetch the data");
    }

    return {
      redirect: {
        destination: "/" + data.output[0]._id,
      },
    };
  } catch (err) {
    return {
      notFound: true,
    };
  }
}

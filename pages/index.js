import axios from "axios";
import Head from "next/head";
import { useEffect } from "react";

import Header from "../components/HomeComponents/Header/Header";
import Sidebar from "../components/HomeComponents/Sidebar/Sidebar";
import ContentContainer from "../components/HomeComponents/ContentContainer/ContentContainer";
import HomeLayout from "../components/Layout/HomeLayout";
import ContentDiscoveryContainer from "../components/HomeComponents/ContentDiscoveryContainer/ContentDiscoveryContainer";

import styles from "./Home.module.scss";

export default function Home({ content }) {
  return (
    <>
      <Head>
        <title>SlownikPWR</title>
      </Head>
      <HomeLayout>
        <ContentDiscoveryContainer content={content} paginationExists={false} />
      </HomeLayout>
    </>
  );
}

export async function getStaticProps() {
  try {
    const result = await axios.get(`http://localhost:8080/posts/home`);

    if (result.status !== 200) {
      throw new Error("Couldn't fetch the data");
    }

    // Use this for build
    return {
      props: {
        content: result.data.result,
      },
    };
  } catch (err) {
    return {
      notFound: true,
    };
  }
}

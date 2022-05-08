import Head from "next/head";

import HomeLayout from "../../components/Layout/HomeLayout";
import Signup from "../../components/AuthComponents/Signup";

import styles from "./Signup.module.scss";

const index = () => {
  return (
    <>
      <Head>
        <title>Signup</title>
      </Head>
      <div className={`${styles.container}`}>
        <HomeLayout>
          <Signup />
        </HomeLayout>
      </div>
    </>
  );
};

export default index;

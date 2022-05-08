import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Head from "next/head";

import HomeLayout from "../../components/Layout/HomeLayout";
import Signup from "../../components/AuthComponents/Signup";

import styles from "./Signup.module.scss";

const SignupScreen = () => {
  const router = useRouter();
  const authState = useSelector((state) => state.auth);

  useEffect(() => {
    if (authState.isLoggedIn) {
      router.replace("/");
    }
  }, [authState.isLoggedIn, router]);

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

export default SignupScreen;

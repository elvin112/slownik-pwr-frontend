import { useEffect } from "react";
import { useSelector } from "react-redux";
import Head from "next/head";
import { useRouter } from "next/router";

import HomeLayout from "../../components/Layout/HomeLayout";
import Login from "../../components/AuthComponents/Login";

import styles from "./Login.module.scss";

const LoginScreen = () => {
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
        <title>Login</title>
      </Head>
      <div className={`${styles.container}`}>
        <HomeLayout>
          <Login />
        </HomeLayout>
      </div>
    </>
  );
};

export default LoginScreen;

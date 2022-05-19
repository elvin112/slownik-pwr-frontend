import Head from "next/head";

import { feedbackActions } from "../../store/feedbackSlice";
import HomeLayout from "../../components/Layout/HomeLayout";
import Login from "../../components/AuthComponents/Login";

const LoginScreen = () => {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div>
        <HomeLayout>
          <Login />
        </HomeLayout>
      </div>
    </>
  );
};

export default LoginScreen;

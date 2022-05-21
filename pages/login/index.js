import Head from "next/head";

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

import Head from "next/head";

import HomeLayout from "../../components/Layout/HomeLayout";
import Signup from "../../components/AuthComponents/Signup";

const SignupScreen = () => {
  return (
    <>
      <Head>
        <title>Signup</title>
      </Head>
      <div>
        <HomeLayout>
          <Signup />
        </HomeLayout>
      </div>
    </>
  );
};

export default SignupScreen;

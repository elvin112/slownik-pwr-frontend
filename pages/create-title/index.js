import Head from "next/head";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import { feedbackActions } from "../../store/feedbackSlice";
import HomeLayout from "../../components/Layout/HomeLayout";

const CreateTitleScreen = () => {
  const router = useRouter();
  const authState = useSelector((state) => state.auth);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender((state) => false);
      return;
    }

    if (!authState.isLoggedIn) {
      dispatch(feedbackActions.error("You must login to create new title"));

      setTimeout(() => {
        dispatch(feedbackActions.cleanup());
      }, 5000);

      router.replace("/");
    }
  }, [authState.isLoggedIn, router, dispatch, isFirstRender]);

  return (
    <>
      <Head>
        <title>Create new title</title>
      </Head>
      <HomeLayout></HomeLayout>
    </>
  );
};

export default CreateTitleScreen;

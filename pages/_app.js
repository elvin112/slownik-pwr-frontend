import { useEffect } from "react";
import Head from "next/head";
import { Provider, useSelector, useDispatch } from "react-redux";

import { authActions } from "../store/authSlice";
import { calculateRemainingTime } from "../util/remainingTime";
import "../styles/globals.css";

import store from "../store/index";

// TODO: Handle auto logout

const ProviderWrapper = ({ children }) => {
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // Make initial login with localStorage
  useEffect(() => {
    if (!authState.isLoggedIn) {
      // If expiration time passed
      if (localStorage.getItem("expiresIn")) {
        const expiresIn = new Date(expiresIn);
        const now = new Date(Date.now());

        if (now > expiresIn) {
          return authActions.logout();
        }
      }

      // If there is token and expiresIn records in localStorage
      if (localStorage.getItem("token") && localStorage.getItem("expiresIn")) {
        dispatch(
          authActions.login({
            token: localStorage.getItem("token"),
            expiresIn: localStorage.getItem("expiresIn"),
          })
        );

        // Autologout after expiration time
        const remainingTime = calculateRemainingTime();
        setTimeout(() => {
          dispatch(authActions.logout());
        }, remainingTime);
      }
    }
  }, []);

  return <>{children}</>;
};

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Słownik PWR!</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="Platforma społecznościowa Politechniki Wrocławskiej"
        />
      </Head>
      <Provider store={store}>
        <ProviderWrapper>
          <Component {...pageProps} />
        </ProviderWrapper>
      </Provider>
    </>
  );
}

export default MyApp;

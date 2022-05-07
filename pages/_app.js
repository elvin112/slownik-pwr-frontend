import Head from "next/head";
import { Provider } from "react-redux";
import "../styles/globals.css";

import store from "../store/index";

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
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default MyApp;

import Head from "next/head";
import "../styles/globals.css";

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
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;

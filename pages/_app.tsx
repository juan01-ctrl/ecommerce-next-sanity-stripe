import "../styles/globals.css";
import {Toaster} from 'react-hot-toast'
import type { AppProps } from "next/app";
import { Layout } from "../components";
import { StateContext } from "../context/StateContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StateContext>
      <Layout>
        <>
        <Toaster/>
        <Component {...pageProps} />
        </>
      </Layout>
    </StateContext>
  );
}

export default MyApp;

import Head from "next/head";
import React, { ReactElement } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

type PropTypes={
  children:ReactElement<any, any>
}

const Layout = ({children}:PropTypes) => {
  return (
    <div className="layout">
      <Head>
        <title>NextJs E-commerce</title>
      </Head>
      <header>
        <Navbar/>
      </header>
      <main className="main-container">
        {children}
      </main>
      <footer>
        <Footer/>
      </footer>
    </div>
  );
};

export default Layout;

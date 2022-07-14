import { useEffect, useState } from "react";
import Head from "next/head";

import Header from "../containers/header/Header";
import Footer from "../containers/footer/Footer";
import Body from "../containers/body/Body";
import Navibar from "../containers/navbar/Navbar";
import styles from "../styles/Home.module.css";
import axios from "axios";
import { LanguageContext } from "../components/context/language-context";
export default function Home() {
  useEffect(() => {
    axios
      .get("https://api.hostip.info/country.php")
      .then((res) => {
        switch (res.data) {
          case "SWE":
            return setLanguage("swedish");
          case "DNK":
            return setLanguage("danish");
          default:
            return setLanguage("english");
        }
      })
      .catch((err) => {
        console.log(err);
        setLanguage("english");
      });
  }, []);
  const [cart, setCart] = useState();
  const [language, setLanguage] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const cartHandler = (cart) => {
    setCart(cart);
  };
  const currencySymbol = () => {
    switch (language) {
      case "swedish":
        return "SEK";
      case "english":
        return "€";

      case "danish":
        return "kr";
    }
  };
  const currencyPrice = (eng, swe, dkk) => {
    switch (language) {
      case "swedish":
        return swe;
      case "english":
        return eng;

      case "danish":
        return dkk;
    }
  };
  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        isLoading,
        setIsLoading,
        currencyPrice,
        currencySymbol,
      }}
    >
      <Head>
        <title>DesignFires.com</title>
        <meta property="og:title" content="My page title" key="title" />
        <meta
          name="description"
          content="Fireplace for everyone.Quality and design are always our main priority, and we can provide both
  standard solutions and custom made fireplaces according to your wishes
  and needs."
        ></meta>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <div className="main">
        <Navibar language={setLanguage} />
        <Header />
        <Body cartHandler={cartHandler} />
        <Footer cartHandler={cart} />
      </div>
    </LanguageContext.Provider>
  );
}

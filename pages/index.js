import { useState } from "react";

import Header from "../containers/header/Header";
import Footer from "../containers/footer/Footer";
import Body from "../containers/body/Body";
import Navibar from "../containers/navbar/Navbar";
import styles from "../styles/Home.module.css";
import { LanguageContext } from "../components/context/language-context";
export default function Home() {
  const [cart, setCart] = useState();
  const [language, setLanguage] = useState("english");
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
      <div className="main">
        <Navibar language={setLanguage} />
        <Header />
        <Body cartHandler={cartHandler} />
        <Footer cartHandler={cart} />
      </div>
    </LanguageContext.Provider>
  );
}

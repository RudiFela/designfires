import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/index.css";
import Script from "next/script";
import { useState, useEffect } from "react";
import { LanguageContext } from "../components/context/language-context";
import { CartProvider } from "react-use-cart";
import axios from "axios";
//import "../styles/index.scss";
function MyApp({ Component, pageProps }) {
  const [language, setLanguage] = useState();

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    LanguageChecker();
  }, []);

  const LanguageChecker = async () => {
    const langs = await axios.get("https://ipapi.co/json/"); //("https://api.hostip.info/country.php");
    //console.log(langs.data.country_code);
    // let x = "SE";
    //console.log(x);
    switch (langs.data.country_code) {
      case "SE":
        return setLanguage("swedish");
      case "DK":
        return setLanguage("danish");
      default:
        return setLanguage("english");
    }
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
    <>
      <div className="container">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-UA-238277916-1"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'UA-238277916-1');
        `}
        </Script>
      </div>
      <CartProvider>
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
          <Component {...pageProps} />
        </LanguageContext.Provider>
      </CartProvider>
    </>
  );
}

export default MyApp;

import { useState, useEffect } from "react";
import Head from "next/head";
import Header from "../containers/header/Header";
import Footer from "../containers/footer/Footer";
import Body from "../containers/body/Body";
import Navibar from "../containers/navbar/Navbar";
import axios from "axios";
import { useCart } from "react-use-cart";
import SSRProvider from "react-bootstrap/SSRProvider";
import { LanguageContext } from "../components/context/language-context";
import "../i18n";
export default function Home(props) {
  const [language, setLanguage] = useState();
  useEffect(() => {
    LanguageChecker();
    emptyCart();
  }, []);
  const [cart, setCart] = useState();
  const { emptyCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const cartHandler = (cart) => {
    setCart(cart);
  };

  const LanguageChecker = async () => {
    const langs = await axios.get("https://ipapi.co/json/"); //("https://api.hostip.info/country.php");

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
    <SSRProvider>
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
          <Body
            cartHandler={cartHandler}
            decorations={props.decorations}
            // accessories={props.accessories}
            //casings={props.casings}
            fireplaces={props.fireplaces}
            //boxes={props.boxes}
            // cart={cart}
            fuel={props.fuel}
          />
          <Footer cartHandler={cart} />
        </div>
      </LanguageContext.Provider>
    </SSRProvider>
  );
}
export async function getStaticProps(context) {
  const crud = {
    auth: {
      username: "ck_b143b31c7842e4a628279fe7b097980c311f08d5",
      password: "cs_b2d20befae8f292ec5e96fd4052f85c40ee7480e",
    },
  };
  const decoURL =
    "https://designfires.pl/wp-json/wc/v3/products?category=20&per_page=20&orderby=price&order=desc";
  const casingsURL =
    "https://designfires.pl/wp-json/wc/v3/products?category=23";
  const accessoriesURL =
    "https://designfires.pl/wp-json/wc/v3/products?category=21";
  const fireplacesURL =
    "https://designfires.pl/wp-json/wc/v3/products?category=26";
  const boxesUrl = "https://designfires.pl/wp-json/wc/v3/products?category=30";
  const fuelUrl = "https://designfires.pl/wp-json/wc/v3/products?category=29";
  // ck ck_b143b31c7842e4a628279fe7b097980c311f08d5
  // cs cs_b2d20befae8f292ec5e96fd4052f85c40ee7480e
  //const casingFetch = await axios.get(casingsURL, crud);
  const fireplaceFetch = await axios.get(fireplacesURL, crud);
  //const accessoriesFetch = await axios.get(accessoriesURL, crud);
  const decorations = await axios.get(decoURL, crud);
  //const boxesFetch = await axios.get(boxesUrl, crud);
  const fuelFetch = await axios.get(fuelUrl, crud);

  //const [deco, cases, access, fire, boxes, fuel] = await Promise.all([
  const [deco, fire, fuel] = await Promise.all([
    decorations.data,
    // casingFetch.data,
    //accessoriesFetch.data,
    fireplaceFetch.data,
    //boxesFetch.data,
    fuelFetch.data,
  ]);

  return {
    props: {
      decorations: deco,
      // casings: cases,
      //accessories: access,
      fireplaces: fire,
      // boxes,
      fuel,
      // language: LanguageChecker(),
      //test: accessories,
    },
    revalidate: 3600,
  };
}

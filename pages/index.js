import { useState, useEffect } from "react";
import Head from "next/head";
import Header from "../containers/header/Header";
import Footer from "../containers/footer/Footer";
import Body from "../containers/body/Body";
import Navibar from "../containers/navbar/Navbar";
import axios from "axios";
import SSRProvider from "react-bootstrap/SSRProvider";
import { LanguageContext } from "../components/context/language-context";
export default function Home(props) {
  const [language, setLanguage] = useState(props.language);
  /* useEffect(() => {
    console.log(props);
  }, [language, props]);*/
  const [cart, setCart] = useState();

  const [isLoading, setIsLoading] = useState(false);
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
            accessories={props.accessories}
            casings={props.casings}
            fireplaces={props.fireplaces}
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

  // ck ck_b143b31c7842e4a628279fe7b097980c311f08d5
  // cs cs_b2d20befae8f292ec5e96fd4052f85c40ee7480e
  const casingFetch = await axios.get(casingsURL, crud);
  const fireplaceFetch = await axios.get(fireplacesURL, crud);
  const accessoriesFetch = await axios.get(accessoriesURL, crud);
  const decorations = await axios.get(decoURL, crud);
  const lang = await axios.get("https://api.hostip.info/country.php");

  const LanguageChecker = () => {
    switch (lang.data) {
      case "SWE":
        return "swedish";
      case "DNK":
        return "danish";
      default:
        return "english";
    }
  };

  // console.log(fireplacess);
  const [deco, cases, access, fire] = await Promise.all([
    decorations.data,
    casingFetch.data,
    accessoriesFetch.data,
    fireplaceFetch.data,
  ]);
  //let d;
  //addVariants(cases, crud).then((res) => console.log(res));
  // console.log(d);

  // const casings = await addVariants(casingFetch.data, crud);
  //const accessories = await addVariants(cases, crud);
  //const test = JSON.parse(accessories);
  //console.log(cases[0].variations);
  /* const repos = await axios.get(
    `https://designfires.pl/wp-json/wc/v3/products/${cases[0].id}/variations`,
    crud
  );
  console.log(repos.data);*/
  // console.log(addVariants(cases, crud));
  //console.log(cases);
  //const fireplacess = await addVariants(fireplaceFetch.data, crud);

  return {
    props: {
      decorations: deco,
      casings: cases,
      accessories: access,
      fireplaces: fire,
      language: LanguageChecker(),
      //test: accessories,
    },
  };
}

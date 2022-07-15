import React, { useEffect, useState, lazy, Suspense, useContext } from "react";
import Accessories from "../../components/Accessories/Accessories";
import Decorations from "../../components/Decorations/Decorations";
import Inspired from "../../components/Inspired/Inspired";
import axios from "axios";
//import Customizer from "../../components/Customizer/Customizer";
import Ethanol from "../../components/Ethanol/Ethanol";
import Mystic from "../../components/Mystic/Mystic";
import { useGetProducts } from "../../hooks/add-variants";
import { LanguageContext } from "../../components/context/language-context";
import Customizer from "../../components/Customizer/Customizer";
//const Customizer = lazy(() => import("../../components/Customizer/Customizer"));
const Body = (props) => {
  const [decorationsProducts, setDecorationsProducts] = useState([]);
  const [accessoriesProducts, setAccessoriesProducts] = useState([]);
  const [casingsProducts, setCasingsProducts] = useState([]);
  const [fireplaceProducts, setFireplaceProducts] = useState([]);
  const [lowestPriceDFM, setLowestPriceDFM] = useState("3066");
  const [lowestPriceDFE, setLowestPriceDFE] = useState("2000");
  const [variantAdded, setVariantAdded] = useState(false);
  const { setIsLoading, isLoading, lang, language } =
    useContext(LanguageContext);
  const { addVariants, minimalFireplacePrice } = useGetProducts();
  useEffect(() => {
    getData();
    setVariantAdded(true);
    //takePrice();
  }, []);
  useEffect(() => {
    if (variantAdded) {
      takePrice();
    }
  }, [language, variantAdded]);
  //const handleLoading = () => setIsLoading(true);

  const getData = async () => {
    setDecorationsProducts(props.decorations.reverse());
    setAccessoriesProducts(addVariants(props.accessories));
    setFireplaceProducts(addVariants(props.fireplaces));
    setCasingsProducts(addVariants(props.casings));
    setIsLoading(false);
  };
  /* const getData = async () => {
    // ck ck_b143b31c7842e4a628279fe7b097980c311f08d5
    // cs cs_b2d20befae8f292ec5e96fd4052f85c40ee7480e
    axios
      .all([
        axios.get(deco, crud),
        axios.get(casing, crud),
        axios.get(accessories, crud),
        axios.get(fireplaces, crud),
      ])

      .then(
        axios.spread((...responses) => {
          setDecorationsProducts(responses[0].data.reverse());
          setAccessoriesProducts(addVariants(responses[2].data));
          setFireplaceProducts(addVariants(responses[3].data));
          setCasingsProducts(addVariants(responses[1].data));

          console.log(addVariants(responses[3].data));
          //console.log(addVariants(responses[3].data));
          //console.log(addVariants(responses[1].data));
          console.log(responses[0].data);

          //console.log(fireplaceProducts);
          //firstTakePrice(addVariants(responses[3].data));

          setIsLoading(false);
          //setVariantAdded(true);
        })
      )
      .catch((error) => {
        console.log("An error!!!!", error);
        setIsLoading(false);
      });
  }; //SetEnv HTTPS on*/
  const currencyPrice = (item) => {
    switch (language) {
      case "swedish":
        return item.SEK_price.value;
      case "english":
        return item.price;

      case "danish":
        return item.DKK_price.value;
    }
  };

  const takePrice = () => {
    !isLoading
      ? setLowestPriceDFM(
          currencyPrice(
            fireplaceProducts[0].variant.find((item) => item.length === "500")
          )
        )
      : null;

    !isLoading
      ? setLowestPriceDFE(
          currencyPrice(
            // fireplaceProducts[1].variant.find((item) => item.length === "500")
            fireplaceProducts[1].variant.find((item) => item.length === "500")
          )
        )
      : null;
    /*  return currencyPrice(
      fireplaceProducts[0].variant.find((item) => item.length === "500")
    );*/
  };
  return (
    <div>
      <Ethanol price={!isLoading && lowestPriceDFE} />
      <Mystic price={!isLoading && lowestPriceDFM} />
      <Accessories />
      <Decorations decorations={props.decorations} />

      <Inspired />
      <div>
        <Customizer
          decorations={decorationsProducts} //{props.decorations} //{decorationsProducts} />
          accessories={accessoriesProducts} //{props.accessories} //
          casings={casingsProducts} //{props.casings} //
          fireplace={fireplaceProducts} //{props.fireplaces} //
          cartHandler={props.cartHandler}
        />
      </div>
    </div>
  );
};
export default Body;

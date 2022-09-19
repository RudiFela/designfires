import React, { useEffect, useState, useContext } from "react";
import Accessories from "../../components/Accessories/Accessories";
import Decorations from "../../components/Decorations/Decorations";
import Inspired from "../../components/Inspired/Inspired";
import Ethanol from "../../components/Ethanol/Ethanol";
import Mystic from "../../components/Mystic/Mystic";
import { LanguageContext } from "../../components/context/language-context";
import Customizer from "../../components/Customizer/Customizer";
import BioFuel from "../../components/BioFuel/BioFuel";
import ServiceSection from "../../components/ServiceSection/ServiceSection";

const Body = (props) => {
  const [lowestPriceDFM, setLowestPriceDFM] = useState();
  const [lowestPriceDFE, setLowestPriceDFE] = useState();
  const { language } = useContext(LanguageContext);
  useEffect(() => {
    takePrice();
  }, [language]);
  const currencyPrice = (item) => {
    switch (language) {
      case "english":
        return item.price;
      case "swedish":
        return item.SEK_price;

      case "danish":
        return item.DKK_price;
    }
  };

  const takePrice = () => {
    setLowestPriceDFM(
      currencyPrice(
        props.fireplaces[0].variant.find((item) => item.length.option === "500")
      )
    );
    setLowestPriceDFE(
      currencyPrice(
        props.fireplaces[1].variant.find((item) => item.length.option === "500")
      )
    );
  };
  return (
    <>
      <Ethanol price={lowestPriceDFE} />
      <Mystic price={lowestPriceDFM} />
      <Accessories />
      <Decorations decorations={props.decorations} />

      <Inspired />

      <Customizer
        decorations={props.decorations}
        accessories={props.accessories}
        casings={props.casings}
        fireplace={props.fireplaces}
        cartHandler={props.cartHandler}
      />
    </>
  );
};
export default Body;

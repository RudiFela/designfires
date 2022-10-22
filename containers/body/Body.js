import React, { useEffect, useState, useContext } from "react";
import Accessories from "../../components/Accessories/Accessories";
import Decorations from "../../components/Decorations/Decorations";
import Inspired from "../../components/Inspired/Inspired";
import Ethanol from "../../components/Ethanol/Ethanol";
import Mystic from "../../components/Mystic/Mystic";
import { LanguageContext } from "../../components/context/language-context";
import Customizer from "../../components/Customizer/Customizer";
import BioFuel from "../../components/BioFuel/BioFuel";
import MotionSlider from "../../components/UI/Slider/MotionSlider";

const Body = (props) => {
  const [lowestPriceDFM, setLowestPriceDFM] = useState();
  const [lowestPriceDFE, setLowestPriceDFE] = useState();
  const { language } = useContext(LanguageContext);
  useEffect(() => {
    takePrice();

    //console.log(props.casings);
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

      <Inspired />
      <Decorations decorations={props.decorations} />
      <Customizer
        decorations={props.decorations}
        accessories={props.accessories}
        casings={props.casings}
        fireplace={props.fireplaces}
        cartHandler={props.cartHandler}
        boxes={props.boxes}
      />
      <MotionSlider />
      <BioFuel
        decorations={props.decorations}
        cart={props.cart}
        cartHandler={props.cartHandler}
      />
    </>
  );
};
export default Body;

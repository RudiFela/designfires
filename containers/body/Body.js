import React, { useEffect, useState, useContext } from "react";
import { Button, Container } from "react-bootstrap";
import NewCustomizer from "../../components/NewCustomizer/NewCustomizer";
import Decorations from "../../components/Decorations/Decorations";
import Inspired from "../../components/Inspired/Inspired";
import Ethanol from "../../components/Ethanol/Ethanol";
import Mystic from "../../components/Mystic/Mystic";
import { LanguageContext } from "../../components/context/language-context";

import BioFuel from "../../components/BioFuel/BioFuel";
import MotionSlider from "../../components/UI/Slider/MotionSlider";
import { ImArrowRight2 } from "react-icons/im";

import AnimateWrapper from "../../components/NewCustomizer/AnimateWrapper";

const Body = (props) => {
  const [lowestPriceDFM, setLowestPriceDFM] = useState();
  const [lowestPriceDFE, setLowestPriceDFE] = useState();
  const [customizer, setCustomizer] = useState(false);
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
      <AnimateWrapper>
        <div className="w-100 bg-danger p-3 fst-italic">
          <h1
            id="customize"
            className="text-center text-white p-4 mt-3 fw-bold"
          >
            Fireplace of Your dreams with our Customizer Tool!
          </h1>
        </div>
        {customizer ? (
          <NewCustomizer
            fireplace={props.fireplaces}
            // glass={props.accessories}
            //furnitureBox={props.boxes}
            // casings={props.casings}
            fuelProducts={props.fuel}
            accessories={props.decorations}
          />
        ) : (
          <AnimateWrapper>
            {" "}
            <Container className="mt-4">
              <div
                className="bg-success px-3 py-1 text-white newcustomizer-body position-relative"
                style={{
                  height: "600px",
                  overflowY: "scroll",
                }}
              >
                <Button
                  variant="info"
                  className="fw-bold position-absolute bottom-0 end-0 m-3"
                  onClick={() => setCustomizer(true)}
                >
                  <span>START NOW </span>
                  <ImArrowRight2 className="mb-1 fw-bold" />
                </Button>
              </div>{" "}
            </Container>
          </AnimateWrapper>
        )}{" "}
      </AnimateWrapper>
      <MotionSlider />
      <BioFuel
        fuel={props.fuel}
        cart={props.cart}
        cartHandler={props.cartHandler}
      />
    </>
  );
};
export default Body;
/*
 <Customizer
        decorations={props.decorations}
        accessories={props.accessories}
        casings={props.casings}
        fireplace={props.fireplaces}
        cartHandler={props.cartHandler}
        boxes={props.boxes}
      />
*/

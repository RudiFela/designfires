import { useState, useEffect, useRef, useContext } from "react";
import { useCart } from "react-use-cart";
import { useCartCurrency } from "../../hooks/useCartCurrency";
import { LanguageContext } from "../context/language-context";
import AccessoriesPick from "./AccessoriesPick";
import OptionsPick from "./OptionsPick";
import TypePick from "./TypePick";
import MountPick from "./MountPick";
import Summary from "./Summary";
import { FiShoppingCart } from "react-icons/fi";
import { Button, Container, Badge } from "react-bootstrap";
import LanguageSwitcher from "../UI/LanguageSwitcher/LanguageSwitcher";
import Contact from "./Contact";
import CustomizerHeader from "../UI/CustomizerHeader";
const NewCustomizer = (props) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [fireplaceType, setFireplaceType] = useState();
  const [pickedLength, setPickedLength] = useState();
  const [nextStepAllow, setNextStepAllow] = useState(false);
  const [customFireplace, setCustomFireplace] = useState();
  const [cartTotals, setCartTotals] = useState(0);

  useEffect(() => {
    // console.log(props.furnitureBox);
    //setCartTotal(countCartCurrency(items));
    //console.log("useEffect");
    setCartTotals(countCartCurrency(items));
  }, [currentStep, nextStepAllow]);
  const lang = useContext(LanguageContext);
  const { items } = useCart();
  const { countCartCurrency, deleteCart } = useCartCurrency();
  const onSubmit = useRef(null);
  const onTypePick = (item) => {
    setFireplaceType(item);
    setCurrentStep(currentStep + 1);
    //console.log(id);
  };
  const onLengthPick = (length) => {
    setPickedLength(length);
  };
  const customVariant = (custom) => {
    setCustomFireplace(custom);
  };
  const nextStep = () => {
    onSubmit.current();
    // console.log(onSubmit.current);
    setNextStepAllow(false);
    setCurrentStep(currentStep + 1);
  };
  const backStep = () => {
    setNextStepAllow(false);
    setCurrentStep(currentStep - 1);
  };
  const onNextStepAllow = () => {
    setNextStepAllow(true);
  };
  const displayStep = (step) => {
    switch (step) {
      case 1:
        return (
          <TypePick onTypePick={onTypePick} fireplaceItems={props.fireplace} />
        );

      case 2:
        return (
          <OptionsPick
            fireplaceType={fireplaceType}
            fireplaceItems={props.fireplace}
            //  nextStep={nextStep}
            //  backStep={backStep}
            onLengthPick={onLengthPick}
            allowNextStep={onNextStepAllow}
            onSubmit={onSubmit}
            customVariant={customVariant}
          />
        );
      case 3:
        return (
          <MountPick
            // nextStep={nextStep}
            //backStep={backStep}
            pickedLength={pickedLength}
            glass={props.glass}
            furnitureBox={
              fireplaceType.name === "DFM"
                ? props.furnitureBox[0]
                : props.furnitureBox[1]
            }
            casings={props.casings}
            onSubmit={onSubmit}
            allowNextStep={onNextStepAllow}
            customFireplace={customFireplace}
          />
        );
      case 4:
        return (
          <AccessoriesPick
            accessories={props.accessories}
            //nextStep={nextStep}
            //backStep={backStep}
            onSubmit={onSubmit}
            allowNextStep={onNextStepAllow}
          />
        );
      case 5:
        return <Summary allowNextStep={onNextStepAllow} />;
      case 6:
        return (
          <div className="text-black">
            <CustomizerHeader>Send Your Choices To Us</CustomizerHeader>
            <Contact />
          </div>
        );
    }
  };
  return (
    <>
      <div className="w-100 bg-danger p-3 fst-italic">
        <h1 id="customize" className="text-center text-white p-4 mt-3 ">
          Check possibilities on Your own!
        </h1>
      </div>
      <Container className="mt-4">
        <div
          className="bg-success p-3 text-white new-customizer-body"
          style={{
            height: "600px",
            overflowY: "scroll",
          }}
        >
          {displayStep(currentStep)}
        </div>
        <div
          className="p-3 bg-danger d-flex flex-row justify-content-end flex-wrap"
          style={{
            // height: "90px",
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
          }}
        >
          {currentStep > 1 && (
            <span className="p-2 me-auto">
              <Button variant="success" onClick={() => backStep()}>
                Back
              </Button>
            </span>
          )}{" "}
          <span className="">
            <LanguageSwitcher />
          </span>{" "}
          <span className="p-2">
            <Button className="fw-bold" disabled={true}>
              <FiShoppingCart className="mx-2 p-0" />
              {lang.currencyPrice(
                cartTotals.price,
                cartTotals.SEK_price,
                cartTotals.DKK_price
              )}
              <span> </span>
              {lang.currencySymbol()}
            </Button>
          </span>
          <span className="p-2">
            <Button
              className=" "
              variant={nextStepAllow ? "info" : "primary"}
              disabled={!nextStepAllow}
              onClick={() => nextStep()} //nextStep()
            >
              {currentStep === 5 ? "Finish" : "NEXT"}
            </Button>
          </span>
        </div>
      </Container>
    </>
  );
};
export default NewCustomizer;
/*  
<Button onClick={() => console.log(items)}>Show Cart</Button>
      <Button onClick={() => deleteCart()}>Delete Cart</Button>
    
*/

import { useState, useEffect, useRef, useContext, React } from "react";
import { useCart } from "react-use-cart";
import { useCartCurrency } from "../../hooks/useCartCurrency";
import { LanguageContext } from "../context/language-context";
import AccessoriesPick from "./AccessoriesPick";
import OptionsPick from "./OptionsPick";
import TypePick from "./TypePick";
import MountPick from "./MountPick";
import Summary from "./Summary";
import { FiShoppingCart } from "react-icons/fi";
import { Button, Container, Badge, Spinner } from "react-bootstrap";
import LanguageSwitcher from "../UI/LanguageSwitcher/LanguageSwitcher";
import Contact from "./Contact";
import CustomizerHeader from "../UI/CustomizerHeader";
import dynamic from "next/dynamic";
import AnimateWrapper from "./AnimateWrapper";
import axios from "axios";
import EthanolFuel from "./EthanolFuel";

///dimport PdfTemplate from "./PdfTemplate";
//const MyDoc = <PdfTemplate />;
const NewCustomizer = (props) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [fireplaceType, setFireplaceType] = useState();
  const [pickedLength, setPickedLength] = useState();
  const [nextStepAllow, setNextStepAllow] = useState(false);
  const [customFireplace, setCustomFireplace] = useState();
  const [cartTotals, setCartTotals] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [furnitureBoxes, setFurnitureBoxes] = useState();
  const [casings, setCasings] = useState();
  const [glass, setGlass] = useState();
  const [fireplacePcs, setFireplacePcs] = useState(1);
  // const [pdf, setPdf] = usePDF({ document: MyDoc });
  const OrderRef = useRef();
  useEffect(() => {
    // console.log(props.furnitureBox);

    //!isEmpty &&
    //console.log(props.fireplace);
    setCartTotals(countCartCurrency(items));
  }, [currentStep, nextStepAllow]);
  useEffect(() => {
    isLoading && getProducts();
    //console.log("useEffect");
  }, []);
  const getProducts = async () => {
    // console.log(process.env);
    const crud = {
      auth: {
        username: "ck_b143b31c7842e4a628279fe7b097980c311f08d5", //process.env.NEXT_PUBLIC_WORDPRESS_U,
        password: "cs_b2d20befae8f292ec5e96fd4052f85c40ee7480e", //process.env.NEXT_PUBLIC_WORDPRESS_P,
      },
    };

    const casingsURL =
      "https://designfires.pl/wp-json/wc/v3/products?category=23";
    const accessoriesURL =
      "https://designfires.pl/wp-json/wc/v3/products?category=21";
    // const fireplacesURL =
    //  "https://designfires.pl/wp-json/wc/v3/products?category=26";
    const boxesUrl =
      "https://designfires.pl/wp-json/wc/v3/products?category=30";

    // ck ck_b143b31c7842e4a628279fe7b097980c311f08d5
    // cs cs_b2d20befae8f292ec5e96fd4052f85c40ee7480e
    const casingFetch = await axios.get(casingsURL, crud);
    //const fireplaceFetch = await axios.get(fireplacesURL, crud);
    const accessoriesFetch = await axios.get(accessoriesURL, crud);

    const boxesFetch = await axios.get(boxesUrl, crud);
    setFurnitureBoxes(boxesFetch.data);
    setCasings(casingFetch.data);
    setGlass(accessoriesFetch.data);
    setIsLoading(false);
    // console.log(accessoriesFetch);
    // console.log(props.fuel);
  };
  const lang = useContext(LanguageContext);
  const { items } = useCart();
  const { countCartCurrency } = useCartCurrency();
  const onSubmit = useRef(null);
  const onTypePick = (item) => {
    setFireplaceType(item);
    setCurrentStep(currentStep + 1);
    //console.log(id);
  };
  const DownloadPdf = dynamic(() => import("./DownloadPdf"), {
    ssr: false,
  });
  const onFireplacePcs = (choice) => {
    choice
      ? setFireplacePcs(fireplacePcs + 1)
      : setFireplacePcs(fireplacePcs - 1);
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
    if (currentStep === 1) {
      //jesli wybieramy opcje i wybierzemy DFE
      fireplaceType.name === "DFE"
        ? setCurrentStep(currentStep + 1)
        : setCurrentStep(currentStep + 2);
    } else {
      setCurrentStep(currentStep + 1);
    }
    setNextStepAllow(false);
  };
  const backStep = () => {
    if (currentStep === 3) {
      fireplaceType.name === "DFE"
        ? setCurrentStep(currentStep - 1)
        : setCurrentStep(currentStep - 2);
    } else {
      setCurrentStep(currentStep - 1);
    }
    setNextStepAllow(false);
  };
  const onNextStepAllow = () => {
    setNextStepAllow(true);
  };
  const displayStep = (step) => {
    switch (step) {
      case 0:
        return (
          <TypePick onTypePick={onTypePick} fireplaceItems={props.fireplace} />
        );

      case 1:
        return (
          <AnimateWrapper>
            <OptionsPick
              fireplaceType={fireplaceType}
              fireplaceItems={props.fireplace}
              //  nextStep={nextStep}
              //  backStep={backStep}
              onLengthPick={onLengthPick}
              allowNextStep={onNextStepAllow}
              onSubmit={onSubmit}
              customVariant={customVariant}
              onFireplacePcs={onFireplacePcs}
              fireplacePcs={fireplacePcs}
            />
          </AnimateWrapper>
        );
      case 2:
        return (
          <EthanolFuel
            fuelProducts={props.fuelProducts}
            allowNextStep={onNextStepAllow}
            onSubmit={onSubmit}
          />
        );
      case 3:
        return (
          <MountPick
            // nextStep={nextStep}
            //backStep={backStep}
            pickedLength={pickedLength}
            glass={glass}
            furnitureBox={
              fireplaceType.name === "DFM"
                ? furnitureBoxes[0]
                : furnitureBoxes[1]
            }
            casings={casings}
            onSubmit={onSubmit}
            allowNextStep={onNextStepAllow}
            customFireplace={customFireplace}
            fireplacePcs={fireplacePcs}
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
        return <Summary allowNextStep={onNextStepAllow} ref={OrderRef} />;
      case 6:
        return (
          <>
            <div className="text-black">
              <CustomizerHeader>Send Your Choices To Us</CustomizerHeader>
              <Contact />{" "}
            </div>
            <Summary />
          </>
        );
    }
  };
  return (
    <>
      <Container className="mt-4">
        <div
          className="bg-success px-3 py-1 text-white new-customizer-body"
          style={{
            height: "600px",
            overflowY: "scroll",
          }}
        >
          {!isLoading ? (
            displayStep(currentStep)
          ) : (
            <div className="position-relative w-100 h-100 ">
              <div className="position-absolute top-50 start-50">
                <Spinner className="p-3" animation="border" variant="info" />
                <p className="text-center fw-bold">Loading...</p>
              </div>
            </div>
          )}
        </div>
        <div
          className="p-3 bg-danger d-flex flex-row justify-content-end flex-wrap"
          style={{
            // height: "90px",
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
          }}
        >
          {currentStep > 0 && (
            <span className="p-2 me-auto">
              <Button variant="success" onClick={() => backStep()}>
                Back
              </Button>
            </span>
          )}{" "}
          <span className="p-2">
            {" "}
            {currentStep >= 5 && (
              <DownloadPdf
                products={items}
                currency={lang.currencySymbol()}
                totalPrice={cartTotals}
              />
            )}
          </span>
          <span className="">
            <LanguageSwitcher />
          </span>{" "}
          <span className="p-2">
            {currentStep > 0 && (
              <Button className="fw-bold" disabled={true}>
                <FiShoppingCart className="mx-2 p-0" />
                {lang
                  .currencyPrice(
                    cartTotals.price,
                    cartTotals.SEK_price,
                    cartTotals.DKK_price
                  )
                  .toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}
                <span> </span>
                {lang.currencySymbol()}
              </Button>
            )}
          </span>
          <span className="p-2">
            {currentStep > 0 && currentStep < 6 && (
              <Button
                className="fw-bold"
                variant={nextStepAllow ? "info" : "primary"}
                disabled={!nextStepAllow}
                onClick={() => nextStep()} //nextStep()
              >
                {currentStep === 5 ? "Finish" : "NEXT"}
              </Button>
            )}{" "}
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

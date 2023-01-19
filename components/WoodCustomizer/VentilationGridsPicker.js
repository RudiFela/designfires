import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "react-use-cart";
import { useEffect, useState } from "react";
import { Row, Col, Badge, Button } from "react-bootstrap";
import Summary from "../NewCustomizer/Summary";
import ListVentilationGridVariants from "./ListVentilationGridVariants";
import CustomizerHeader from "../UI/CustomizerHeader";
import ContactForm from "../NewCustomizer/Contact";
const VentilationGridsPicker = (props) => {
  const [currentStep, setCurrentStep] = useState(0);
  useEffect(() => {
    console.log(props.ventilationGrids);
  }, []);
  const { addItem } = useCart();
  const nextStep = () => {
    // onSubmit.current();
    // console.log(onSubmit.current);
    //setNextStepAllow(false);
    if (currentStep === 1) {
      addItem({ ...props.item, img: props.item.images[0].shop_thumbnail });
    }
    setCurrentStep(currentStep + 1);
  };
  const backStep = () => {
    //setNextStepAllow(false);
    setCurrentStep(currentStep - 1);
  };
  const displayStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              // transition={{ duration: 0.5 }}
              exit={{ opacity: 0 }}
            >
              <CustomizerHeader>Pick Inlet Grid</CustomizerHeader>
              <Row>
                {props.ventilationGrids.map((item) => (
                  <ListVentilationGridVariants
                    name={item.name}
                    itemToList={item.variant}
                    grid={props.item.acf.inlet_grids}
                    onPick={nextStep}
                  />
                ))}
              </Row>
            </motion.div>
          </AnimatePresence>
        );
      case 1:
        return (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              // transition={{ duration: 0.5 }}
              exit={{ opacity: 0 }}
            >
              <CustomizerHeader>Pick Outlet Grid</CustomizerHeader>
              <Row>
                {props.ventilationGrids.map((item) => (
                  <ListVentilationGridVariants
                    name={item.name}
                    itemToList={item.variant}
                    grid={props.item.acf.outlet_grids}
                    onPick={nextStep}
                  />
                ))}
              </Row>
            </motion.div>
          </AnimatePresence>
        );
      case 2:
        return (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              // transition={{ duration: 0.5 }}
              exit={{ opacity: 0 }}
            >
              <Row>
                <Summary allowNextStep={console.log}>
                  {" "}
                  <Button
                    className=" float-end"
                    variant="info"
                    // disabled={!nextStepAllow}
                    onClick={() => nextStep()} //nextStep()
                  >
                    Next
                  </Button>
                </Summary>
              </Row>
            </motion.div>
          </AnimatePresence>
        );
      case 3:
        return (
          <div className="text-black">
            <CustomizerHeader>Send Your Choices To Us</CustomizerHeader>
            <ContactForm />
          </div>
        );
    }
  };

  return (
    <div className="mt-3">
      <h2 className="text-center p-3">Recommended Ventilation Grids</h2>
      <div
        className="text-white bg-success p-3 borderr"
        style={{
          height: "600px",
          overflowY: "scroll",
          overflowX: "hidden",
          //borderTopLeftRadius: 15,
          // borderTopRightRadius: 15,
        }}
      >
        {displayStep()}
      </div>
    </div>
  );
};
export default VentilationGridsPicker;
/* <span className="p-2 me-auto">
          <Button variant="success"onClick={}>Back</Button>
        </span> <div
        className="p-1 bg-danger d-flex flex-row justify-content-end flex-wrap"
        style={{
          // height: "90px",
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15,
        }}
      >
        <span className="p-2">
          <Button
            className=" "
            //variant={nextStepAllow ? "info" : "primary"}
            // disabled={!nextStepAllow}
            // onClick={() => nextStep()} //nextStep()
          >
            Next
          </Button>
        </span>
      </div>*/

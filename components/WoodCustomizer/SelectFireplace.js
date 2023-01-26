import React, { useState } from "react";
import { useCart } from "react-use-cart";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "react-bootstrap";
import CustomizerHeader from "../UI/CustomizerHeader";
import ContactForm from "../NewCustomizer/Contact";
import Summary from "../NewCustomizer/Summary";

function SelectFireplace(props) {
  const [showOrder, setShowOrder] = useState(false);
  const { addItem } = useCart();
  const onSelect = () => {
    addItem({ ...props.item, img: props.item.images[0].shop_thumbnail });
    setShowOrder(true);
  };
  return (
    <div>
      {showOrder ? (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-white bg-success p-3 borderr new-customizer-body"
            style={{
              height: "600px",
              overflowY: "scroll",
              overflowX: "hidden",
              //borderTopLeftRadius: 15,
              // borderTopRightRadius: 15,
            }}
          >
            <div className="text-black">
              <CustomizerHeader>Send Your Choices To Us</CustomizerHeader>
              <ContactForm />
              <span className="text-white">
                <Summary allowNextStep={console.log} />
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      ) : (
        <div className="text-center">
          <Button className="fs-4 fw-bold" onClick={() => onSelect()}>
            Select
          </Button>
        </div>
      )}
    </div>
  );
}

export default SelectFireplace;

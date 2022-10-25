import { useState, useContext } from "react";
import CustomizerCard from "./CustomizerCard";
import Image from "next/image";
import { LanguageContext } from "../context/language-context";
import { SwatchesPicker } from "react-color";
import { Stack, Button, OverlayTrigger, Popover } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import colorPalete from "../UI/colors";
import PopoverComponent from "../UI/Popover";
import DeleteButton from "../UI/DeleteButton";
const FurnitureBox = (props) => {
  const [showColorPalete, setShowColorPalete] = useState(false);
  const lang = useContext(LanguageContext);

  const popover = (
    <Popover id="popover-basic">
      <Popover.Body>
        <PopoverComponent
          info={[
            { name: "Length", value: Number(props.item.length) + 100 },
            { name: "Width", value: "350" },
            { name: "Heigth", value: "500" },
          ]}
        ></PopoverComponent>
      </Popover.Body>
    </Popover>
  );
  const resetFurniture = () => {
    props.reset();
    setShowColorPalete(false);
  };
  return (
    <CustomizerCard
      title="Select Furniture Box"
      //photo={furnitureBox.image}
      image={
        <div className="product">
          <Image
            alt="FurnitureBox"
            layout="fill"
            className="img-1"
            src="https://designfires.pl/wp-content/uploads/2022/10/FurnitureBox1.png"
          />
          <Image
            alt="FurnitureBox"
            layout="fill"
            className="img-2"
            src="https://designfires.pl/wp-content/uploads/2022/10/FurnitureBox2.png"
          />
          <div
            className="color"
            style={{ backgroundColor: `${props.color}` }}
          ></div>
        </div>
      }
    >
      {" "}
      <Stack className="mx-auto " direction="horizontal" gap={1}>
        <Button
          variant="info"
          onClick={props.onConfirm}
          disabled={props.disabled}
        >
          ADD
        </Button>
        <Button variant="primary" className="fw-bold">
          {lang.currencyPrice(
            props.item.priceEUR,
            props.item.priceSEK,
            props.item.priceDKK
          )}
          <span> </span>
          {lang.currencySymbol()}
        </Button>
        <OverlayTrigger
          trigger="click"
          placement="bottom"
          overlay={popover}
          //delay={{ show: 250, hide: 1600 }}
          rootClose
        >
          <Button variant="primary">Technical Info</Button>
        </OverlayTrigger>
        <Button
          onClick={() => setShowColorPalete(!showColorPalete)}
          variant="info"
        >
          Color:
        </Button>
        <div
          className=""
          onClick={() => setShowColorPalete(!showColorPalete)}
          style={{
            width: "35px",
            height: "35px",
            backgroundColor: `${props.color}`,
            borderRadius: "10px",
            border: "solid 1px",
          }}
        ></div>
        <DeleteButton reset={resetFurniture} />
      </Stack>
      {showColorPalete && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <SwatchesPicker
              className="py-3 m-0 text-center"
              onChange={(color) => {
                props.onColorPick(color);
              }}
              colors={colorPalete}
              width={300}
            />
          </motion.div>
        </AnimatePresence>
      )}
    </CustomizerCard>
  );
};
export default FurnitureBox;

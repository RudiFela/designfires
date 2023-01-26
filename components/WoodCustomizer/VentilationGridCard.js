import { Row, Col, Ratio, Badge, Stack, Button } from "react-bootstrap";
import { useContext, useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "react-use-cart";
import { LanguageContext } from "../context/language-context";
import Image from "next/image";
const VentilationGridCard = (props) => {
  const [color, setColor] = useState("BLACK");
  const { addItem } = useCart();
  const lang = useContext(LanguageContext);
  const { variant } = props;
  const onPick = () => {
    addItem(
      {
        ...variant,
        name: `${props.name} / ${variant.dimensions.length} / ${color}`,
      },
      props.splited ? 4 : 2
    );
    props.onPick();
  };

  return (
    <div className="bg-danger borderr my-2">
      <h3 className="text-center pt-2">
        <Badge>
          {props.name} / {variant.dimensions.length}
        </Badge>
      </h3>
      <Ratio aspectRatio="4x3">
        <Image src={variant.img} layout="fill" alt="ventilation grid Photo" />
      </Ratio>
      <Row className="p-4 ">
        <Col className="text-center m-1">
          <Stack gap={1}>
            <Badge>Length: {variant.dimensions.length} cm</Badge>
            <Badge>Height: {variant.dimensions.height} cm</Badge>{" "}
            <Badge>Field: {variant.holesize} cm2</Badge>
          </Stack>
        </Col>

        <Col className="d-flex justify-content-center m-1">
          <Row>
            <motion.div
              id="BLACK"
              whileTap={{ scale: 0.7 }}
              onClick={() => setColor("BLACK")}
              className={`${
                document.getElementById("BLACK") !== null &&
                document.getElementById("BLACK").id === color
                  ? "border border-3 border-warning"
                  : ""
              } bg-black m-1`}
              //className="bg-black m-1"
              style={{ width: "35px", height: "35px", borderRadius: 35 }}
            ></motion.div>
            <motion.div
              id="WHITE"
              whileTap={{ scale: 0.7 }}
              onClick={() => setColor("WHITE")}
              className={`${
                document.getElementById("WHITE") !== null &&
                document.getElementById("WHITE").id === color
                  ? "border border-3 border-warning"
                  : ""
              } bg-white m-1`}
              // className="bg-black m-1"
              style={{ width: "35px", height: "35px", borderRadius: 35 }}
            ></motion.div>
          </Row>
        </Col>
        <Col className="text-center m-1">
          <div>
            <Badge bg="info" className="fs-5">
              {lang.currencyPrice(
                variant.price,
                variant.SEK_price,
                variant.DKK_price
              )}
              <span> </span>
              {lang.currencySymbol()}
            </Badge>
          </div>
        </Col>
        <Col className="text-center">
          {" "}
          <Button
            onClick={() => onPick()}
            variant="success"
            className="fw-bold"
          >
            Select
          </Button>
        </Col>
      </Row>
    </div>
  );
};
export default VentilationGridCard;

import { Row, Col, Ratio, Badge } from "react-bootstrap";
import { useContext } from "react";
import { motion } from "framer-motion";
import { useCart } from "react-use-cart";
import { LanguageContext } from "../context/language-context";
import Image from "next/image";
const VentilationGridCard = (props) => {
  const { addItem } = useCart();
  const lang = useContext(LanguageContext);
  const { variant } = props;
  const onPick = () => {
    addItem({
      ...variant,
      name: `${props.name} / ${variant.dimensions.length}`,
    });
    props.onPick();
    console.log("picked");
  };
  return (
    <motion.div
      whileTap={{ scale: 0.9 }}
      onClick={() => onPick()}
      className="bg-danger borderr my-2"
    >
      <h3 className="text-center pt-2">
        <Badge>
          {props.name} / {variant.dimensions.length}
        </Badge>
      </h3>
      <Ratio aspectRatio="4x3">
        <Image src={variant.img} layout="fill" alt="ventilation grid Photo" />
      </Ratio>
      <Row className="p-4">
        <Col>
          <Badge>Length: {variant.dimensions.length} mm</Badge>
        </Col>
        <Col>
          <Badge>Height: {variant.dimensions.height} mm</Badge>
        </Col>
        <Col>
          <Badge>Field: {variant.holesize} mm2</Badge>
        </Col>
        <Col>
          <Badge bg="info">
            {lang.currencyPrice(
              variant.price,
              variant.SEK_price,
              variant.DKK_price
            )}
            <span> </span>
            {lang.currencySymbol()}
          </Badge>
        </Col>
      </Row>
    </motion.div>
  );
};
export default VentilationGridCard;

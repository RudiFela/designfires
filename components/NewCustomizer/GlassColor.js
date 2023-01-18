import { useEffect, useState } from "react";
import { Ratio, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
const GlassColor = (props) => {
  const glassProducts = props.glass.filter((item) => item.variant.length > 0);
  const onPick = (item) => {
    const findLongGlass = item.variant.find(
      (variant) => variant.length.option === props.pickedLength
    );
    const findShortGlass = item.variant.find(
      (variant) => variant.length.option === "300"
    );
    // 2 long 2 short glass add

    const selectedGlass = {
      long: findLongGlass,
      longPcs: props.longPcs,
      short: findShortGlass,
      shortPcs: props.shortPcs,
      holderPcs: props.holdersPcs,
      shortName: `${item.name}/ 300mm`,
      longName: `${item.name}/ ${props.pickedLength}mm`,
      img: item.images[0].shop_thumbnail,
    };
    props.onGlassPick(selectedGlass);

    props.allowNextStep();
  };
  return (
    <Row className="bg-primary p-2" style={{ borderRadius: 15 }}>
      {glassProducts.map((item) => (
        <Col key={item.id}>
          <motion.div
            whileTap={{ scale: 0.9 }}
            className=" p-2 d-flex justify-content-center"
          >
            <img
              style={{ borderRadius: 15, width: "100px" }}
              src={item.images[0].shop_catalog}
              onClick={() => onPick(item)}
            />
          </motion.div>
          <p className="text-center fw-bold m-0 pt-2">{item.name}</p>
        </Col>
      ))}
    </Row>
  );
};
export default GlassColor;

/*

  <Ratio aspectRatio="4x3">
            <img
              style={{ borderRadius: 15, width: "100px" }}
              src={item.images[0].shop_catalog}
            />
          </Ratio>
*/

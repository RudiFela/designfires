import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
const GlassColor = (props) => {
  const [clicked, setClicked] = useState();
  const { pickedLength } = props;
  const glassProducts = props.glass.filter((item) => item.variant.length > 0);
  const onPick = (item) => {
    setClicked(item.id);
    let selectedGlass;
    let findLongGlass;
    const findShortGlass = item.variant.find(
      (variant) => variant.length.option === "300"
    );

    if (pickedLength > 2000) {
      let evenCheck = pickedLength % 200;

      let even = evenCheck > 0 ? false : true;
      switch (even) {
        case false: {
          findLongGlass = item.variant.find(
            (x) =>
              x.length.option === ((Number(pickedLength) + 100) / 2).toString() //find longer glass eg 1700 glass its 900+800
          ); //2 of them

          const splitGlass = item.variant.find(
            (x) =>
              x.length.option === ((Number(pickedLength) - 100) / 2).toString() // find shorter glass
          ); //2 of them
          selectedGlass = {
            long: findLongGlass,
            longPcs: props.longPcs,
            short: findShortGlass,
            shortPcs: props.shortPcs,
            holderPcs: (props.holdersPcs - props.shortPcs) * 2 + props.shortPcs,
            shortName: `${item.name}/ 300mm`,
            longName: `${item.name}/ ${(
              (Number(pickedLength) + 100) /
              2
            ).toString()} mm`,
            img: item.images[0].shop_thumbnail,
            split: splitGlass,
            splitPcs: props.longPcs,
            splitName: `${item.name}/ ${(
              (Number(pickedLength) - 100) /
              2
            ).toString()} mm`,
          };

          break;
        }
        case true: {
          findLongGlass = item.variant.find(
            (x) => x.length.option === (Number(pickedLength) / 2).toString() //4of them
          );
          selectedGlass = {
            long: findLongGlass,
            longPcs: props.longPcs * 2,
            short: findShortGlass,
            shortPcs: props.shortPcs,
            holderPcs: (props.holdersPcs - props.shortPcs) * 2 + props.shortPcs,
            shortName: `${item.name}/ 300mm`,
            longName: `${item.name}/ ${(
              Number(pickedLength) / 2
            ).toString()} mm`,
            img: item.images[0].shop_thumbnail,
          };

          break;
        }
      }
    } else {
      findLongGlass = item.variant.find(
        (variant) => variant.length.option === props.pickedLength
      );
      selectedGlass = {
        long: findLongGlass,
        longPcs: props.longPcs,
        short: findShortGlass,
        shortPcs: props.shortPcs,
        holderPcs: props.holdersPcs,
        shortName: `${item.name} 300`,
        longName: `${item.name} ${props.pickedLength}`,
        img: item.images[0].shop_thumbnail,
      };
    }

    props.onGlassPick(selectedGlass);

    props.allowNextStep();
  };
  return (
    <Row className="bg-primary p-2" style={{ borderRadius: 15 }}>
      {glassProducts.map((item) => (
        <Col key={item.id}>
          <motion.div
            onClick={() => onPick(item)}
            whileTap={{ scale: 0.9 }}
            className="p-2 d-flex justify-content-center"
          >
            <img
              style={{ borderRadius: 15, width: "100px" }}
              src={item.images[0].shop_catalog}
              className={`${
                clicked === item.id ? "border border-4 border-warning" : ""
              } `}
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

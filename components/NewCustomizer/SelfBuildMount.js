import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Col, Row, Ratio, Badge, Button } from "react-bootstrap";
import CustomizerHeader from "../UI/CustomizerHeader";
import GlassOptions from "../UI/glassPick";
import GlassColor from "./GlassColor";
const SelfBuildMount = (props) => {
  const [shortPcs, setShortPcs] = useState();
  const [longPcs, setLongPcs] = useState();
  const [holdersPcs, setHoldersPcs] = useState();
  const [selected, setSelected] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const onPick = (item) => {
    //console.log(item);
    setSelectedItem([item]);
    setLongPcs(item.longGlass);
    setShortPcs(item.shortGlass);
    setHoldersPcs(item.pieces);
    setSelected(true);
    //item.pieces for holders value
    //props.onGlassPick();
  };
  const pickStyle = `${selected ? "p-3" : "p-3 not-allowed"}`;
  return (
    <>
      <CustomizerHeader>Glass Mount Type</CustomizerHeader>
      {!selected && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Row //xs={2} md={3}>
            >
              {GlassOptions.map((item) => (
                <Col key={item.id} md={3}>
                  <motion.div
                    whileTap={{ scale: 0.9 }}
                    style={{ borderRadius: 15, opacity: 0.85 }}
                    className={`m-1 mb-4 p-3 glass-picker bg-primary ${
                      selectedItem && selectedItem.title === item.title
                        ? "border border-3 border-warning"
                        : ""
                    } `}
                    onClick={() => onPick(item)}
                  >
                    <Ratio aspectRatio="16x9">{item.svg}</Ratio>{" "}
                    <p className="text-center fw-bold mt-3">{item.title}</p>
                  </motion.div>
                </Col>
              ))}
            </Row>
          </motion.div>
        </AnimatePresence>
      )}
      <div className={pickStyle}>
        {selected && (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Row>
                <Col>
                  <CustomizerHeader>Select Glass Color</CustomizerHeader>
                  <GlassColor
                    glass={props.glass}
                    pickedLength={props.pickedLength}
                    onGlassPick={props.onGlassPick}
                    longPcs={longPcs}
                    shortPcs={shortPcs}
                    holdersPcs={holdersPcs}
                    allowNextStep={props.allowNextStep}
                  />
                </Col>
                <Col>
                  {selectedItem.map((item) => (
                    <Col key={item.id}>
                      <div
                        style={{ borderRadius: 15, opacity: 0.85 }}
                        className={`m-1 mb-4 p-3 glass-picker bg-primary ${
                          selectedItem && selectedItem.title === item.title
                            ? "border border-3 border-warning"
                            : ""
                        } `}
                        onClick={() => onPick(item)}
                      >
                        <Ratio aspectRatio="16x9">{item.svg}</Ratio>{" "}
                        <p className="text-center fw-bold mt-3">{item.title}</p>
                      </div>
                    </Col>
                  ))}
                </Col>
              </Row>{" "}
              <Button className="mt-3" onClick={() => setSelected(false)}>
                Back To Casings
              </Button>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </>
  );
};
export default SelfBuildMount;

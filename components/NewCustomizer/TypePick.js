import { Col, Ratio, Row, Image, Badge } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import CustomizerHeader from "../UI/CustomizerHeader";
const TypePick = (props) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Row className="p-2" xs={1} md={2}>
          {props.fireplaceItems.map((item) => (
            <div key={item.id}>
              <CustomizerHeader>{item.name}</CustomizerHeader>{" "}
              <Col className=" d-flex justify-content-center p-3">
                <Ratio aspectRatio="4x3">
                  <Image
                    className="grow"
                    style={{ borderRadius: 25 }}
                    alt="photocard-picture"
                    src={item.images[0].src}
                    layout="fill"
                    onClick={() => props.onTypePick(item)}
                  />
                </Ratio>
              </Col>{" "}
              <h3 className="text-center ">
                <Badge className="my-1 text-wrap" bg="danger">
                  {item.acf.fullname}
                </Badge>
              </h3>
            </div>
          ))}
        </Row>
      </motion.div>
    </AnimatePresence>
  );
};
export default TypePick;

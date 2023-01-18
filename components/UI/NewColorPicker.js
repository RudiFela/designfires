import { Row, Col, Badge } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
const NewColorPicker = (props) => {
  return (
    <Row
      md="3"
      lg="4"
      className="p-2 my-2"
      style={{
        height: "350px",
        overflowY: "scroll",
        backgroundColor: "white",
        borderRadius: 15,
      }}
    >
      {props.colors.map((item) => (
        <Col className="m-0 p-1 " key={item.hex}>
          <span
            className="d-flex flex-column justify-content-center"
            style={{ width: "100%" }}
          >
            <div className="d-flex justify-content-center">
              <motion.div whileHover={{ scale: 1.1 }}>
                <div
                  onClick={() => props.onPick(item.hex, item.ral)}
                  className="text-center "
                  style={{
                    width: "70px",
                    height: "80px",
                    backgroundColor: `${item.hex}`,
                    borderRadius: "5px",
                    border: "solid 1px",
                    zIndex: "1000",
                  }}
                >
                  <Badge bg="danger" className="text-wrap">
                    {item.ral}
                  </Badge>
                </div>
              </motion.div>
            </div>
          </span>
        </Col>
      ))}
    </Row>
  );
};
export default NewColorPicker;
/*
<Row
      className="py-2 rounded"
      style={{ height: "200px", overflowY: "scroll", backgroundColor: "white" }}
    >
      {props.colors.map((item) => (
        <>
          <Col className="m-0 p-1" style={{ backgroundColor: "white" }}>
            {item.map((color) => (
              <span
                className="d-flex flex-column justify-content-center"
                style={{ backgroundColor: "white", width: "100%" }}
              >
                <div className="d-flex justify-content-center">
                  <motion.div whileHover={{ scale: 1.1 }}>
                    <div
                      onClick={() => props.onPick(color)}
                      className="text-center "
                      style={{
                        width: "70px",
                        height: "50px",
                        backgroundColor: `${color}`,
                        borderRadius: "5px",
                        border: "solid 1px",
                        zIndex: "1000",
                      }}
                    ></div>
                  </motion.div>
                </div>
                <span className="d-flex justify-content-center fw-bolder">
                  RAL 7034
                </span>
              </span>
            ))}
          </Col>
        </>
      ))}
    </Row>*/

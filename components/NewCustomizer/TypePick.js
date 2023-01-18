import { Badge, Col, Ratio, Row, Image } from "react-bootstrap";
import { motion } from "framer-motion";
const TypePick = (props) => {
  return (
    <div>
      <h1 className="text-center">
        <Badge>FirePlace</Badge>
      </h1>
      <Row className="p-2" xs={1} md={2}>
        {props.fireplaceItems.map((item) => (
          <Col key={item.id} className=" d-flex justify-content-center p-4">
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
          </Col>
        ))}
      </Row>
    </div>
  );
};
export default TypePick;

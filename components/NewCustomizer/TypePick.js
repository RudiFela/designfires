import { Col, Ratio, Row, Image } from "react-bootstrap";
import CustomizerHeader from "../UI/CustomizerHeader";
const TypePick = (props) => {
  return (
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
          </Col>
        </div>
      ))}
    </Row>
  );
};
export default TypePick;

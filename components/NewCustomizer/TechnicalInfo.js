import { BiTimer } from "react-icons/bi";
import { GiElectric, GiAutoRepair } from "react-icons/gi";
import { MdWaterDrop } from "react-icons/md";
import { ImFire } from "react-icons/im";
import {
  CgArrowsMergeAltV,
  CgArrowsShrinkH,
  CgArrowsShrinkV,
  CgArrowsExpandRight,
} from "react-icons/cg";
import { Badge, Row, Col, Button } from "react-bootstrap";
import { MdOutlineLocalSee } from "react-icons/md";

const TechnicalInfo = (props) => {
  const { item } = props;
  const info = props.item ? (
    <div
      className="  p-3 bg-primary"
      style={{ borderRadius: 15, opacity: 0.85, height: "420px" }}
    >
      <Row className="">
        <Col>
          <span className="fs-5 fw-bold">
            Power/h KW:
            <Badge className="float-end ms-2" bg="info">
              <GiElectric />
              {item.power}
            </Badge>
          </span>
        </Col>
      </Row>
      <Row className="my-1">
        <Col>
          <span className="fs-5 fw-bold">
            Liters/h:
            <Badge className="float-end" bg="info">
              <MdWaterDrop /> {item.liters}
            </Badge>
          </span>
        </Col>
      </Row>
      <Row className="my-1">
        <Col>
          <span className="fs-5 fw-bold">
            Burning Time/h:
            <Badge className="float-end ms-2" bg="info">
              <BiTimer /> {item.burning}
            </Badge>
          </span>
        </Col>
      </Row>

      <Row className="my-1">
        <Col>
          <span className="fs-5 fw-bold">
            Length:
            <Badge className="float-end" bg="info">
              <CgArrowsShrinkH className="me-1" />
              {item.dimensions.length} mm
            </Badge>
          </span>
        </Col>
      </Row>
      <Row className="my-1">
        <Col>
          <span className="fs-5 fw-bold">
            Deep:
            <Badge className="float-end " bg="info">
              <CgArrowsExpandRight className="me-1" />
              {item.dimensions.width} mm
            </Badge>
          </span>
        </Col>
      </Row>
      <Row className="my-1">
        <Col>
          <span className="fs-5 fw-bold">
            Heigth:
            <Badge className="float-end" bg="info">
              <CgArrowsShrinkV />
              {item.dimensions.height} mm
            </Badge>
          </span>
        </Col>
      </Row>
      <Row className="my-1">
        <Col className="flex-nowrap">
          <span className="fs-5 fw-bold">
            Top Thickess:
            <Badge className="float-end" bg="info">
              <CgArrowsMergeAltV /> 3 mm
            </Badge>
          </span>
        </Col>
      </Row>
      <Row className="my-1">
        <Col>
          <span className="fs-5 fw-bold">
            Bottom Size:
            <Badge className="float-end" bg="info">
              {item.bottomsize} mm
            </Badge>
          </span>
        </Col>
      </Row>
      <Row className="my-1">
        <Col>
          <span className="fw-bold fs-5">
            Hole Size:
            <Badge className="float-end" bg="info">
              {item.holesize} mm
            </Badge>
          </span>
        </Col>
      </Row>
      <div className="text-center">
        <Button
          className=" fw-bold"
          variant="success"
          onClick={() => props.showModalHandler(item.technical_image[0])}
        >
          Technical Drawing
          <MdOutlineLocalSee className="ms-2" />
        </Button>
      </div>
      <h2 className="text-center mt-2">
        <Badge bg="info">
          {item.stock_status === "instock" ? <ImFire /> : <GiAutoRepair />}
        </Badge>
      </h2>
    </div>
  ) : (
    <h3 className="text-center">
      <Badge className="text-wrap">Pick Length to see Technical Params</Badge>
    </h3>
  );
  return <>{info}</>;
};
export default TechnicalInfo;

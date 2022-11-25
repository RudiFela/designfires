import { Row, Col, Form, Badge } from "react-bootstrap";
const WoodFilterOptions = (props) => {
  return (
    <Row>
      <Col className=" p-3 text-center">
        <div className="bg-success p-3" style={{ borderRadius: "15px" }}>
          <h2 className="text-white">
            <Badge>Mount Type</Badge>
          </h2>
          <Form.Check
            inline
            className="text-white fw-bolder fs-5"
            label="Build In"
            name="mountType"
            type="radio"
            id={`inline-MountType`}
            onChange={() => props.mountTypeChange("build-in")}
          />
          <Form.Check
            inline
            className="text-white fw-bolder fs-5"
            label="Free Stand"
            name="mountType"
            type="radio"
            id={`inline-MountType`}
            onChange={() => props.mountTypeChange("free-stand")}
            //onChange={() => props.changeGlassColor("Bronze", 386)}
          />
        </div>
      </Col>
      <Col className="p-3 text-center">
        <div className="bg-success p-3" style={{ borderRadius: "15px" }}>
          <h2 className="text-white">
            <Badge>Average kW</Badge>
          </h2>
          <Form.Check
            inline
            className="text-white fw-bolder fs-5"
            label="5kW-10kW"
            name="kw"
            type="radio"
            id={`inline-kW`}
            onChange={() => props.rangeChange(5, 10)}
          />
          <Form.Check
            inline
            className="text-white fw-bolder fs-5"
            label="10kW +"
            name="kw"
            type="radio"
            id={`inline-kW`}
            onChange={() => props.rangeChange(10, 50)}
            //onChange={() => props.changeGlassColor("Bronze", 386)}
          />
        </div>
      </Col>
    </Row>
  );
};
export default WoodFilterOptions;

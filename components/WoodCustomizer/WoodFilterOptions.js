import { Row, Col, Form, Badge } from "react-bootstrap";
import LabelWraper from "../UI/LabelWraper";
import LanguageSwitcher from "../UI/LanguageSwitcher/LanguageSwitcher";
const WoodFilterOptions = (props) => {
  return (
    <Row>
      <Col className=" p-3">
        <LabelWraper>
          <h2 className="text-white text-center">
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
        </LabelWraper>
      </Col>
      <Col className="p-3 ">
        <LabelWraper>
          <h2 className="text-white text-center">
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
        </LabelWraper>
      </Col>
      <Col className="p-3 text-center">
        <LabelWraper>
          {" "}
          <h2 className="text-white text-center">
            <Badge>Currency</Badge>
          </h2>
          <LanguageSwitcher />
        </LabelWraper>
      </Col>
    </Row>
  );
};
export default WoodFilterOptions;

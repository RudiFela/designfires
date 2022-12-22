import { useState } from "react";
import { Row, Col, Form, Badge } from "react-bootstrap";
import RangeSlider from "react-bootstrap-range-slider";
import LabelWraper from "../UI/LabelWraper";
import LanguageSwitcher from "../UI/LanguageSwitcher/LanguageSwitcher";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
const WoodFilterOptions = (props) => {
  const [value1, setValue1] = useState(1);
  const [value2, setValue2] = useState(30);
  const onMinRangeChange = (value) => {
    props.rangeChange(value, value2);
    setValue1(value);
  };
  const onMaxRangeChange = (value) => {
    props.rangeChange(value1, value2);
    setValue2(value);
  };
  return (
    <LabelWraper>
      <Row>
        <Col className=" p-3">
          <h2 className="text-white text-center">
            <Badge>Type</Badge>
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
        </Col>
        <Col className="p-3 ">
          <h2 className="text-white text-center">
            <Badge>Average kW</Badge>
          </h2>{" "}
          <Row>
            <Form>
              <Form.Group as={Row}>
                <Col xs="6">
                  <RangeSlider
                    value={value1}
                    onChange={(e) => onMinRangeChange(e.target.value)}
                    min={1}
                    max={20}
                    variant="danger"
                    tooltip="on"
                    size="lg"
                  />
                </Col>
                <Col xs="6">
                  <RangeSlider
                    value={value2}
                    onChange={(e) => onMaxRangeChange(e.target.value)}
                    min={10}
                    max={30}
                    variant="danger"
                    size="lg"
                    tooltip="on"
                    className="text-white"
                  />
                </Col>
              </Form.Group>
            </Form>
          </Row>
        </Col>
        <Col className="p-3 text-center">
          {" "}
          <h2 className="text-white text-center">
            <Badge>Currency</Badge>
          </h2>
          <LanguageSwitcher />
        </Col>
      </Row>
    </LabelWraper>
  );
};
export default WoodFilterOptions;

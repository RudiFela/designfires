import { useState } from "react";
import { Row, Col, Form, Badge } from "react-bootstrap";
import RangeSlider from "react-bootstrap-range-slider";
import LabelWraper from "../UI/LabelWraper";
import LanguageSwitcher from "../UI/LanguageSwitcher/LanguageSwitcher";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import OpeningSidesDropDown from "../Customizer/OpeningSidesDropDown";
const WoodFilterOptions = (props) => {
  const [value1, setValue1] = useState(1);
  const [value2, setValue2] = useState(30);
  const [danishDesign, setDanishDesign] = useState(false); //change for danish location variable later
  const onMinRangeChange = (value) => {
    props.rangeChange(value, value2);
    setValue1(value);
  };
  const onMaxRangeChange = (value) => {
    props.rangeChange(value1, value2);
    setValue2(value);
  };
  const onDanishDesign = () => {
    props.danishApproved(!danishDesign);
    setDanishDesign(!danishDesign);
    // console.log("filer", !danishDesign);
  };
  return (
    <LabelWraper>
      <Row className="p-1">
        <Col className="" md={2}>
          <h3 className="text-white text-center">
            <Badge>Type</Badge>
          </h3>
          <Form.Check
            inline
            className="text-white fw-bolder fs-6"
            label="Build In"
            name="mountType"
            type="radio"
            id={`inline-MountType`}
            onChange={() => props.mountTypeChange("build-in")}
          />
          <Form.Check
            inline
            className="text-white fw-bolder fs-6"
            label="Free Stand"
            name="mountType"
            type="radio"
            id={`inline-MountType`}
            onChange={() => props.mountTypeChange("free-stand")}
            //onChange={() => props.changeGlassColor("Bronze", 386)}
          />
          <Form.Check
            inline
            className="text-white fw-bolder fs-6 my-3"
            label="Danish Certificate"
            name="mountType"
            type="checkbox"
            id={`inline-danish`}
            onChange={() => onDanishDesign()}
            //onChange={() => props.changeGlassColor("Bronze", 386)}///
          />
        </Col>
        <Col className="text-center">
          <h3 className="text-white text-center">
            <Badge>Opening Sides</Badge>
          </h3>{" "}
          <OpeningSidesDropDown />
        </Col>
        <Col className=" ">
          <h3 className="text-white text-center">
            <Badge>Average kW</Badge>
          </h3>{" "}
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
        <Col className=" text-center" xs={2}>
          {" "}
          <h3 className="text-white text-center">
            <Badge>Currency</Badge>
          </h3>
          <LanguageSwitcher />
        </Col>
      </Row>
    </LabelWraper>
  );
};
export default WoodFilterOptions;

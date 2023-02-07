import { useState } from "react";
import {
  Row,
  Col,
  Form,
  Badge,
  OverlayTrigger,
  Popover,
  Button,
  Tooltip,
} from "react-bootstrap";
import { BsInfoCircle } from "react-icons/bs";
import TooltipTrigger from "../UI/TooltipTrigger";
import RangeSlider from "react-bootstrap-range-slider";
import LabelWraper from "../UI/LabelWraper";
import LanguageSwitcher from "../UI/LanguageSwitcher/LanguageSwitcher";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import OpeningSidesDropDown from "../UI/OpeningSidesDropDown";
import MultiRangeSlider from "../UI/MultiRangeSlider/MultiRangeSlider";
const WoodFilterOptions = (props) => {
  const [danishDesign, setDanishDesign] = useState(false); //change for danish location variable later

  const onDanishDesign = () => {
    props.danishApproved(!danishDesign);
    setDanishDesign(!danishDesign);
    // console.log("filer", !danishDesign);
  };
  return (
    <LabelWraper>
      <Row className="p-1 justify-content-around" xs={1} sm={2} md={3} lg={6}>
        <Col className="m-2" md={2}>
          <h4 className="text-white text-center">
            <Badge>
              Type
              <TooltipTrigger text="Filter by type of the fireplace">
                <BsInfoCircle className="mx-1" />
              </TooltipTrigger>
            </Badge>{" "}
          </h4>
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

        <Col className="text-center m-2" md={4}>
          <h4>
            <Badge>
              Name{" "}
              <TooltipTrigger text="Filter by specific name of the fireplace">
                <BsInfoCircle className="mx-1" />
              </TooltipTrigger>
            </Badge>
            <Form.Control
              className="mt-2"
              value={props.nameFilter}
              type="text"
              placeholder="Fireplace Name"
              onChange={(e) => props.onNameChange(e.target.value)}
            />
          </h4>
        </Col>
        <Col className="text-center m-2">
          <h4 className="text-white text-center">
            <Badge>
              Opening <br />
              Sides{" "}
              <TooltipTrigger text="Filter by opening sides of the fireplaces">
                <BsInfoCircle className="mx-1" />
              </TooltipTrigger>
            </Badge>
          </h4>{" "}
          <OpeningSidesDropDown onSelect={props.onOpeningSidesChange} />
        </Col>
        <Col className=" m-2">
          <h4 className="text-white text-center">
            <Badge>
              Average kW{" "}
              <TooltipTrigger text="Filter by kW range of the fireplace">
                <BsInfoCircle className="mx-1" />
              </TooltipTrigger>
            </Badge>
          </h4>

          <MultiRangeSlider
            className="mt-4 d-flex justify-content-center"
            min={1}
            max={40}
            onChange={({ min, max }) => props.onRangeChange(min, max)}
          />
        </Col>
        <Col className=" text-center m-2" md={1}>
          {" "}
          <h4 className="text-white text-center">
            <Badge>Currency</Badge>
          </h4>
          <div style={{ width: "100px" }}>
            <LanguageSwitcher />
          </div>
        </Col>
      </Row>
    </LabelWraper>
  );
};
export default WoodFilterOptions;
/*
 <Row>
            {" "}
            <Form>
              <Form.Group as={Row}>
                <Col xs="6">
                  <RangeSlider
                    value={props.minRange}
                    onChange={(e) => props.minRangeChange(e.target.value)}
                    min={1}
                    max={20}
                    variant="danger"
                    tooltip="on"
                    size="lg"
                  />
                </Col>
                <Col xs="6">
                  <RangeSlider
                    value={props.maxRange}
                    onChange={(e) => props.maxRangeChange(e.target.value)}
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

*/

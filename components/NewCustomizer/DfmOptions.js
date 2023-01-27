import { useContext, useEffect } from "react";
import { Stack, Badge, Form, OverlayTrigger, Popover } from "react-bootstrap";
import { LanguageContext } from "../context/language-context";
const DfmOptions = (props) => {
  useEffect(() => {
    // props.onFillingType("EW");
    // console.log(document.querySelector("group1"));
  }, []);
  const lang = useContext(LanguageContext);
  const currencyPriceT = () => {
    return lang.currencyPrice("100", "995", "755");
  };
  const currencyPricePW = () => {
    return lang.currencyPrice("995", "9995", "7555");
  };
  const onTypeChange = (func) => {
    //console.log(document.getElementsByName("group1"));
    func();
  };
  const popoverEW = (
    <Popover id="popover-basic">
      <Popover.Body>
        <div className="fw-bold fs-5">
          <p>Side filling without pressure water </p>{" "}
          <p className="fs-6">Refueling from external water tank.</p>{" "}
          <p className="fs-6">Standard.</p>
        </div>
      </Popover.Body>
    </Popover>
  );
  const popoverT = (
    <Popover id="popover-basic">
      <Popover.Body>
        <div className="fw-bold fs-5">
          <p>Top filling = Top refueling.</p>{" "}
          <p className="fs-6">
            Extra {currencyPriceT()}
            <span> </span>
            {lang.currencySymbol()} for this option
          </p>
        </div>
      </Popover.Body>
    </Popover>
  );
  const popoverPW = (
    <Popover id="popover-basic">
      <Popover.Body>
        <div className="fw-bold fs-5">
          <p> Side filling with the presssure water</p>{" "}
          <p className="fs-6">Ready for connection to water pipe </p>
          <p className="fs-6">
            Extra {currencyPricePW()}
            <span> </span>
            {lang.currencySymbol()} for this option.
          </p>
        </div>
      </Popover.Body>
    </Popover>
  );
  const filing = (
    <div className="fs-5 my-2">
      <h5 className="text-white fw-bold fs-2">
        <Badge bg="danger">Filling Type</Badge>
      </h5>
      <Form.Check
        className="my-2"
        //disabled={!selectedFireplace.selectedLength}
        inline
        label={
          <OverlayTrigger placement="bottom" overlay={popoverEW}>
            <span className="text-white fw-bold">EW</span>
          </OverlayTrigger>
        }
        name="group1"
        type="radio"
        defaultChecked={true}
        id={`inline--1EW`}
        onChange={() => onTypeChange(() => props.onFillingType("EW"))}
      />
      <Form.Check
        inline
        //disabled={!selectedFireplace.selectedLength}
        label={
          <OverlayTrigger placement="bottom" overlay={popoverT}>
            <span className="text-white fw-bold">T</span>
          </OverlayTrigger>
        }
        name="group1"
        type="radio"
        id={`inline--1T`}
        onChange={() => props.onFillingType("T")}
      />
      <Form.Check
        inline
        //disabled={!selectedFireplace.selectedLength}
        label={
          <OverlayTrigger placement="bottom" overlay={popoverPW}>
            <span className="text-white fw-bold">PW</span>
          </OverlayTrigger>
        }
        name="group1"
        type="radio"
        id={`inline--1PW`}
        //onChange={() => onFillingChange("PW", "995", "9995", "7555")}
        onChange={() => {
          props.onFillingType("PW");
        }}
      />
    </div>
  );
  const options = (
    <>
      <Form className=" fs-4">
        <Form.Check
          ref={props.shsRef}
          className="text-white mt-2"
          type="switch"
          id="custom-switch"
          variant="secondary"
          label="Smart Home System"
          defaultChecked
          disabled
        />
      </Form>
      {filing}
    </>
  );
  const standard = (
    <>
      <h3 className="text-white">
        <Badge bg="danger">Standard</Badge>
      </h3>
      <div className="">
        <ul className="p-0" style={{ listStyleType: "none" }}>
          <li>
            <Badge bg="success" className="text-wrap text-start mt-2">
              Smart Home System
            </Badge>
          </li>
          <li>
            <Badge bg="success" className="text-wrap text-start mt-2">
              Remote Control
            </Badge>
          </li>
          <li>
            <Badge bg="success" className="text-wrap text-start mt-2">
              3 level on the flame
            </Badge>
          </li>
          <li>
            <Badge bg="success" className="text-wrap text-start mt-2">
              Longest burning time on the market
            </Badge>
          </li>
          <li>
            <Badge bg="success" className="text-wrap text-start mt-2">
              Support even after varanty expires!
            </Badge>
          </li>
        </ul>
      </div>
    </>
  );
  return (
    <div
      className="bg-primary p-3"
      style={{ borderRadius: 15, height: "420px", opacity: 0.85 }}
    >
      <Stack>
        {options}
        {standard}
      </Stack>
    </div>
  );
};
export default DfmOptions;

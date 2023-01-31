import { useEffect } from "react";
import { Badge, Form, Stack } from "react-bootstrap";

const DfeOptions = (props) => {
  /*const onShs = () => {
    props.onSmartHomeSystem(shsRef.current.checked);
  };*/
  /*const onTop = () => {
    props.onStainlessTop(topRef.current.checked);
  };*/
  useEffect(() => {
    props.onFillingType("none");
  }, []);
  const standard = (
    <div className="">
      <h3 className="text-white">
        <Badge bg="danger">Standard</Badge>
      </h3>
      <ul className="p-0" style={{ listStyleType: "none" }}>
        <li>
          <Badge bg="success" className="">
            Remote Control
          </Badge>
        </li>{" "}
        <li>
          <Badge bg="success" className="text-wrap text-start mt-2">
            Longest burning time on the market 20 hours
          </Badge>
        </li>
        <li>
          <Badge bg="success" className="text-wrap text-start mt-2">
            Black Top
          </Badge>
        </li>
        <li>
          <Badge bg="success" className="text-wrap text-start mt-2">
            Digital Control with safety sensors
          </Badge>
        </li>
        <li>
          <Badge bg="success" className="text-wrap text-start mt-2">
            Electronic refueling system
          </Badge>
        </li>
        <li>
          <Badge bg="success" className="text-wrap text-start mt-2">
            Support even after varanty expires!
          </Badge>
        </li>
      </ul>
    </div>
  );
  const options = (
    <>
      <Form className="fw-bold">
        <Form.Check
          //disabled={!selectedFireplace.selectedLength}
          ref={props.shsRef}
          className="text-white mt-2"
          type="switch"
          id="custom-switch"
          variant="secondary"
          //onChange={shsSwitcher}
          onChange={() => props.shsPicked()}
          label="Smart Home System"
        />
        <Form.Check
          //disabled={!selectedFireplace.selectedLength}
          ref={props.topRef}
          className="text-white mt-2 mb-2"
          type="switch"
          id="custom-switch"
          variant="secondary"
          // onChange={onTop}
          // onChange={topSwitcher}
          onChange={() => props.topPicked()}
          label="Stainless Top"
        />
      </Form>
      <p className="text-white fw-bold mt-2">
        Remember to pick Bio-Ethanol fuel!
      </p>
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
export default DfeOptions;

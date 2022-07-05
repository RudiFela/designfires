import { useContext } from "react";
import {
  DropdownButton,
  Card,
  Button,
  Stack,
  Popover,
  OverlayTrigger,
  Form,
} from "react-bootstrap";
import { LanguageContext } from "../context/language-context";
const CustomizerWrapper = (props) => {
  const lang = useContext(LanguageContext);
  const currencySymbol = () => {
    switch (lang.language) {
      case "swedish":
        return "SEK";
      case "english":
        return "€";

      case "danish":
        return "kr";
    }
  };
  const currencyPriceT = () => {
    switch (lang.language) {
      case "swedish":
        return "995";
      case "english":
        return "100";

      case "danish":
        return "755";
    }
  };
  const currencyPricePW = () => {
    switch (lang.language) {
      case "swedish":
        return "9995";
      case "english":
        return "995";

      case "danish":
        return "7555";
    }
  };
  const {
    itemPhoto,
    itemName,
    itemLength,
    itemDropDown,
    lengthDropDown,
    selectedPrice,
    popoverInfo,
    shsSwitcher,
    topSwitcher,
    extraOptions,
    selected,
    onFillingChange,
  } = props;
  const popover = (
    <Popover id="popover-basic">
      <Popover.Body>{popoverInfo}</Popover.Body>
    </Popover>
  );
  const popoverEW = (
    <Popover id="popover-basic">
      <Popover.Body>
        <h6>Side filling without pressure water </h6>{" "}
        <p>Refueling from external water tank.</p> <p>Standard.</p>
      </Popover.Body>
    </Popover>
  );
  const popoverT = (
    <Popover id="popover-basic">
      <Popover.Body>
        <h6>Top filling = Top refueling.</h6>{" "}
        <p>
          Extra {currencyPriceT()}
          {currencySymbol()} for this option
        </p>
      </Popover.Body>
    </Popover>
  );
  const popoverPW = (
    <Popover id="popover-basic">
      <Popover.Body>
        <h6> Side filling with the presssure water</h6>{" "}
        <p>Ready for connection to water pipe </p>
        <p>
          Extra {currencyPricePW()}
          {currencySymbol()} for this option.
        </p>
      </Popover.Body>
    </Popover>
  );

  const filing = (
    <>
      <Form.Check
        inline
        label={
          <OverlayTrigger placement="bottom" overlay={popoverEW}>
            <p>EW</p>
          </OverlayTrigger>
        }
        name="group1"
        type="radio"
        id={`inline--1EW`}
        onChange={() => onFillingChange("EW", 0)}
      />
      <Form.Check
        inline
        label={
          <OverlayTrigger placement="bottom" overlay={popoverT}>
            <p>T</p>
          </OverlayTrigger>
        }
        name="group1"
        type="radio"
        id={`inline--1T`}
        onChange={() => onFillingChange("T", currencyPriceT())}
      />
      <Form.Check
        inline
        label={
          <OverlayTrigger placement="bottom" overlay={popoverPW}>
            <p>PW</p>
          </OverlayTrigger>
        }
        name="group1"
        type="radio"
        id={`inline--1PW`}
        onChange={() => onFillingChange("PW", currencyPricePW())}
      />
    </>
  );
  return (
    <Card
      className="card-deco mt-3"
      style={{ maxwidth: "30rem", height: "30rem" }}
    >
      <Card.Img
        style={{ maxheigth: "50vh", borderRadius: 35 }}
        variant="bottom"
        alt="fireplace casing photo"
        src={itemPhoto}
      />
      <Card.Body>
        <Stack className="flex-wrap mb-3" direction="horizontal" gap={3}>
          <DropdownButton
            id="dropdown-basic-button"
            variant="primary"
            className="fw-bold"
            title={itemName}
          >
            {itemDropDown}
          </DropdownButton>
          <DropdownButton
            className="bolder"
            id="dropdown-basic-button"
            variant="primary"
            disabled={!selected}
            title={itemLength}
          >
            {lengthDropDown}
          </DropdownButton>
          <Button className="bolder" variant="primary" disabled>
            {selectedPrice} {currencySymbol()}
          </Button>
        </Stack>
        <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
          <Button size="sm">Technical Info</Button>
        </OverlayTrigger>
        {extraOptions && itemName !== "DFM" ? (
          <Form>
            <Form.Check
              className="text-white mt-2"
              type="switch"
              id="custom-switch"
              variant="secondary"
              onChange={shsSwitcher}
              label="SHS (Smart Home System)"
            />
            <Form.Check
              className="text-white mt-2 mb-2"
              type="switch"
              id="custom-switch"
              variant="secondary"
              onChange={topSwitcher}
              label="Stainless Top"
            />
          </Form>
        ) : null}

        {extraOptions && itemName === "DFM" ? (
          <Form>
            <Form.Check
              className="text-white mt-2"
              type="switch"
              id="custom-switch"
              variant="secondary"
              label="SHS (Smart Home System) Standard"
              defaultChecked
              disabled
            />
          </Form>
        ) : null}

        {itemName === "DFM" && extraOptions ? filing : null}
      </Card.Body>{" "}
    </Card>
  );
};
export default CustomizerWrapper;

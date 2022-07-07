import { useContext, useState } from "react";
import {
  Dropdown,
  Badge,
  Row,
  Col,
  Popover,
  Form,
  OverlayTrigger,
  DropdownButton,
  Button,
  Link,
} from "react-bootstrap";
import CustomizerWrapper from "./CustomizerWrapper";
import { useChangePrice } from "../../hooks/change-price";
import { LanguageContext } from "../context/language-context";
const CustomizerFirePlaces = (props) => {
  const { switchCurrency } = useChangePrice();
  const {
    fireplaces,
    variant,
    fireplaceName,
    fireplaceLength,
    selectedFireplacePrice,
    fireplacePhoto,
    technicalInfo,
    shsSwitcher,
    topSwitcher,
    selected,
    onFillingChange,
  } = props;
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
  const currencyPrice = (eng, swe, dkk) => {
    switch (lang.language) {
      case "swedish":
        return swe;
      case "english":
        return eng;

      case "danish":
        return dkk;
    }
  };
  const currencyPriceT = () => {
    return currencyPrice("100", "995", "755");
  };
  const currencyPricePW = () => {
    return currencyPrice("995", "9995", "7555");
  };
  const popoverInfo = technicalInfo ? (
    <>
      <Row>
        <Col>
          <h6>
            Power/h KW:{" "}
            <Badge className="float-end ms-2" bg="secondary">
              {technicalInfo.power}
            </Badge>
          </h6>
        </Col>
      </Row>
      <Row>
        <Col>
          <h6>
            Liters/h:{" "}
            <Badge className="float-end" bg="secondary">
              {technicalInfo.liters}
            </Badge>
          </h6>
        </Col>
      </Row>
      <Row>
        <Col>
          <h6>
            Burning Time/h:{" "}
            <Badge className="float-end ms-2" bg="secondary">
              {technicalInfo.burningtime}
            </Badge>
          </h6>
        </Col>
      </Row>

      <Row>
        <Col>
          <h6>
            Length:
            <Badge className="float-end" bg="secondary">
              {technicalInfo.length}mm
            </Badge>
          </h6>
        </Col>
      </Row>
      <Row>
        <Col>
          <h6>
            Width:
            <Badge className="float-end " bg="secondary">
              {technicalInfo.width}mm
            </Badge>
          </h6>
        </Col>
      </Row>
      <Row>
        <Col>
          <h6>
            Heigth:
            <Badge className="float-end" bg="secondary">
              {technicalInfo.heigth}mm
            </Badge>
          </h6>
        </Col>
      </Row>
      <Row>
        <Col>
          <h6>
            Top Plate Thickess:
            <Badge className="float-end" bg="secondary">
              3mm
            </Badge>
          </h6>
        </Col>
      </Row>
      <Row>
        <Col>
          <h6>
            Bottom Size:
            <Badge className="float-end" bg="secondary">
              450x215 mm
            </Badge>
          </h6>
        </Col>
      </Row>
      <Row>
        <Col>
          <h6>
            Hole Size:
            <Badge className="float-end" bg="secondary">
              470x230 mm
            </Badge>
          </h6>
        </Col>
      </Row>
    </>
  ) : (
    <p>Select Length to see technical params.</p>
  );

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
        defaultChecked={true}
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

  const fireplacesDropDownItems = fireplaces.map((item) => (
    <Dropdown.Item
      className="text-white bolder"
      key={item.id}
      onClick={() => {
        props.onSelect(item.images[0].src, item.name, item.variant);
      }}
      eventKey={item}
    >
      {item.name}
    </Dropdown.Item>
  ));
  const fireplacesDropDown = (
    <DropdownButton
      id="dropdown-basic-button"
      variant="primary"
      className="fw-bold"
      title={fireplaceName}
    >
      {fireplacesDropDownItems}
    </DropdownButton>
  );
  const fireplaceLengths = variant
    ? variant.map((item) => (
        <Dropdown.Item
          className="text-white bolder"
          key={item.id}
          onClick={() => {
            props.onPickLength(
              item.length,
              item.price,
              item.img,
              item.id,
              item.liters,
              item.power,
              item.burningtime,
              item.dimensions,
              item.DKK_price.value,
              item.SEK_price.value
            );
          }}
          eventKey={item}
        >
          {item.length}mm
        </Dropdown.Item>
      ))
    : null;

  const fireplacesLengthDropDown = (
    <DropdownButton
      className="bolder"
      id="dropdown-basic-button"
      variant="primary"
      disabled={!selected}
      title={fireplaceLength}
    >
      {fireplaceLengths}
    </DropdownButton>
  );

  return (
    <>
      <CustomizerWrapper
        itemPhoto={fireplacePhoto}
        itemName={fireplaceName}
        itemLength={fireplaceLength}
        itemDropDown={fireplacesDropDown}
        lengthDropDown={fireplacesLengthDropDown}
        selectedPrice={selectedFireplacePrice}
        popoverInfo={popoverInfo}
        selected={selected}
      >
        <>
          {selected && fireplaceName !== "DFM" ? (
            <Row>
              <Col>
                <Form>
                  <Form.Check
                    className="text-white mt-2"
                    type="switch"
                    id="custom-switch"
                    variant="secondary"
                    onChange={shsSwitcher}
                    label="Smart Home System"
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
              </Col>
              <Col>
                <Col>
                  {" "}
                  <Button
                    disabled
                    size="sm"
                    className="text-center"
                    variant="info"
                  >
                    Standard:
                  </Button>
                  <ul>
                    <li>
                      <Badge>Remote Control</Badge>
                    </li>{" "}
                    <li>
                      <Badge>Longest burning time on the market 20 hours</Badge>
                    </li>
                    <li>
                      <Badge>Black Top</Badge>
                    </li>
                    <li>
                      <Badge>Our support even after varanty expires!</Badge>
                    </li>
                  </ul>
                </Col>
              </Col>
            </Row>
          ) : null}
          {selected && fireplaceName === "DFM" ? (
            <Row>
              <Col>
                <Form>
                  <Form.Check
                    className="text-white mt-2"
                    type="switch"
                    id="custom-switch"
                    variant="secondary"
                    label="Smart Home System"
                    defaultChecked
                    disabled
                  />
                </Form>
                {fireplaceName === "DFM" && selected ? filing : null}
              </Col>
              <Col>
                {" "}
                <Button
                  disabled
                  size="sm"
                  className="text-center"
                  variant="info"
                >
                  Standard:
                </Button>
                <ul>
                  <li>
                    <Badge>Smart Home System</Badge>
                  </li>
                  <li>
                    <Badge>Remote Control</Badge>
                  </li>{" "}
                  <li>
                    <Badge>3 level on the flame</Badge>
                  </li>
                  <li>
                    <Badge>Longest burning time on the market</Badge>
                  </li>
                  <li>
                    <Badge>Our support even after varanty expires!</Badge>
                  </li>
                </ul>
              </Col>
            </Row>
          ) : null}
        </>
      </CustomizerWrapper>
    </>
  );
};
export default CustomizerFirePlaces;

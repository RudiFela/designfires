import {
  Dropdown,
  Row,
  Col,
  Badge,
  Button,
  DropdownButton,
} from "react-bootstrap";
import CustomizerWrapper from "./CustomizerWrapper";
const CustomizerCasings = (props) => {
  const {
    casings,
    variant,
    casingName,
    casingLength,
    selectedCasingPrice,
    casingPhoto,
    pickedCaseItem,
  } = props;

  const popoverInfo = pickedCaseItem.selected ? (
    <>
      <Row>
        <Col>
          <h6>
            Length:
            <Badge className="float-end" bg="secondary">
              {casingLength}mm
            </Badge>
          </h6>
        </Col>
      </Row>
      <Row>
        <Col>
          <h6>
            Width:
            <Badge className="float-end " bg="secondary">
              350mm
            </Badge>
          </h6>
        </Col>
      </Row>
      <Row>
        <Col>
          <h6>
            Heigth:
            <Badge className="float-end" bg="secondary">
              500mm
            </Badge>
          </h6>
        </Col>
      </Row>
      <Row>
        <Col>
          <h6>
            Thickness:
            <Badge className="float-end" bg="secondary">
              5mm
            </Badge>
          </h6>
        </Col>
      </Row>
    </>
  ) : (
    <p>Select Casing to see technical params.</p>
  );

  const casingDropDownItems = casings.map((item) => (
    <Dropdown.Item
      className="text-white bolder"
      key={item.id}
      onClick={() => {
        props.onSelect(
          item.images[0].src,
          item.name,
          item.variant,
          item.variant.find((item) => item.length === casingLength),
          item
        );
      }}
      eventKey={item}
    >
      {item.name}
    </Dropdown.Item>
  ));
  const casingDropDown = (
    <DropdownButton
      id="dropdown-basic-button"
      variant="primary"
      className="fw-bold"
      title={casingName}
      disabled={!props.enable}
    >
      {casingDropDownItems}
    </DropdownButton>
  );
  /* const casingLengthDropDown = variant
    ? variant.map((item) => (
        <Dropdown.Item
          className="text-white bolder"
          key={item.id}
          onClick={() => {
            props.onPickLength(
              item.length,
              item.price,
              item.img,
              item.DKK_price.value,
              item.SEK_price.value
            );
          }}
          eventKey={item}
        >
          {item.length}mm
        </Dropdown.Item>
      ))
    : null;*/
  const casingLengthDropDown = (
    <Button className="bolder" variant="primary" disabled>
      {casingLength}mm
    </Button>
  );

  return (
    <CustomizerWrapper
      itemPhoto={casingPhoto}
      itemName={casingName}
      itemLength={casingLength}
      itemDropDown={casingDropDown}
      lengthDropDown={casingLengthDropDown}
      selectedPrice={selectedCasingPrice}
      popoverInfo={popoverInfo}
      selected={pickedCaseItem.selected}
      cssClass="card-deco mt-3 casings-customizer"
    >
      <p className="text-white fw-bold mt-4">{pickedCaseItem.fullName}</p>
    </CustomizerWrapper>
  );
};
export default CustomizerCasings;

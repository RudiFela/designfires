import { Dropdown, Row, Col, Badge } from "react-bootstrap";
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
          <h6>Dimensions(mm):</h6>
        </Col>
      </Row>
      <Row>
        <Col>
          <h6>
            Length:
            <Badge className="float-end" bg="secondary">
              {casingLength}
            </Badge>
          </h6>
        </Col>
      </Row>
      <Row>
        <Col>
          <h6>
            Width:
            <Badge className="float-end " bg="secondary">
              350
            </Badge>
          </h6>
        </Col>
      </Row>
      <Row>
        <Col>
          <h6>
            Heigth:
            <Badge className="float-end" bg="secondary">
              500
            </Badge>
          </h6>
        </Col>
      </Row>
    </>
  ) : (
    <p>Select Length to see technical params.</p>
  );

  const casingDropDown = casings.map((item) => (
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
  const casingLengthDropDown = variant
    ? variant.map((item) => (
        <Dropdown.Item
          className="text-white bolder"
          key={item.id}
          onClick={() => {
            props.onPickLength(item.length, item.price, item.img);
          }}
          eventKey={item}
        >
          {item.length}mm
        </Dropdown.Item>
      ))
    : null;

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
    />
  );
};
export default CustomizerCasings;

import { Dropdown, Badge, Row, Col } from "react-bootstrap";
import CustomizerWrapper from "./CustomizerWrapper";
const CustomizerFirePlaces = (props) => {
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
          <h6>Dimensions(mm):</h6>
        </Col>
      </Row>
      <Row>
        <Col>
          <h6>
            Length:
            <Badge className="float-end" bg="secondary">
              {technicalInfo.length}
            </Badge>
          </h6>
        </Col>
      </Row>
      <Row>
        <Col>
          <h6>
            Width:
            <Badge className="float-end " bg="secondary">
              {technicalInfo.width}
            </Badge>
          </h6>
        </Col>
      </Row>
      <Row>
        <Col>
          <h6>
            Heigth:
            <Badge className="float-end" bg="secondary">
              {technicalInfo.heigth}
            </Badge>
          </h6>
        </Col>
      </Row>
    </>
  ) : (
    <p>Select Length to see technical params.</p>
  );

  const fireplacesDropDown = fireplaces.map((item) => (
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
  const fireplacesLengthDropDown = variant
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
              item.dimensions
            );
          }}
          eventKey={item}
        >
          {item.length}mm
        </Dropdown.Item>
      ))
    : null;

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
        extraOptions={selected}
        shsSwitcher={shsSwitcher}
        topSwitcher={topSwitcher}
        selected={selected}
        onFillingChange={onFillingChange}
      />
    </>
  );
};
export default CustomizerFirePlaces;

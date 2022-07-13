import { useContext, useRef } from "react";
import {
  Dropdown,
  Row,
  Col,
  Badge,
  Button,
  DropdownButton,
  Form,
} from "react-bootstrap";
import { LanguageContext } from "../context/language-context";
import CustomizerWrapper from "./CustomizerWrapper";
const CustomizerCasings = (props) => {
  const lang = useContext(LanguageContext);
  const { casings, pickedCaseItem } = props;
  const pickedGlassPcsRef = useRef();
  const popoverInfo = pickedCaseItem.selected ? (
    <>
      <Row>
        <Col>
          <h6>
            Length:
            <Badge className="float-end" bg="secondary">
              {pickedCaseItem.length}mm
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
          item.variant.find((item) => item.length === pickedCaseItem.length),
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
      title={pickedCaseItem.name}
      disabled={!props.enable}
    >
      {casingDropDownItems}
    </DropdownButton>
  );
  const casingLengthDropDown = (
    <Button className="bolder" variant="primary" disabled>
      {pickedCaseItem.length}mm
    </Button>
  );

  return (
    <CustomizerWrapper
      itemDropDown={casingDropDown}
      selectedItem={pickedCaseItem}
      lengthDropDown={casingLengthDropDown}
      selectedPrice={lang.currencyPrice(
        pickedCaseItem.priceEUR,
        pickedCaseItem.priceSEK,
        pickedCaseItem.priceDKK
      )}
      popoverInfo={popoverInfo}
      selected={pickedCaseItem.selected}
      cssClass="card-deco mt-3 casings-customizer"
    >
      <h6 className="text-white mt-2">Glass Color:</h6>
      <Form.Check
        inline
        label="Clear"
        name="glass"
        type="radio"
        defaultChecked={true}
        id={`inline-glassclear`}
        onChange={() => props.changeGlassColor("Clear")}
      />
      <Form.Check
        inline
        label="Bronze"
        name="glass"
        type="radio"
        id={`inline-glassbronze`}
        onChange={() => props.changeGlassColor("Bronze")}
      />
      {pickedCaseItem.selected && (
        <p className="text-white fw-bold mt-4">{pickedCaseItem.fullName}</p>
      )}
      {!pickedCaseItem.selected && (
        <div className="text-white fs-7">
          <p className="m-0">
            How Many pieces of glass do You need?(For opened fireplaces 4 of
            them recommended )
          </p>
          <Form.Select
            onChange={() =>
              props.glassPiecesChange(pickedGlassPcsRef.current.value)
            }
            className="mt-1"
            size="sm"
            ref={pickedGlassPcsRef}
          >
            <option value="4">4</option>
            <option value="3">3</option>
            <option value="2">2</option>
            <option value="1">1</option>
          </Form.Select>
        </div>
      )}
    </CustomizerWrapper>
  );
};
export default CustomizerCasings;

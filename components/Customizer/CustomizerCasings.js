import { useContext, useRef, useState } from "react";
import MyVerticallyCenteredModal from "../Decorations/Modal";
import { FaTruck } from "react-icons/fa";
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
  const [showModal, setShowModal] = useState(false);
  const [modalPhoto, setModalPhoto] = useState();
  const lang = useContext(LanguageContext);
  const { casings, pickedCaseItem } = props;
  const pickedLongGlassPcsRef = useRef();
  const pickedShortGlassPcsRef = useRef();

  const showModalHandler = (image) => {
    setModalPhoto(image);
    setShowModal(true);
    document.body.click();
  };
  const closeModal = () => {
    setShowModal(false);
  };
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
      <Row>
        <Button
          className="p-0"
          size="sm"
          onClick={
            () => showModalHandler()
            // "https://designfires.pl/wp-content/uploads/2022/07/designfires.svg"
          }
        >
          3D View
        </Button>
      </Row>
    </>
  ) : (
    <p className="fw-bold">Select Casing to see technical params.</p>
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
          item.variant.find(
            (item) => item.length.option === pickedCaseItem.length
          ),
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
      id="dropdown-casing-button"
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
      {pickedCaseItem.stock_status === "instock" ? null : (
        <>
          <span> </span>
          <FaTruck />
        </>
      )}
    </Button>
  );

  return (
    <>
      <MyVerticallyCenteredModal
        image={modalPhoto}
        show={showModal}
        closemodal={() => closeModal()}
      >
        <div className="embed-responsive embed-responsive-21by9 ">
          {pickedCaseItem.Drawing3d ? (
            <iframe
              style={{ width: "100%" }}
              className="embed-responsive-item modal-size"
              src={`${pickedCaseItem.Drawing3d}/embed?autospin=1&dnt=1`}
            ></iframe>
          ) : (
            <h2 className="text-white text-center mt-5">
              Sorry,cant find 3d model
            </h2>
          )}
        </div>
      </MyVerticallyCenteredModal>{" "}
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
        pictureheigth={400}
      ></CustomizerWrapper>
    </>
  );
};
export default CustomizerCasings;

/*
<p className="text-white fw-bold m-2 ms-0">Glass Color:</p>
        <Form.Check
          inline
          className="text-white fw-bolder"
          label="Clear"
          name="glass"
          type="radio"
          defaultChecked={true}
          id={`inline-glassclear`}
          onChange={() => props.changeGlassColor("Clear", 127)}
        />
        <Form.Check
          inline
          className="text-white fw-bolder"
          label="Bronze"
          name="glass"
          type="radio"
          id={`inline-glassbronze`}
          onChange={() => props.changeGlassColor("Bronze", 386)}
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
            <Row>
              <Col>
                <Form.Label className="m-0">
                  <Badge>Long(front and back)</Badge>
                </Form.Label>
                <Form.Select
                  onChange={() =>
                    props.glassPiecesChange(
                      3,
                      pickedShortGlassPcsRef.current.value,
                      pickedLongGlassPcsRef.current.value
                    )
                  }
                  className="mt-1"
                  size="sm"
                  ref={pickedLongGlassPcsRef}
                >
                  <option value="2">2 pcs</option>
                  <option value="1">1 pcs</option>
                </Form.Select>
              </Col>
              <Col>
                <Form.Label className="m-0">
                  <Badge>Short(for sides)</Badge>
                </Form.Label>
                <Form.Select
                  onChange={() =>
                    props.glassPiecesChange(
                      3,
                      pickedShortGlassPcsRef.current.value,
                      pickedLongGlassPcsRef.current.value
                    )
                  }
                  className="mt-1"
                  size="sm"
                  ref={pickedShortGlassPcsRef}
                >
                  <option value="2">2 pcs</option>
                  <option value="1">1 pcs</option>
                  <option value="0">0 pcs</option>
                </Form.Select>
              </Col>
            </Row>
          </div>
        )}
        */

import { useState, useContext } from "react";
import { saveAs } from "file-saver";
import FileSaver from "file-saver";
import axios from "axios";
import fileDownload from "js-file-download";
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
} from "react-bootstrap";
import { MdOutlineLocalSee } from "react-icons/md";
import MyVerticallyCenteredModal from "../Decorations/Modal";
import CustomizerWrapper from "./CustomizerWrapper";
import { LanguageContext } from "../context/language-context";
const CustomizerFirePlaces = (props) => {
  const {
    fireplaces,
    technicalInfo,
    shsSwitcher,
    topSwitcher,
    selected,
    onFillingChange,
    selectedFireplace,
  } = props;
  const lang = useContext(LanguageContext);
  const currencyPriceT = () => {
    return lang.currencyPrice("100", "995", "755");
  };
  const currencyPricePW = () => {
    return lang.currencyPrice("995", "9995", "7555");
  };
  const [showModal, setShowModal] = useState(false);
  const [modalPhoto, setModalPhoto] = useState();
  //return <div className="photo-card">{props.children}</div>;
  const showModalHandler = (image) => {
    setModalPhoto(image);
    setShowModal(true);
    document.body.click();
  };
  const closeModal = () => {
    setShowModal(false);
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
              {technicalInfo.bottomsize} mm
            </Badge>
          </h6>
        </Col>
      </Row>
      <Row>
        <Col>
          <h6>
            Hole Size:
            <Badge className="float-end" bg="secondary">
              {technicalInfo.holesize} mm
            </Badge>
          </h6>
        </Col>
      </Row>
      <Row>
        <Button
          className="p-0"
          size="sm"
          onClick={() => showModalHandler(technicalInfo.technical_image[0].src)}
        >
          Technical Drawing
          <MdOutlineLocalSee className="ms-2" />
        </Button>
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
          {lang.currencySymbol()} for this option
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
          {lang.currencySymbol()} for this option.
        </p>
      </Popover.Body>
    </Popover>
  );

  const filing = (
    <>
      <Form.Check
        className="mt-3"
        disabled={!selectedFireplace.selectedLength}
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
        onChange={() => onFillingChange("EW", "0", "0", "0")}
      />
      <Form.Check
        inline
        disabled={!selectedFireplace.selectedLength}
        label={
          <OverlayTrigger placement="bottom" overlay={popoverT}>
            <p>T</p>
          </OverlayTrigger>
        }
        name="group1"
        type="radio"
        id={`inline--1T`}
        onChange={() => onFillingChange("T", "100", "995", "755")}
      />
      <Form.Check
        inline
        disabled={!selectedFireplace.selectedLength}
        label={
          <OverlayTrigger placement="bottom" overlay={popoverPW}>
            <p>PW</p>
          </OverlayTrigger>
        }
        name="group1"
        type="radio"
        id={`inline--1PW`}
        onChange={() => onFillingChange("PW", "995", "9995", "7555")}
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
      id="dropdown-fireplaces-button"
      variant="primary"
      className="fw-bold"
      title={selectedFireplace.name}
    >
      {fireplacesDropDownItems}
    </DropdownButton>
  );
  const fireplaceLengths = selectedFireplace.variant
    ? selectedFireplace.variant.map((item) => (
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
              item.SEK_price.value,
              item.holesize.value,
              item.bottomsize.value,
              item.technical_image,
              item.drawing3d
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
      id="dropdown-fireplacelength-button"
      variant="primary"
      disabled={!selected}
      title={selectedFireplace.length}
    >
      {fireplaceLengths}
    </DropdownButton>
  );
  const downloadFile = (url, filename) => {
    //console.log(url);
    axios
      .get(url, {
        responseType: "blob",
      })
      .then((res) => {
        fileDownload(res.data, filename);
      });
    //console.log("done");
    //FileSaver.saveAs(url, "image.jpg");
    //window.location.href = { url };
  };
  return (
    <>
      {" "}
      <MyVerticallyCenteredModal
        image={modalPhoto}
        show={showModal}
        closemodal={() => closeModal()}
        Footer={
          <Button
            //href={selectedFireplace.variant_details.technical_PDF}
            variant="info"
            className="text-white"
            onClick={() =>
              downloadFile(
                technicalInfo.technical_PDF.value,
                `${selectedFireplace.name} ${selectedFireplace.length}.pdf`
              )
            }
          >
            Download PDF
          </Button>
        }
      ></MyVerticallyCenteredModal>
      <CustomizerWrapper
        cssClass="card-deco mt-3 fireplace-customizer"
        selectedItem={selectedFireplace}
        itemDropDown={fireplacesDropDown}
        lengthDropDown={fireplacesLengthDropDown}
        selectedPrice={lang.currencyPrice(
          selectedFireplace.priceEUR,
          selectedFireplace.priceSEK,
          selectedFireplace.priceDKK
        )}
        popoverInfo={popoverInfo}
        selected={selected}
        pictureheigth={280}
      >
        <>
          {selected && selectedFireplace.name !== "DFM" ? (
            <Row>
              <Col>
                <Form>
                  <Form.Check
                    disabled={!selectedFireplace.selectedLength}
                    className="text-white mt-2"
                    type="switch"
                    id="custom-switch"
                    variant="secondary"
                    onChange={shsSwitcher}
                    label="Smart Home System"
                  />
                  <Form.Check
                    disabled={!selectedFireplace.selectedLength}
                    className="text-white mt-2 mb-2"
                    type="switch"
                    id="custom-switch"
                    variant="secondary"
                    onChange={topSwitcher}
                    label="Stainless Top"
                  />
                </Form>
                <p className="text-white fw-bold">
                  Remember to pick Bio-Ethanol fuel!
                </p>
              </Col>
              <Col>
                <Col>
                  {" "}
                  <Badge className="text-wrap" bg="info">
                    Standard:
                  </Badge>
                  <ul>
                    <li>
                      <Badge className="text-wrap">Remote Control</Badge>
                    </li>{" "}
                    <li>
                      <Badge className="text-wrap">
                        Longest burning time on the market 20 hours
                      </Badge>
                    </li>
                    <li>
                      <Badge>Black Top</Badge>
                    </li>
                    <li>
                      <Badge>Support even after varanty expires!</Badge>
                    </li>
                  </ul>
                </Col>
              </Col>
            </Row>
          ) : null}
          {selected && selectedFireplace.name === "DFM" ? (
            <Row>
              <Col className="pe-0 mt-4">
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
                {selectedFireplace.name === "DFM" && selected ? filing : null}
              </Col>
              <Col className="pe-0 mt-4">
                {" "}
                <Badge bg="info">Standard:</Badge>
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
                    <Badge className="text-wrap">
                      Support even after varanty expires!
                    </Badge>
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

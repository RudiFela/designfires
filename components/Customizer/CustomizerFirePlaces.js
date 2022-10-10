import { useState, useContext } from "react";
import axios from "axios";
import fileDownload from "js-file-download";
import { FaTruck } from "react-icons/fa";
import { GiElectric, GiAutoRepair } from "react-icons/gi";
import { IoWaterOutline } from "react-icons/io";
import { ImFire } from "react-icons/im";
import { MdWaterDrop } from "react-icons/md";
import { BiTimer } from "react-icons/bi";
import {
  CgArrowsMergeAltV,
  CgArrowsShrinkH,
  CgArrowsShrinkV,
  CgArrowsExpandRight,
} from "react-icons/cg";
import logo from "../../assets/RDGood.svg";
import Image from "next/image";
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
  Stack,
  ButtonGroup,
} from "react-bootstrap";
import { MdOutlineLocalSee } from "react-icons/md";
import MyVerticallyCenteredModal from "../Decorations/Modal";
import CustomizerWrapper from "./CustomizerWrapper";
import { LanguageContext } from "../context/language-context";
import LanguageSwitcher from "../UI/LanguageSwitcher/LanguageSwitcher";
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
  const [mountTitle, setMountTitle] = useState("Mount");
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
          <h6 className="fw-bold">
            Power/h KW:
            <Badge className="float-end ms-2" bg="secondary">
              <GiElectric />
              {technicalInfo.power}
            </Badge>
          </h6>
        </Col>
      </Row>
      <Row>
        <Col>
          <h6 className="fw-bold">
            Liters/h:
            <Badge className="float-end" bg="secondary">
              <MdWaterDrop /> {technicalInfo.liters}
            </Badge>
          </h6>
        </Col>
      </Row>
      <Row>
        <Col>
          <h6 className="fw-bold">
            Burning Time/h:
            <Badge className="float-end ms-2" bg="secondary">
              <BiTimer /> {technicalInfo.burningtime}
            </Badge>
          </h6>
        </Col>
      </Row>

      <Row>
        <Col>
          <h6 className="fw-bold">
            Length:
            <Badge className="float-end" bg="secondary">
              <CgArrowsShrinkH className="me-1" />
              {technicalInfo.length}mm
            </Badge>
          </h6>
        </Col>
      </Row>
      <Row>
        <Col>
          <h6 className="fw-bold">
            Width:
            <Badge className="float-end " bg="secondary">
              <CgArrowsExpandRight className="me-1" />
              {technicalInfo.width}mm
            </Badge>
          </h6>
        </Col>
      </Row>
      <Row>
        <Col>
          <h6 className="fw-bold">
            Heigth:
            <Badge className="float-end" bg="secondary">
              <CgArrowsShrinkV />
              {technicalInfo.heigth}mm
            </Badge>
          </h6>
        </Col>
      </Row>
      <Row>
        <Col>
          <h6 className="fw-bold">
            Top Plate Thickess:
            <Badge className="float-end" bg="secondary">
              <CgArrowsMergeAltV /> 3mm
            </Badge>
          </h6>
        </Col>
      </Row>
      <Row>
        <Col>
          <h6 className="fw-bold">
            Bottom Size:
            <Badge className="float-end" bg="secondary">
              {technicalInfo.bottomsize} mm
            </Badge>
          </h6>
        </Col>
      </Row>
      <Row>
        <Col>
          <h6 className="fw-bold">
            Hole Size:
            <Badge className="float-end" bg="secondary">
              {technicalInfo.holesize} mm
            </Badge>
          </h6>
        </Col>
      </Row>

      <Button
        className=""
        size="sm"
        onClick={() => showModalHandler(technicalInfo.technical_image)}
      >
        Technical Drawing
        <MdOutlineLocalSee className="ms-2" />
      </Button>
    </>
  ) : (
    <h6 className="fw-bold">Select Length to see technical params.</h6>
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
      <h5 className="text-white fw-bold mt-3">
        <Badge bg="danger">Filling Type</Badge>
      </h5>
      <Form.Check
        className="mt-1"
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
              item.length.option,
              selectedFireplace.photo,
              item
            );
          }}
          eventKey={item}
        >
          {item.length.option}mm{" "}
          {item.stock_status === "instock" ? <ImFire /> : <GiAutoRepair />}
        </Dropdown.Item>
      ))
    : null;

  const fireplacesLengthDropDown = (
    <DropdownButton
      as={ButtonGroup}
      className="bolder"
      id="dropdown-fireplacelength-button"
      variant="primary"
      disabled={!selected}
      title={
        <>
          {selectedFireplace.length}
          <span> </span>
          {selectedFireplace.stock_status === "instock" ? null : (
            <GiAutoRepair />
          )}
        </>
      }
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

  const dfeOptions =
    selected && selectedFireplace.name !== "DFM" ? (
      <>
        <Form className="mt-3">
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
        <p className="text-white fw-bold">Remember to pick Bio-Ethanol fuel!</p>
      </>
    ) : null;
  const dfeStandard =
    selected && selectedFireplace.name !== "DFM" ? (
      <>
        <ul>
          <li>
            <Badge className="">Remote Control</Badge>
          </li>{" "}
          <li>
            <Badge className="text-wrap text-start">
              Longest burning time on the market 20 hours
            </Badge>
          </li>
          <li>
            <Badge>Black Top</Badge>
          </li>
          <li>
            <Badge>Digital Control with safety sensors</Badge>
          </li>
          <li>
            <Badge>Electronic refueling system</Badge>
          </li>
          <li>
            <Badge>Support even after varanty expires!</Badge>
          </li>
        </ul>
      </>
    ) : null;

  const dfmOptions =
    selected && selectedFireplace.name === "DFM" ? (
      <>
        {" "}
        <Form className="mt-3">
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
        {filing}
      </>
    ) : null;
  const dfmStandard =
    selected && selectedFireplace.name === "DFM" ? (
      <>
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
      </>
    ) : null;
  const oneSideSvg = (
    <svg
      version="1.1"
      viewBox="0 0 84.981 95.918" //viewBox="0 0 84.981 95.918"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="translate(-79.512 115.65)">
        <path
          d="m80.326-115.43a1.6261 1.6261 0 00-.81445 1.4082v45.48a1.6261 1.6261 0 00.8125 1.4082l81.73 47.186a1.6261 1.6261 0 002.4375-1.4082v-45.48a1.6261 1.6261 0 00-.8125-1.4082l-81.729-47.186a1.6261 1.6261 0 00-1.625 0zm2.4375 4.2246 78.477 45.309v41.725l-78.477-45.309z"
          color="#ffffff"
          fillRule="evenodd"
        />
      </g>
    </svg>
  );
  const twoSideSvg = (
    <svg
      version="1.1"
      viewBox="0 0 84.98 116.01"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="translate(-77.201 127.66)">
        <path
          d="m113.5-127.65a1.6261 1.6261 0 00-.69143.21342l-34.795 20.09a1.6261 1.6261 0 00-.38757.32505 1.6261 1.6261 0 00-.09198.12041 1.6261 1.6261 0 00-.18707.32297 1.6261 1.6261 0 00-.05736.13953 1.6261 1.6261 0 00-.08837.49816v45.48a1.6261 1.6261 0 00.09147.51883 1.6261 1.6261 0 00.077.15916 1.6261 1.6261 0 00.17363.30127 1.6261 1.6261 0 00.14314.154 1.6261 1.6261 0 00.24081.20309 1.6261 1.6261 0 00.0863.07235l81.729 47.187a1.6261 1.6261 0 002.4391-1.4082v-45.48a1.6261 1.6261 0 00-.81442-1.4082l-46.119-26.627v-39.24a1.6261 1.6261 0 00-1.7477-1.6216zm-1.5043 4.438v34.547l-29.919-17.274zm-31.543 20.088 31.543 18.211v3.4256l-31.543 18.213zm34.795 20.089 43.682 25.22v41.727l-76.853-44.37 32.359-18.681a1.6261 1.6261 0 00.81236-1.4082z"
          color="#000000"
          fillRule="evenodd"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
  const threeSideSvg = (
    <svg
      version="1.1"
      viewBox="0 0 119.78 116.01"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="translate(-63.205 127.88)">
        <path
          d="m99.504-127.88a1.6261 1.6261 0 00-.69143.21342l-34.795 20.088a1.6261 1.6261 0 00-.38861.32608 1.6261 1.6261 0 00-.091985.11989 1.6261 1.6261 0 00-.18707.32453 1.6261 1.6261 0 00-.056844.13694 1.6261 1.6261 0 00-.088367.50075v45.48a1.6261 1.6261 0 00.091467.51935 1.6261 1.6261 0 00.073898.15348 1.6261 1.6261 0 00.17932.31006 1.6261 1.6261 0 00.13488.14521 1.6261 1.6261 0 00.25218.21239 1.6261 1.6261 0 00.081132.067696l81.728 47.187a1.6261 1.6261 0 00.17466.080099 1.6261 1.6261 0 00.06822.031006 1.6261 1.6261 0 00.41289.094051 1.6261 1.6261 0 00.0894.004134 1.6261 1.6261 0 00.40618-.029972 1.6261 1.6261 0 00.031-.004651 1.6261 1.6261 0 00.39946-.1571 1.6261 1.6261 0 00.04496-.01757l34.795-20.09a1.6261 1.6261 0 00.81236-1.4082v-45.48a1.6261 1.6261 0 00-2.4396-1.4082l-33.981 19.62-45.307-26.159v-39.239a1.6261 1.6261 0 00-1.7482-1.6216zm-1.5038 4.438v34.545l-29.917-17.273 29.917-17.272zm-31.543 20.088 31.543 18.211v3.4251l-31.543 18.211v-39.848zm34.795 20.089 43.682 25.22v41.727l-76.85-44.371 32.356-18.68a1.6261 1.6261 0 00.81287-1.4082v-2.4872zm78.476 7.0089v41.725l-31.543 18.213v-41.727l31.543-18.211z"
          color="#000000"
          fillRule="evenodd"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
  const fourSideSvg = (
    <svg
      version="1.1"
      viewBox="0 0 119.78 116.01"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="translate(-62.967 128.65)">
        <path
          d="m99.107-128.63a1.6261 1.6261 0 00-.53072.19275 1.6261 1.6261 0 00-.81235 1.4082v37.362l-32.357-18.682a1.6261 1.6261 0 00-2.4396 1.4082v45.481a1.6261 1.6261 0 00.81235 1.4082l81.73 47.187a1.6261 1.6261 0 00.09508.034624 1.6261 1.6261 0 00.32091.11627 1.6261 1.6261 0 00.1819.041342 1.6261 1.6261 0 00.37569 0 1.6261 1.6261 0 00.15296-.011369 1.6261 1.6261 0 00.49868-.18087l34.795-20.09a1.6261 1.6261 0 00.04082-.031005 1.6261 1.6261 0 00.25993-.19947 1.6261 1.6261 0 00.04548-.038758 1.6261 1.6261 0 00.23254-.30334 1.6261 1.6261 0 00.04134-.080099 1.6261 1.6261 0 00.11524-.27699 1.6261 1.6261 0 00.02946-.10077 1.6261 1.6261 0 00.04961-.37775v-45.48a1.6261 1.6261 0 00-.09509-.53847 1.6261 1.6261 0 00-.01498-.038757 1.6261 1.6261 0 00-.26097-.4501 1.6261 1.6261 0 00-.02222-.028422 1.6261 1.6261 0 00-.43408-.36018l-81.715-47.178a1.6261 1.6261 0 00-1.0945-.19275zm1.9089 4.4173 76.85 44.37-31.543 18.212-45.307-26.159v-36.423zm-34.797 20.088 31.545 18.212v4.3636a1.6261 1.6261 0 00.81235 1.4082l46.119 26.627v36.424l-78.476-45.309v-41.726zm34.797 20.09 43.68 25.219v1.5477l-43.68-25.218v-1.5487zm78.476 7.0078v39.848l-31.545-18.212v-3.4251l31.545-18.211zm-31.545 25.391 29.918 17.273-29.918 17.274v-34.547z"
          color="#000000"
          fillRule="evenodd"
          strokeLinejoin="round"
          // fill="white"
        />
      </g>
    </svg>
  );
  const allSideSvg = (
    <svg
      version="1.1"
      viewBox="0 0 119.78 116.01"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        transform="translate(-49.198 -105.42)"
        //fill="none"
        stroke="#000000"
        color="#000000"
        fillRule="evenodd"
        strokeLinejoin="round"
      >
        <path d="m50.824 172.62 34.795-20.089v-45.48l-34.795 20.089z" />
        <path d="m85.62 152.53v-45.48l81.729 47.186v45.48z" />
        <path d="m50.824 172.62v-45.48l81.729 47.186v45.481z" />
        <path d="m132.55 219.8 34.796-20.089v-45.48l-34.796 20.089z" />
      </g>
    </svg>
  );
  const onSelectMountType = (setPieces, svgElement) => {
    setPieces();
    setMountTitle(svgElement);
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
                technicalInfo.technical_PDF,
                `${selectedFireplace.name} ${selectedFireplace.length}.pdf`
              )
            }
          >
            Download PDF
          </Button>
        }
      ></MyVerticallyCenteredModal>
      <div style={{ borderRadius: 35 }} className="bg-success p-3 ">
        <Row className="p-1">
          <Col className="mb-2">
            <Image
              className="card-image-bottom"
              style={{ maxheigth: "50vh", borderRadius: 35 }}
              alt="photocard-picture"
              src={selectedFireplace.photo}
              height={380}
              width={600}
            />
            <span>
              <Badge className="m-0 text-white" bg="info">
                <ImFire />
                <span> </span>
                On Stock - Standard delivery time 5 days
              </Badge>
            </span>{" "}
            <span>
              <Badge className="m-0 mt-1 p-1 text-white text-wrap" bg="info">
                <GiAutoRepair />
                <span> </span>Custom Variant - Longer delivery time 50-60 days,
                higher price
              </Badge>
            </span>
          </Col>
          <Col>
            <Row>
              <Col>
                <h3 className="text-white">
                  <Badge bg="danger">Select Fireplace</Badge>
                </h3>

                <ButtonGroup className="mt-2">
                  {fireplacesDropDown}
                  {fireplacesLengthDropDown}
                  <DropdownButton
                    id="dropdown-basic-button"
                    title={mountTitle}
                    variant="info"
                  >
                    <Dropdown.Item
                      className="text-white customizer p-3"
                      onClick={() =>
                        onSelectMountType(
                          () => props.glassPiecesChange(3, "0", "1"),
                          oneSideSvg
                        )
                      }
                    >
                      {oneSideSvg}
                    </Dropdown.Item>
                    <Dropdown.Item
                      className="text-white customizer p-3"
                      onClick={() =>
                        onSelectMountType(
                          () => props.glassPiecesChange(3, "1", "1"),
                          twoSideSvg
                        )
                      }
                    >
                      {twoSideSvg}
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() =>
                        onSelectMountType(
                          () => props.glassPiecesChange(3, "2", "1"),
                          threeSideSvg
                        )
                      }
                      className="text-white customizer p-3"
                    >
                      {threeSideSvg}
                    </Dropdown.Item>
                    <Dropdown.Item
                      className="text-white customizer p-3"
                      style={{ width: "90px" }}
                      onClick={() =>
                        onSelectMountType(
                          () => props.glassPiecesChange(3, "1", "2"),
                          fourSideSvg
                        )
                      }
                    >
                      {fourSideSvg}
                    </Dropdown.Item>
                    <Dropdown.Item
                      className="text-white customizer p-3"
                      style={{ width: "90px" }}
                      onClick={() =>
                        onSelectMountType(
                          () => props.glassPiecesChange(3, "2", "2"),
                          allSideSvg
                        )
                      }
                    >
                      {allSideSvg}
                    </Dropdown.Item>
                  </DropdownButton>
                </ButtonGroup>
                <Stack gap={2} className="col-md-10 mt-2 mb-2">
                  <ButtonGroup>
                    <Button
                      //as="Badge"
                      className="bolder"
                      variant="primary"

                      //disabled
                    >
                      {Number(
                        lang.currencyPrice(
                          selectedFireplace.priceEUR,
                          selectedFireplace.priceSEK,
                          selectedFireplace.priceDKK
                        )
                      ).toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}{" "}
                      {lang.currencySymbol()}
                      {selectedFireplace.stock_status === "instock" ? null : (
                        <p className="m-0 p-0 text-info">
                          +
                          {Number(
                            lang.currencyPrice(
                              selectedFireplace.variant_details
                                .manufacture_cost_EUR,
                              selectedFireplace.variant_details
                                .manufacture_cost_SEK,
                              selectedFireplace.variant_details
                                .manufacture_cost_DKK
                            )
                          ).toLocaleString(undefined, {
                            maximumFractionDigits: 2,
                          })}
                          {lang.currencySymbol()}
                        </p>
                      )}
                    </Button>
                    <LanguageSwitcher />
                  </ButtonGroup>
                  <OverlayTrigger
                    //ref={overlayRef}
                    //trigger={["hover", "focus"]}
                    trigger="click"
                    placement="bottom"
                    overlay={popover}
                    //delay={{ show: 250, hide: 1600 }}
                    rootClose
                  >
                    <Button size="sm">Technical Info</Button>
                  </OverlayTrigger>
                </Stack>
              </Col>
              <Col>
                <h3 className="text-white">
                  <Badge bg="danger">Extra options</Badge>
                </h3>
                {dfeOptions}
                {dfmOptions}

                <h5 className="text-white fw-bold">
                  <Badge bg="danger">Glass Color:</Badge>
                </h5>
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
              </Col>
            </Row>
            <Row className="mt-3">
              <Col>
                {" "}
                <h3 className="text-white">
                  <Badge bg="danger">Standard</Badge>
                </h3>
                {selected && selectedFireplace.name !== "DFM"
                  ? dfeStandard
                  : null}
                {dfmStandard}
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
};
export default CustomizerFirePlaces;
/* OLD WRAPPER

 <CustomizerWrapper
        cssClass="card-deco mt-3 fireplace-customizer w-100"
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
                      <Badge className="">Remote Control</Badge>
                    </li>{" "}
                    <li>
                      <Badge className="text-wrap text-start">
                        Longest burning time on the market 20 hours
                      </Badge>
                    </li>
                    <li>
                      <Badge>Black Top</Badge>
                    </li>
                    <li>
                      <Badge>Digital Control with safety sensors</Badge>
                    </li>
                    <li>
                      <Badge>Electronic refueling system</Badge>
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
              <Col className="pe-0 ">
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
              <Col className="pe-0 ">
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
          <span>
            <Badge className="m-0 text-white" bg="info">
              <ImFire />
              <span> </span>
              On Stock - Standard delivery time 5 days
            </Badge>
          </span>{" "}
          <span>
            <Badge className="m-0 mt-1 p-1 text-white text-wrap" bg="info">
              <GiAutoRepair />
              <span> </span>Custom Variant - Longer delivery time 50-60 days,
              higher price
            </Badge>
          </span>
        </>
      </CustomizerWrapper> 

      */

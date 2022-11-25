import { Row, Col, Badge, Button, Ratio } from "react-bootstrap";
import ImageGallery from "react-image-gallery";
import fileDownload from "js-file-download";
import Dimensions from "../UI/Dimensions";
import Image from "next/image";
import { BsCheckSquare, BsXSquare } from "react-icons/bs";
const ModalInfoLayout = (props) => {
  const { ...item } = props.item;
  const openInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };
  const prepareGallery = (array) => {
    let imagesArray = [];
    array.forEach((image) =>
      imagesArray.push({
        original: image.shop_single,
        thumbnail: image.shop_thumbnail,
      })
    );
    //console.log(imagesArray);

    return imagesArray;
  };
  return (
    <div className="text-white fw-bold">
      <h2 className="fs-2 text-center">{item.name}</h2>
      <Row className="my-3 fs-5" xs={1} md={1} lg={2}>
        <Col className="my-4">
          <ImageGallery
            style={{ borderRadius: "25px" }}
            items={prepareGallery(item.images)}
            showPlayButton={false}
            showFullscreenButton={false}
            showThumbnails={false}
            showBullets={true}
          />
        </Col>
        <Col>
          <Row className="my-3">
            <Badge bg="info" className="fs-4 mb-2" bg="success">
              General Information
            </Badge>
            <span>
              Rated output (kW)
              <Badge bg="info" className="float-end">
                {" "}
                <span> </span> {item.acf.kw}
              </Badge>
            </span>
            <span>
              Heating power range (kW)
              <Badge bg="info" className="float-end">
                {" "}
                <span> </span> {item.acf.power_range}
              </Badge>
            </span>
            <span>
              Material
              <Badge bg="info" className="float-end">
                {" "}
                <span> </span> {item.acf.material}
              </Badge>
            </span>
            <span>
              Heating efficiency (%)
              <Badge bg="info" className="float-end">
                {" "}
                <span> </span> {item.acf.heating_efficiency}
              </Badge>
            </span>
            <span>
              Fuel type
              <Badge bg="info" className="float-end ">
                {" "}
                <span> </span> {item.acf.fuel_type}
              </Badge>
            </span>
            <span>
              Exhaust gas temperature (℃)
              <Badge bg="info" className="float-end">
                {" "}
                <span> </span> {item.acf.gas_temperature}
              </Badge>
            </span>
            <span>
              Max length of logs (cm)
              <Badge bg="info" className="float-end">
                {" "}
                <span> </span> {item.acf.lenght_of_logs}
              </Badge>
            </span>
            <span>
              Min outlet grids active field (cm2)
              <Badge bg="info" className="float-end">
                {" "}
                <span> </span> ≥700
              </Badge>
            </span>
            <span>
              Min inlet grids active field (cm2)
              <Badge bg="info" className="float-end">
                {" "}
                <span> </span> ≥500
              </Badge>
            </span>
            <span>
              Glazing type
              <Badge bg="info" className="float-end">
                {" "}
                <span> </span> {item.acf.glazing_type}
              </Badge>
            </span>
            <span>
              Door opening system
              <Badge bg="info" className="float-end">
                {" "}
                <span> </span> {item.acf.door_opening_system}
              </Badge>
            </span>
          </Row>
        </Col>

        <Col>
          <Row>
            <Badge bg="info" className="fs-4 mb-2" bg="success">
              Basic dimensions
            </Badge>
          </Row>
          <Dimensions
            length={item.dimensions.length}
            height={item.dimensions.height}
            width={item.dimensions.width}
            variant="info"
            unity="cm"
          >
            <span>
              Weight (kg)
              <Badge bg="info" className="float-end">
                {" "}
                <span> </span> Weight (kg)
              </Badge>
            </span>
            <span>
              Exhaust outlet diameter
              <Badge bg="info" className="float-end">
                {" "}
                <span> </span> {item.acf.exhaust_diameter} mm
              </Badge>
            </span>
            <span>
              Type:
              <Badge bg="info" className="float-end">
                {" "}
                <span> </span> {item.acf.type}
              </Badge>
            </span>
          </Dimensions>
        </Col>
        <Col>
          {" "}
          <Row>
            <Badge bg="info" className="fs-4 mb-2" bg="success">
              Energetic efficiency
            </Badge>
            <span>
              Energy class
              <Badge bg="info" className="float-end">
                {" "}
                <span> </span> {item.acf.energy_class}
              </Badge>
            </span>
            <span>
              Energy efficiency index (EEI)
              <Badge bg="info" className="float-end">
                {" "}
                <span> </span> {item.acf.energy_efficiency_index}
              </Badge>
            </span>
            <span>
              CO emissions (at 13% O 2 ) ≤ given in %
              <Badge bg="info" className="float-end">
                {" "}
                <span> </span> {item.acf.co_emissions}
              </Badge>
            </span>
            <span>
              Dust emission (mg/Nm3)
              <Badge bg="info" className="float-end">
                {" "}
                <span> </span> {item.acf.dust_emission}
              </Badge>
            </span>
          </Row>
        </Col>
        <Col>
          {" "}
          <Row>
            <Badge bg="info" className="fs-4 my-2" bg="success">
              Certificates / Compliance
            </Badge>
            <span>
              ECODESIGN compliance
              <Badge bg="info" className="float-end">
                {" "}
                <span> </span>{" "}
                {item.acf.ekoprojekt ? <BsCheckSquare /> : <BsXSquare />}
              </Badge>
            </span>
            <span>
              Suitable for recuperation
              <Badge bg="info" className="float-end">
                {" "}
                <span> </span>{" "}
                {item.acf.recuperation ? <BsCheckSquare /> : <BsXSquare />}
              </Badge>
            </span>
            <span>
              BImSchV 2 compliance
              <Badge bg="info" className="float-end">
                {" "}
                <span> </span>{" "}
                {item.acf.blmshv ? <BsCheckSquare /> : <BsXSquare />}
              </Badge>
            </span>
          </Row>
        </Col>
        <Col>
          {" "}
          <Row>
            <Badge bg="info" className="fs-4 my-2" bg="success">
              Equipment
            </Badge>
            <span>
              External air inlet
              <Badge bg="info" className="float-end">
                {" "}
                <span> </span>{" "}
                {item.acf.air_inlet ? <BsCheckSquare /> : <BsXSquare />}
              </Badge>
            </span>
            <span>
              Combustion chamber lining
              <Badge bg="info" className="float-end">
                {" "}
                <span> </span>{" "}
                {item.acf.chamber_lining ? (
                  <BsCheckSquare />
                ) : (
                  <BsFillXSquare />
                )}
              </Badge>
            </span>
            <span>
              Ash pan
              <Badge bg="info" className="float-end">
                {" "}
                <span> </span>{" "}
                {item.acf.ash_pan ? <BsCheckSquare /> : <BsXSquare />}
              </Badge>
            </span>
          </Row>
        </Col>
      </Row>

      <Button
        variant="success"
        variant="info"
        className="text-white"
        onClick={() => openInNewTab(item.acf.technical_drawing.url)}
      >
        Technical Drawing
      </Button>
    </div>
  );
};
export default ModalInfoLayout;

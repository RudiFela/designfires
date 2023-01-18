import { useContext } from "react";

import { Row, Col, Badge, Button, Ratio, Container } from "react-bootstrap";
import LanguageSwitcher from "../UI/LanguageSwitcher/LanguageSwitcher";
import ImageGallery from "react-image-gallery";
import { LanguageContext } from "../context/language-context";

import Dimensions from "../UI/Dimensions";

import { motion } from "framer-motion";
import { BsCheckSquare, BsXSquare } from "react-icons/bs";
import VentilationGridsPicker from "./VentilationGridsPicker";
const ProductLayout = (props) => {
  const language = useContext(LanguageContext);
  const { ...item } = props.item;
  const openInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const prepareGallery = (array) => {
    let imagesArray = [];
    //śconsole.log(array);
    array.map((image) =>
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
      <Container>
        <Row className="justify-content-around">
          <Col md={6}>
            {" "}
            <ImageGallery
              style={{ borderRadius: "25px" }}
              items={prepareGallery(props.gallery)}
              showPlayButton={false}
              showFullscreenButton={true}
              showThumbnails={item.variant.length > 0 ? false : true}
              showBullets={true}
            />
            {item.variant.length > 0 ? (
              <Row className="mt-4" xs={3}>
                {item.variant.map((item) => (
                  <Col key={item.id} className="flex justify-content-start p-2">
                    <div
                      style={{ borderRadius: "15px" }}
                      className="bg-success"
                    >
                      <motion.div whileHover={{ scale: 1.1 }}>
                        <div className="pt-3 text-center fs-5 text-uppercase">
                          {item.length.option}
                        </div>
                        <Ratio aspectRatio="1x1">
                          <>
                            <a href={`${item.id}`}>
                              <img
                                width="100%"
                                height="100%"
                                src={item.img}
                                style={{ cursor: "pointer" }}
                                //onClick={() => props.onVariantPick(item.id)}
                                //onMouseEnter={() => console.log(item.length.option)}
                              />
                            </a>
                          </>
                        </Ratio>{" "}
                      </motion.div>
                    </div>
                  </Col>
                ))}
              </Row>
            ) : null}
          </Col>
          <Col md="auto" className="fs-4  d-flex justify-content-center">
            <div className="m-1 p-2 ">
              <h1 className="fw-bolder my-5">{item.name}</h1>
              <div>
                <Row className="justify-content-center">
                  <Col
                    className="fs-4   d-flex justify-content-center my-auto "
                    md={4}
                  >
                    {item.variant.length > 0 ? (
                      <span>Pick Variant to check price</span>
                    ) : (
                      <>
                        {Number(
                          language.currencyPrice(
                            item.price,
                            item.priceSEK,
                            item.priceDKK
                          )
                        ).toLocaleString(undefined, {
                          maximumFractionDigits: 2,
                        })}
                        <span> </span>
                        {language.currencySymbol()}
                      </>
                    )}
                  </Col>
                  <Col md={3}>
                    <LanguageSwitcher style={{ borderRadius: "15px" }} />
                  </Col>
                </Row>
              </div>
              <Col className="m-5">
                <span className="fs-5">
                  Delivery time: {item.pro === "K" ? "90" : "30"} days
                </span>
              </Col>
            </div>
          </Col>
        </Row>

        <Row className="my-3 fs-5" xs={1} md={1} lg={2}>
          <Col className="px-3">
            <Row className="my-3">
              <Badge className="fs-4 mb-2" bg="success">
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
                  <span> </span>{" "}
                  {item.acf.material === "" ? "--" : item.acf.material}
                </Badge>
              </span>
              <span>
                Heating efficiency (%)
                <Badge bg="info" className="float-end">
                  {" "}
                  <span> </span>{" "}
                  {item.acf.heating_efficiency === ""
                    ? "--"
                    : item.acf.heating_efficiency}
                </Badge>
              </span>
              <span>
                Fuel type
                <Badge bg="info" className="float-end ">
                  {" "}
                  <span> </span>{" "}
                  {item.acf.fuel_type === "" ? "--" : item.acf.fuel_type}
                </Badge>
              </span>
              <span>
                Exhaust gas temperature (℃)
                <Badge bg="info" className="float-end">
                  {" "}
                  <span> </span>{" "}
                  {item.acf.gas_temperature === ""
                    ? "--"
                    : item.acf.gas_temperature}
                </Badge>
              </span>
              <span>
                Max length of logs (cm)
                <Badge bg="info" className="float-end">
                  {" "}
                  <span> </span>{" "}
                  {item.acf.lenght_of_logs === ""
                    ? "--"
                    : item.acf.lenght_of_logs}
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
                  <span> </span>{" "}
                  {item.acf.glazing_type === "" ? "--" : item.acf.glazing_type}
                </Badge>
              </span>
              <span>
                Door opening system
                <Badge bg="info" className="float-end">
                  {" "}
                  <span> </span>{" "}
                  {item.acf.door_opening_system === ""
                    ? "--"
                    : item.acf.door_opening_system}
                </Badge>
              </span>
            </Row>
          </Col>

          <Col className="px-3 mt-3">
            <Row>
              <Badge className="fs-4 mb-2" bg="success">
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
          <Col className="px-3">
            {" "}
            <Row>
              <Badge className="fs-4 mb-2" bg="success">
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
          <Col className="px-3">
            {" "}
            <Row>
              <Badge className="fs-4 mb-2" bg="success">
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
          <Col className="px-3">
            {" "}
            <Row>
              <Badge className="fs-4 my-2" bg="success">
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
                  {item.acf.chamber_lining ? <BsCheckSquare /> : <BsXSquare />}
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
          variant="info"
          className="text-white"
          onClick={() => openInNewTab(item.acf.technical_drawing.url)}
        >
          Technical Drawing
        </Button>
      </Container>
    </div>
  );
};
export default ProductLayout;
/*
 <Link //href={`/wood/${item.id}`}
                              href={"[productId]"}
                              as={`${item.id}`}
                              passHref


                                <VentilationGridsPicker
          item={item}
          ventilationGrids={props.ventilationGrids}
        />
                            >*/

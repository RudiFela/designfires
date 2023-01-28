import { useContext, useEffect } from "react";
import Image from "next/image";
import {
  Row,
  Col,
  Badge,
  Button,
  Ratio,
  Container,
  Stack,
} from "react-bootstrap";
import LanguageSwitcher from "../UI/LanguageSwitcher/LanguageSwitcher";
import ImageGallery from "react-image-gallery";
import { LanguageContext } from "../context/language-context";
import { motion, useAnimation } from "framer-motion";
import Dimensions from "../UI/Dimensions";
import { BsInfoCircle, BsCheckSquare, BsXSquare } from "react-icons/bs";
import VentilationGridsPicker from "./VentilationGridsPicker";
import SelectFireplace from "./SelectFireplace";
const ProductLayout = (props) => {
  useEffect(() => {
    const intervalId = setInterval(() => {
      sequence();
    }, 2000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  const animation = useAnimation();
  async function sequence() {
    await animation.start({ scale: 1.2 });

    animation.start({ scale: 1 });
  }
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
        <h1 className="text-center fw-bold">{item.name}</h1>
        <Stack gap={3}>
          <div className="d-flex justify-content-center w-100">
            <ImageGallery
              style={{ borderRadius: "25px" }}
              items={prepareGallery(props.gallery)}
              showPlayButton={false}
              showFullscreenButton={true}
              showThumbnails={item.variant.length > 0 ? false : true}
              showBullets={true}
            />
          </div>
          <div md="auto" className="fs-4  d-flex justify-content-center">
            <div className="m-1 p-2 ">
              <div>
                <Col className="fs-4   d-flex justify-content-center my-auto ">
                  {item.variant.length > 0 ? (
                    <h1 className="fw-bold">Pick Variant to check price!</h1>
                  ) : (
                    <Stack gap={3}>
                      <Row className="text-center">
                        <Col>
                          <Badge bg="info" className="fs-4 m-2">
                            {Number(
                              language.currencyPrice(
                                item.price,
                                item.SEK_price,
                                item.DKK_price
                              )
                            ).toLocaleString(undefined, {
                              maximumFractionDigits: 2,
                            })}
                            {language.currencySymbol()}
                          </Badge>
                        </Col>
                        <Col>
                          <LanguageSwitcher style={{ borderRadius: "15px" }} />
                        </Col>
                      </Row>

                      <span className="fs-5 m-2">
                        Delivery time: {item.pro === "K" ? "90" : "30"} days
                      </span>
                      <Button
                        variant="info"
                        className="text-white fw-bold fs-5"
                        onClick={() =>
                          openInNewTab(item.acf.technical_drawing.url)
                        }
                      >
                        <BsInfoCircle className="m-1" />{" "}
                        <span>Technical Drawing</span>
                      </Button>
                    </Stack>
                  )}
                </Col>
              </div>
            </div>
          </div>
          <div>
            {item.variant.length > 0 ? (
              <Row xs={3} sm={4} md={6} lg={8}>
                {item.variant.map((item) => (
                  <Col key={item.id} className="flex justify-content-start p-2">
                    <div
                      style={{ borderRadius: "15px" }}
                      className="bg-success"
                    >
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        animate={animation}
                        onTap={sequence}
                      >
                        <div className="pt-3 text-center fs-5 text-uppercase">
                          {item.length.option}
                        </div>
                        <Ratio aspectRatio="1x1">
                          <>
                            <a href={`${item.id}`}>
                              <Image
                                width="100%"
                                height="100%"
                                src={item.img}
                                style={{ cursor: "pointer" }}
                                alt="product image"
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
          </div>
        </Stack>

        {item.variant.length === 0 &&
        item.pro === "H" &&
        item.acf.type === "build-in" ? (
          <VentilationGridsPicker
            item={item}
            ventilationGrids={props.ventilationGrids}
          />
        ) : (
          item.variant.length === 0 && <SelectFireplace item={item} />
        )}

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
                  <span> </span>{" "}
                  {item.acf.outlet_grids !== ""
                    ? `≥${item.acf.outlet_grids}`
                    : "≥700"}
                </Badge>
              </span>
              <span>
                Min inlet grids active field (cm2)
                <Badge bg="info" className="float-end">
                  {" "}
                  <span> </span>{" "}
                  {item.acf.inlet_grids !== ""
                    ? `≥${item.acf.inlet_grids}`
                    : "≥500"}
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


                               
                            >*/

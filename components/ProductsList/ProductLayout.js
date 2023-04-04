import { useContext, useEffect, useRef, createRef } from "react";
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
import { BsInfoCircle } from "react-icons/bs";
import VentilationGridsPicker from "./VentilationGridsPicker";
import SelectFireplace from "./SelectFireplace";

import ProductInfoSection from "./ProductInfoSection";
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
  const galleryRef = useRef();
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
              ref={galleryRef}
              style={{ borderRadius: "25px" }}
              items={prepareGallery(props.gallery)}
              showPlayButton={false}
              showFullscreenButton={true}
              showThumbnails={item.variant.length > 0 ? false : true}
              showBullets={true}
              onClick={() => galleryRef.current.fullScreen()}
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
                          openInNewTab(
                            item.acf.technicaldrawingpdf
                              ? item.acf.technicaldrawingpdf
                              : item.meta_data.find((data) => data.key === "3d")
                                  .value
                          )
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
                              <img
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

        <ProductInfoSection
          item={item}
          equipment={props.equipment}
          energetic={props.energetic}
          certificates={props.certificates}
          ventGrids={props.ventGrids}
        />
        <hr />
      </Container>
    </div>
  );
};
ProductLayout.defaultProps = {
  ventGrids: true,
  energetic: true,
  equipment: true,
  certificates: true,
};
export default ProductLayout;
/*
 <Link //href={`/wood/${item.id}`}
                              href={"[productId]"}
                              as={`${item.id}`}
                              passHref

openInNewTab(
                            item.acf.technicaldrawingpdf
                              ? item.acf.technicaldrawingpdf
                              : item.meta_data.find((data) => (data.key = "3d"))
                                  .value
                          )
                               
                            >*/

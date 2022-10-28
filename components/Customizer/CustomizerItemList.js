import { useContext } from "react";
import Image from "next/image";
import HoverVideoPlayer from "react-hover-video-player";
import { motion } from "framer-motion";
import { LanguageContext } from "../context/language-context";
import {
  Button,
  ListGroup,
  Figure,
  Stack,
  Ratio,
  Row,
  Col,
  Card,
  CardImg,
} from "react-bootstrap";
const CustomizerItemList = (props) => {
  const lang = useContext(LanguageContext);
  const list = props.ItemToList;
  //const { FireplaceLength } = props;

  const switchCurrency = (item) => {
    switch (lang.language) {
      case "swedish":
        const priceSEK = item.meta_data.find(
          (key) =>
            key.key === "_alg_currency_switcher_per_product_regular_price_SEK"
        );
        return priceSEK.value;
      case "english":
        return item.price;

      case "danish":
        const priceDKK = item.meta_data.find(
          (key) =>
            key.key === "_alg_currency_switcher_per_product_regular_price_DKK"
        );
        return priceDKK.value;
    }
  };
  return (
    <Row xs="1" md="2" lg="3">
      {list.map((item) => (
        <Col key={item.id} className="d-flex justify-content-center text-white">
          <motion.div whileHover={{ scale: 1.02 }}>
            <Card
              bg="primary"
              style={{ maxWidth: "22rem", borderRadius: "25px" }}
              className="m-1"
            >
              <div className="m-1 p-3" style={{ height: "180px" }}>
                <HoverVideoPlayer
                  videoSrc={item.acf.movie_of_decoration_product}
                  videoStyle={{
                    borderRadius: "25px",
                    objectFit: "cover",
                    heigth: "250px",
                  }}
                  pausedOverlay={
                    <>
                      <Ratio aspectRatio="16x9">
                        <Image
                          src={item.images[0].woocommerce_single}
                          alt=""
                          layout="fill"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            borderRadius: "25px",
                          }}
                        />
                      </Ratio>
                    </>
                  }
                />
              </div>

              <Card.Body className="m-2">
                <Card.Title className="fs-5 mb-3 fw-bolder text-center px-3">
                  <div style={{ height: "80px" }}> {item.name}</div>
                </Card.Title>
                <Card.Text>
                  <span className="align-self-center float-end fw-bold fs-4">
                    {Number(switchCurrency(item)).toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
                    <span> </span>
                    {lang.currencySymbol()}{" "}
                  </span>
                </Card.Text>
                <Button
                  onClick={() => {
                    props.onAdd(
                      item,

                      //switchCurrency(item, lang),
                      item.name,
                      item.id,
                      item.images[0].woocommerce_gallery_thumbnail
                    );
                  }}
                  variant="success"
                >
                  ADD
                </Button>{" "}
                <span className="m-2 fw-bold">x0</span>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
      ))}{" "}
    </Row>
  );
};
export default CustomizerItemList;
//€
/* 
 <Button
              //active={true} button
              size="sm"
              className="w-100 btn-custom text-white pb-2"
              onClick={() => {
                props.onAdd(
                  item,

                  //switchCurrency(item, lang),
                  item.name,
                  item.id,
                  item.images[0].woocommerce_gallery_thumbnail
                );
              }}
              variant="outline-danger"
            >
              <span id={item.id} className="anchor "></span>
              <Stack className="fs-6" direction="horizontal" gap={4}>
                <div>
                  <Figure className="m-0">
                    <Image
                      className="figure-round figure-img img-fluid"
                      width={100}
                      height={100}
                      src={item.images[0].woocommerce_gallery_thumbnail}
                      alt="decorations image"
                    />
                  </Figure>
                </div>
                <div className="item-name  justify-content-center">
                  <p className="">{item.name}</p>
                </div>
                <div className="ms-auto">
                  {Number(switchCurrency(item)).toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}
                  {lang.currencySymbol()}{" "}
                </div>
              </Stack>
            </Button>
*/
/*<div className="border-top mb-3 deco-item-text mx-3" key={item.id}>
          <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1 }}>
            <div
              className="text-white"
              //active={true} button
              //size="sm"
              //className="w-100 btn-custom text-white pb-2"
              onClick={() => {
                props.onAdd(
                  item,

                  //switchCurrency(item, lang),
                  item.name,
                  item.id,
                  item.images[0].woocommerce_gallery_thumbnail
                );
              }}
              variant="outline-danger"
            >
              <span id={item.id} className="anchor "></span>
              <Row className=" fw-bold justify-content-center">
                <Col xs="5" sm="4" md="2" lg="2">
                  <Ratio aspectRatio="4x3">
                    <Figure className="m-0">
                      <Image
                        className="figure-round figure-img img-fluid"
                        //width={100}
                        // height={100}
                        layout="fill"
                        src={item.images[0].src}
                        alt="decorations image"
                      />
                    </Figure>
                  </Ratio>
                </Col>
                <Col
                  xs="5"
                  md="7"
                  lg="8"
                  className="text-center d-flex justify-content-center"
                >
                  <span className="align-self-center">{item.name}</span>
                </Col>
                <Col
                  className="text-center d-flex justify-content-center"
                  xs={2}
                >
                  <span className="align-self-center">
                    {Number(switchCurrency(item)).toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
                    <span> </span>
                    {lang.currencySymbol()}{" "}
                  </span>
                </Col>
              </Row>
            </div>
          </motion.div>
        </div>*/

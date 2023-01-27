import { useContext, useEffect } from "react";
import { useCartCurrency } from "../../hooks/useCartCurrency";
import Image from "next/image";
import HoverVideoPlayer from "react-hover-video-player";
import { motion } from "framer-motion";

import { Button, Ratio, Row, Col, Card } from "react-bootstrap";
import { LanguageContext } from "../context/language-context";
import { useCart } from "react-use-cart";

import CustomizerHeader from "../UI/CustomizerHeader";
import AnimateWrapper from "./AnimateWrapper";
const AccessoriesPick = (props) => {
  useEffect(() => {
    props.allowNextStep();
    props.onSubmit.current = () => {};
  }, []);
  const { getPrices, addToCart } = useCartCurrency();
  const lang = useContext(LanguageContext);
  const { inCart, addItem, getItem, removeItem, updateItemQuantity } =
    useCart();
  const onAdd = (item) => {
    const cartProduct = {
      ...item,
      img: item.images[0].shop_thumbnail,
      prices: getPrices(item.price, item.SEK_price, item.DKK_price),
    };
    addToCart(cartProduct);
  };
  return (
    <AnimateWrapper>
      <CustomizerHeader>Accessories</CustomizerHeader>
      <Row xs="1" md="2" lg="3">
        {props.accessories.map((item) => (
          <Col
            key={item.id}
            className="d-flex justify-content-center text-white"
          >
            <motion.div whileHover={{ scale: 1.02 }}>
              <Card
                bg="primary"
                style={{ maxWidth: "21rem", borderRadius: "25px" }}
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
                              //width: "100%",
                              //height: "100%",
                              //objectFit: "cover",
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
                      {lang.currencyPrice(
                        item.price,
                        item.SEK_price,
                        item.DKK_price
                      )}{" "}
                      {lang.currencySymbol()}
                    </span>
                  </Card.Text>
                  <Button
                    onClick={() => {
                      onAdd(item);
                    }}
                    variant="success"
                  >
                    ADD
                  </Button>{" "}
                  <span className="m-2 fw-bold">
                    x{" "}
                    {inCart(item.id) ? (
                      <span>
                        {getItem(item.id).quantity}{" "}
                        <Button
                          variant="info"
                          className=""
                          onClick={() =>
                            updateItemQuantity(
                              item.id,
                              getItem(item.id).quantity - 1
                            )
                          }
                        >
                          -
                        </Button>
                      </span>
                    ) : (
                      0
                    )}
                  </span>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        ))}{" "}
      </Row>
    </AnimateWrapper>
  );
};
export default AccessoriesPick;
//{countDecoPieces(item.id)}

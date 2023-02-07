import React, { useContext, useEffect } from "react";
import { useCart } from "react-use-cart";
import { useCartCurrency } from "../../hooks/useCartCurrency";
import Image from "next/image";
import { LanguageContext } from "../context/language-context";
import { motion } from "framer-motion";
import { Col, Row, Card, Button, Badge, Ratio } from "react-bootstrap";
import CustomizerHeader from "../UI/CustomizerHeader";

function EthanolFuel(props) {
  useEffect(() => {
    props.onSubmit.current = onSubmit;
    props.allowNextStep();
  }, []);
  const lang = useContext(LanguageContext);
  const { inCart, addItem, getItem, updateItemQuantity } = useCart();
  const { getPrices } = useCartCurrency();
  const onAdd = (item) => {
    addItem({
      ...item,
      img: item.images[0].woocommerce_thumbnail,
      prices: getPrices(item.price, item.SEK_price, item.DKK_price),
    });
  };
  const onSubmit = () => {};
  return (
    <div>
      <CustomizerHeader>
        Remember to add Our great Bio Ethanol Fuel!
      </CustomizerHeader>
      <Row className="justify-content-center mt-4">
        {props.fuelProducts.map((item) => (
          <Col key={item.id} md={5} className="">
            <motion.div
              className={`fw-bold bg-primary p-3 borderr m-1  `}
              whileTap={{ scale: 0.9 }}
            >
              <Ratio
                aspectRatio="4x3"
                //</motion.div>onClick={() => onPick(item)}
                onClick={() => onAdd(item)}
              >
                <Image
                  src={item.images[0].woocommerce_thumbnail}
                  alt="casing photo"
                  //width={200}
                  //height={200}
                  style={{ borderRadius: "25px" }}
                  layout="fill"
                />
              </Ratio>
              <p className="mt-3 fs-6 text-center wrap">{item.name}</p>
              <Row className="p-3 " xs={2}>
                <Col md="auto">
                  {" "}
                  <Button
                    className="m-1"
                    onClick={() => {
                      onAdd(item);
                    }}
                    variant="success"
                  >
                    ADD
                  </Button>
                </Col>
                <Col md="auto" className="">
                  {" "}
                  <span>
                    <Badge bg="info" className="py-2 fw-bold fs-5 m-1">
                      {Number(
                        lang.currencyPrice(
                          item.price,
                          item.SEK_price,
                          item.DKK_price
                        )
                      ).toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}
                      <span> </span>
                      {lang.currencySymbol()}
                    </Badge>
                  </span>
                  <Badge bg="success" className="py-2 fw-bold fs-5">
                    x {inCart(item.id) ? getItem(item.id).quantity : 0}
                  </Badge>{" "}
                  {inCart(item.id) && (
                    <Button
                      variant="danger"
                      className="fw-bold px-3 h-100"
                      onClick={() =>
                        updateItemQuantity(
                          item.id,
                          getItem(item.id).quantity - 1
                        )
                      }
                    >
                      -
                    </Button>
                  )}
                </Col>
              </Row>
            </motion.div>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default EthanolFuel;

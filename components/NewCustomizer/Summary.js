import { useContext, useEffect } from "react";
import { useCart } from "react-use-cart";
import Image from "next/image";
import { Row, Col, Stack, Badge } from "react-bootstrap";
import CustomizerHeader from "../UI/CustomizerHeader";
import { LanguageContext } from "../context/language-context";

const Summary = (props) => {
  useEffect(() => {
    props.allowNextStep ? props.allowNextStep(true) : "";
    /*  const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify({ items })
    )}`;
    let test = JSON.stringify(items);
    console.log(jsonString);
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "data.json";

    link.click();*/
    //console.log(items);
  }, []);
  const { items } = useCart();
  const lang = useContext(LanguageContext);
  return (
    <div id="print">
      <CustomizerHeader>Your Choices</CustomizerHeader>
      {items.map((item) => (
        <Row
          xs={1}
          sm={2}
          md={6}
          key={item.id}
          className="m-2 p-2 bg-primary borderr justify-content-between fs-5"
        >
          <Col md={"auto"}>
            <Image
              style={{ borderRadius: 15 }}
              width="100px"
              height="100px"
              src={item.img}
              alt="product image"
            />
          </Col>
          <Col
            className="d-flex justify-content-center align-items-center fw-bold "
            md={4}
          >
            {item.name}

            {item.dimensions.length !== "" && (
              <Stack gap={1} className="p-2 mx-2">
                <Badge bg="danger">Length: {item.dimensions.length}mm</Badge>
                <Badge bg="danger">Height: {item.dimensions.height}mm</Badge>
                <Badge bg="danger">Deep: {item.dimensions.width}mm</Badge>
              </Stack>
            )}
          </Col>
          <Col className="d-flex justify-content-center align-items-center fw-bold">
            {lang
              .currencyPrice(
                item.prices
                  ? item.prices.find((item) => item.currency === "EUR").amount
                  : item.price,
                item.prices
                  ? item.prices.find((item) => item.currency === "SEK").amount
                  : item.SEK_price,
                item.prices
                  ? item.prices.find((item) => item.currency === "DKK").amount
                  : item.DKK_price
              )
              .toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}{" "}
            {lang.currencySymbol()}
          </Col>
          <Col
            md={"auto"}
            className="d-flex justify-content-center align-items-center fw-bold "
          >
            <Badge bg="info" className="">
              x{item.quantity}
            </Badge>
          </Col>

          <Col className="d-flex justify-content-center align-items-center fw-bold">
            {lang
              .currencyPrice(
                item.prices
                  ? item.prices.find((item) => item.currency === "EUR").amount *
                      item.quantity
                  : Number(item.price * item.quantity),
                item.prices
                  ? item.prices.find((item) => item.currency === "SEK").amount *
                      item.quantity
                  : Number(item.SEK_price * item.quantity),
                item.prices
                  ? item.prices.find((item) => item.currency === "DKK").amount *
                      item.quantity
                  : item.DKK_price * item.quantity
              )
              .toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}{" "}
            {lang.currencySymbol()}
          </Col>
        </Row>
      ))}
      {props.children}
    </div>
  );
};
export default Summary;

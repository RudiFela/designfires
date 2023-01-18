import { useContext, useEffect } from "react";
import { useCart } from "react-use-cart";
import { Row, Col, Button, Badge } from "react-bootstrap";
import CustomizerHeader from "../UI/CustomizerHeader";
import { LanguageContext } from "../context/language-context";
const Summary = (props) => {
  useEffect(() => {
    props.allowNextStep(true);
  }, []);
  const { items, cartTotal, removeItem, updateItemQuantity } = useCart();
  const lang = useContext(LanguageContext);

  return (
    <div>
      <CustomizerHeader>Your Choices</CustomizerHeader>
      {items.map((item) => (
        <Row xs={3} md={6} key={item.id} className="m-2 p-2 bg-primary borderr">
          <Col>
            <img
              style={{ height: "100px", width: "100px", borderRadius: 15 }}
              src={item.img}
            />
          </Col>
          <Col className="d-flex justify-content-center align-items-center fw-bold mx-3">
            {item.name}
          </Col>
          <Col className="d-flex justify-content-center align-items-center fw-bold">
            {lang.currencyPrice(item.price, item.SEK_price, item.DKK_price)}{" "}
            {lang.currencySymbol()}
          </Col>
          <Col
            md={1}
            className="d-flex justify-content-center align-items-center fw-bold "
          >
            <Badge bg="info" className="">
              x{item.quantity}
            </Badge>
          </Col>

          <Col className="d-flex justify-content-center align-items-center fw-bold">
            {lang.currencyPrice(
              item.price * item.quantity,
              item.SEK_price * item.quantity,
              item.DKK_price * item.quantity
            )}{" "}
            {lang.currencySymbol()}
          </Col>
        </Row>
      ))}
    </div>
  );
};
export default Summary;

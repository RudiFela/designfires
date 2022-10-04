import { useContext } from "react";
import { Row, Col, Button, Card, Container } from "react-bootstrap";

import { LanguageContext } from "../context/language-context";

const BioFuel = (props) => {
  const lang = useContext(LanguageContext);

  const FuelProducts = props.decorations.filter(
    (product) => product.categories.length > 1
  );
  const findCurrencyPrice = (itemArray, keyToSearch) => {
    let findedPriceObj = itemArray.find((item) => item.key === keyToSearch);

    return findedPriceObj;
  };
  return (
    <div className="text-white text-center mb-5">
      <Container>
        <h1 className="m-5">High Quality Bio-Ethanol Fuel</h1>
        <h4>
          We are very proud to be able to deliver the best quality in the class
          of Bio-Ethanol. Use only the best Ethanol. Cheap ethanol is often sold
          as good quality.
        </h4>
        <p>
          Ethanol is not just ethanol, it can be made from mineral or vegetable
          (from underground or from plants) and there is a very big difference
          between ethanol and Ethanol.
        </p>
        <Row className="bg-danger p-3 list" style={{ borderRadius: 35 }}>
          <Col>
            <h2 className="text-white p-3 mb-3">
              <span className="text-info">DesignFires</span> Ethanol Fuel
            </h2>
            <ul className="">
              <li>Best alcohol % gives beautiful real yellow flames</li>
              <li>Plants-based ethanol which gives no smell on burned off</li>
              <li>Bio-Neutral</li>
              <li>Longer life of ethanol fireplaces</li>{" "}
              <li>
                1 liter 0.8kg Ethanol gives 7.2kW the same as a normal wood
                burning stove can provide
              </li>
            </ul>
          </Col>
          <Col>
            <h2 className="text-white p-3 mb-3">Others ethanol Fuel</h2>
            <ul>
              <li>Too high alcohol % gives a white flame</li>
              <li>Too low alcohol % gives a cold and blue flame</li>
              <li>Cheaper synthetics ethanol creates unpleasant smell</li>
              <li>Negative impact ethanol fireplaces ( more service cost )</li>
            </ul>
          </Col>
        </Row>
        <h5 className="mt-4">
          You know nothing about Ethanol fuel until you have tried DesignFires
          Ethanol fuel.
        </h5>

        <Row className="my-5 justify-content-center">
          {FuelProducts.map((item) => (
            <Col key={item.id} md="auto">
              <Card
                bg="danger"
                className="grow"
                style={{ width: "18rem", borderRadius: "25px" }}
              >
                <Card.Img
                  variant="top"
                  src={item.images[0].woocommerce_thumbnail}
                  className="p-3 "
                  style={{ borderRadius: "25px" }}
                />
                <Card.Body>
                  <Card.Title className="fs-4">{item.name}</Card.Title>
                  <Card.Text className="fs-5 fw-bold">
                    {" "}
                    Price:{" "}
                    {lang.currencyPrice(
                      item.price,
                      findCurrencyPrice(
                        item.meta_data,
                        "_alg_currency_switcher_per_product_regular_price_SEK"
                      ).value,
                      findCurrencyPrice(
                        item.meta_data,
                        "_alg_currency_switcher_per_product_regular_price_DKK"
                      ).value
                    )}
                    <span> </span>
                    {lang.currencySymbol()}
                  </Card.Text>
                  <Button href={`#${item.id}`} variant="info">
                    Order
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <h6>
          Shipping is added when not purchasing a complete pallet. Send your
          address and we will give you a price for delivery. Delivery time from
          3-10 days.
        </h6>
      </Container>
    </div>
  );
};
export default BioFuel;

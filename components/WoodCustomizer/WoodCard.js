import { useContext } from "react";
import Link from "next/link";
import { Row, Col, Badge, Card, Accordion } from "react-bootstrap";

import Dimensions from "../UI/Dimensions";
import { LanguageContext } from "../context/language-context";

const WoodCard = (props) => {
  //const { item } = props.items;
  const { currencyPrice, currencySymbol } = useContext(LanguageContext);
  return props.items.map((item) =>
    item.stock_status == "instock" ? (
      <Col className="py-3 text-white" key={item.id}>
        <div
          className="bg-primary p-2"
          style={{ width: "20rem", borderRadius: "15px" }}
        >
          {item.images[0] ? (
            <>
              <Link href={`wood/${item.id}`}>
                <Card.Img
                  className="p-4"
                  style={{ borderRadius: "15px", cursor: "pointer" }}
                  variant="top"
                  src={item.images[0].shop_catalog}
                  //onClick={() => props.showModal(item)}
                />
              </Link>
              <Row>
                {item.variant.length > 0
                  ? item.variant.map((item) => (
                      <Col className="flex justify-content-start">
                        <img
                          width={50}
                          src={item.img}
                          // onClick={() => console.log(item.length.option)}
                          //onMouseEnter={() => console.log(item.length.option)}
                        />
                      </Col>
                    ))
                  : null}
              </Row>
            </>
          ) : null}{" "}
          <Card.Body>
            <Card.Title className="fw-bold fs-5">{item.name}</Card.Title>
            <Card.Text className="fw-bold fs-5">
              <Badge bg="success">
                {item.meta_data.find(
                  (item) =>
                    item.key ===
                    "_alg_currency_switcher_per_product_regular_price_SEK" //
                ).value === "#N/D!" ? (
                  <>
                    from:<span> </span>
                    {Number(
                      currencyPrice(
                        item.price,
                        item.variant[0].SEK_price,
                        item.variant[0].DKK_price
                      )
                    ).toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
                  </>
                ) : (
                  Number(
                    currencyPrice(
                      item.price,
                      item.meta_data.find(
                        (item) =>
                          item.key ===
                          "_alg_currency_switcher_per_product_regular_price_SEK" //
                      ).value,
                      item.meta_data.find(
                        (item) =>
                          item.key ===
                          "_alg_currency_switcher_per_product_regular_price_DKK" //
                      ).value
                    )
                  ).toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })
                )}

                <span> </span>
                {currencySymbol()}
              </Badge>{" "}
            </Card.Text>

            <Accordion
              className="bg-success rounded-45"
              style={{ borderRadius: "45px" }}
            >
              <Accordion.Item eventKey="1" className="bg-success rounded-45">
                <Accordion.Header>Details</Accordion.Header>
                <Accordion.Body
                  className="bg-success rounded-45 "
                  style={{ borderRadius: "45px" }}
                >
                  <Dimensions
                    length={item.dimensions.length}
                    height={item.dimensions.height}
                    width={item.dimensions.width}
                    variant="primary"
                    unity="cm"
                  >
                    <span>
                      kW:
                      <Badge className="float-end">
                        {" "}
                        <span> </span> {item.acf.kw}
                      </Badge>
                    </span>
                    <span>
                      Type:
                      <Badge className="float-end">
                        {" "}
                        <span> </span> {item.acf.type}
                      </Badge>
                    </span>
                  </Dimensions>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Card.Body>
        </div>
      </Col>
    ) : null
  );
};
export default WoodCard;

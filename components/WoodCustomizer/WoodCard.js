import { useContext } from "react";
import Link from "next/link";
import { Row, Col, Badge, Card, Accordion } from "react-bootstrap";
import Image from "next/image";
import Dimensions from "../UI/Dimensions";
import { LanguageContext } from "../context/language-context";
const WoodCard = (props) => {
  const { currencyPrice, currencySymbol } = useContext(LanguageContext);
  const { item } = props;
  //const { item } = props.items;
  return (
    <Col className="py-3 text-white" key={item.id}>
      <div
        className="bg-primary p-2"
        style={{ width: "20rem", borderRadius: "15px" }}
      >
        {item.img ? (
          <>
            <Link href={`wood/${item.id}`}>
              <Card.Img
                className="p-4"
                style={{ borderRadius: "15px", cursor: "pointer" }}
                variant="top"
                src={item.img.sourceUrl}
                //onClick={() => props.showModal(item)}
              />
            </Link>
          </>
        ) : null}{" "}
        <Card.Body>
          <Card.Title className="fw-bold fs-5">{item.name}</Card.Title>
          <Card.Text className="fw-bold fs-5">
            <Badge bg="success">
              {Number(
                currencyPrice(
                  item.regularPrice.split(",")[0],
                  item.SEK_price[0].value,
                  item.DKK_price[0].value
                )
              ).toLocaleString()}
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
                  length={item.length}
                  height={item.height}
                  width={item.width}
                  variant="primary"
                  unity="cm"
                >
                  <span>
                    kW:
                    <Badge className="float-end">
                      {" "}
                      <span> </span> {item.woodFireplaces.kw}
                    </Badge>
                  </span>
                  <span>
                    Type:
                    <Badge className="float-end">
                      {" "}
                      <span> </span> {item.woodFireplaces.type}
                    </Badge>
                  </span>
                </Dimensions>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Card.Body>
      </div>
    </Col>
  );
};
export default WoodCard;
/*
variant imgages
<Row>
              {item.variant.length > 0
                ? item.variant.map((item) => (
                    <Col key={item.id} className="flex justify-content-start">
                      <img
                        width={50}
                        height={50}
                        src={item.img}
                        alt="fireplace image"
                        // onClick={() => console.log(item.length.option)}
                        //onMouseEnter={() => console.log(item.length.option)}
                      />
                    </Col>
                  ))
                : null}
            </Row>
PRICES

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
*/

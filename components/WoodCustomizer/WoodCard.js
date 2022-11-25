import { useEffect, useState, useContext } from "react";
import ImageGallery from "react-image-gallery";
import {
  Row,
  Col,
  Badge,
  Button,
  Card,
  Form,
  Container,
  Accordion,
} from "react-bootstrap";
import { motion } from "framer-motion";
import Dimensions from "../UI/Dimensions";
import { LanguageContext } from "../context/language-context";
import LanguageSwitcher from "../UI/LanguageSwitcher/LanguageSwitcher";
const WoodCard = (props) => {
  //const { item } = props.items;
  const { language, currencyPrice, currencySymbol } =
    useContext(LanguageContext);
  return props.items.map((item) =>
    item.stock_status == "instock" ? (
      <Col className="py-3 text-white" key={item.id}>
        <div
          className="bg-primary p-2"
          style={{ width: "20rem", borderRadius: "15px" }}
        >
          {item.images[0] ? (
            <>
              <Card.Img
                className="p-4"
                style={{ borderRadius: "15px", cursor: "pointer" }}
                variant="top"
                src={item.images[0].src}
                onClick={() => props.showModal(item)}
              />
            </>
          ) : null}{" "}
          <Card.Body>
            <Card.Title className="fw-bold fs-5">{item.name}</Card.Title>
            <Card.Text className="fw-bold fs-5">
              <Badge bg="success">
                {currencyPrice(
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

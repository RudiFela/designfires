import { useContext } from "react";
import Image from "next/image";
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
} from "react-bootstrap";
const CustomizerItemList = (props) => {
  const lang = useContext(LanguageContext);
  const list = props.ItemToList;
  const { FireplaceLength } = props;

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
    <div>
      {list.map((item) => (
        <div className="border-top mb-3 deco-item-text mx-3" key={item.id}>
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
                <Col xs={2} xs="5" sm="4" md="2" lg="2">
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
                    {lang.currencySymbol()}{" "}
                  </span>
                </Col>
              </Row>
            </div>
          </motion.div>
        </div>
      ))}
    </div>
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

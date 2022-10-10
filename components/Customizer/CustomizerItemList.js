import { useContext } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { LanguageContext } from "../context/language-context";
import { Button, ListGroup, Figure, Stack } from "react-bootstrap";
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
        <ListGroup.Item key={item.id}>
          <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1 }}>
            <Button
              //active={true}
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
          </motion.div>
        </ListGroup.Item>
      ))}
    </div>
  );
};
export default CustomizerItemList;
//€

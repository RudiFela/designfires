import { useContext, useState } from "react";
import { LanguageContext } from "../context/language-context";
import { Button, ListGroup, Figure, Stack } from "react-bootstrap";
import { useChangePrice } from "../../hooks/change-price";
const CustomizerItemList = (props) => {
  const lang = useContext(LanguageContext);
  const list = props.ItemToList;
  const { FireplaceLength } = props;
  //const { switchCurrency } = useChangePrice();
  const currencySymbol = () => {
    switch (lang.language) {
      case "swedish":
        return "SEK";
      case "english":
        return "€";

      case "danish":
        return "kr";
    }
  };
  const switchCurrency = (item) => {
    let x;
    switch (lang.language) {
      case "swedish":
        x = item.meta_data.find(
          (key) =>
            key.key === "_alg_currency_switcher_per_product_regular_price_SEK"
        );

        if (x === undefined) {
          let tut = item.variant.find((x) => x.length === FireplaceLength);

          if (tut) {
            return tut.SEK_price.value;
          } else {
            return item.variant[10].SEK_price.value;
          }
        } else {
          return x.value;
        }

      case "english":
        let tut;
        if (item.variations.length > 1) {
          if (item.variant) {
            tut = item.variant.find((x) => x.length === FireplaceLength);
          }

          if (tut) {
            return tut.price;
          } else {
            return "65"; //item.variant[10].price;
          }
        } else {
          return item.price;
        }

      case "danish":
        x = item.meta_data.find(
          (key) =>
            key.key === "_alg_currency_switcher_per_product_regular_price_DKK"
        );
        if (x === undefined) {
          let tut = item.variant.find((x) => x.length === FireplaceLength);
          if (tut) {
            return tut.DKK_price.value;
          } else {
            return item.variant[10].DKK_price.value;
          } //item.variant[0].SEK_price;
        } else {
          return x.value;
        }
    }
  };
  return (
    <div>
      {list.map((item) => (
        <ListGroup.Item key={item.id}>
          <Button
            className="w-100 btn-custom"
            onClick={() => {
              props.onAdd(
                switchCurrency(item, lang),
                item.name,
                item.id,
                item.images[0].woocommerce_gallery_thumbnail
              );
            }}
            variant="outline-danger"
          >
            <Stack direction="horizontal" gap={4}>
              <Figure>
                <Figure.Image
                  className="figure-round mt-3"
                  min-width={50}
                  min-height={50}
                  width={100}
                  height={100}
                  alt="Fireplace decoration/accesories"
                  src={item.images[0].woocommerce_gallery_thumbnail}
                />
              </Figure>

              <div className="item-name">
                <p>{item.name}</p>
              </div>
              <div className="ms-auto">
                {switchCurrency(item, lang)}
                {currencySymbol()}{" "}
              </div>
            </Stack>
          </Button>
        </ListGroup.Item>
      ))}
    </div>
  );
};
export default CustomizerItemList;
//€

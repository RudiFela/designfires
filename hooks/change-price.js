import { useCallback } from "react";

export const useChangePrice = () => {
  const switchCurrency = useCallback((item, lang) => {
    let x;
    //console.log(item);
    switch (lang.language) {
      case "swedish":
        /*   if (item.meta_data[5] == undefined) {
          console.log(item.variant);
          return "20";
        } else {
          return item.meta_data[5].value;
        }*/
        x = item.meta_data.find(
          (key) =>
            key.key === "_alg_currency_switcher_per_product_regular_price_SEK"
        );
        console.log(x);
        if (x === undefined) {
          return "21"; //item.variant[0].SEK_price;
        } else {
          if (x.value === "") {
            return "20";
          } else return <>{x.value} SEK</>;
        }

      case "english":
        return <>{item.price} €</>;

      case "danish":
        x = item.meta_data.find(
          (key) =>
            key.key === "_alg_currency_switcher_per_product_regular_price_DKK"
        );
        // console.log(x);
        if (x === undefined) {
          return "21"; //item.variant[0].SEK_price;
        } else {
          if (x.value === "") {
            return "20";
          } else return <>{x.value} kr</>;
        }
    }
  });
  return { switchCurrency };
};

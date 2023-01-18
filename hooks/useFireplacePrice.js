import { useCartCurrency } from "./useCartCurrency";
export const useFireplacePrice = () => {
  const { getPrices, addToCart } = useCartCurrency();
  const fillingTypes = [
    { name: "EW", price: 0, SEK_price: 0, DKK_price: 0 },
    { name: "T", price: 100, SEK_price: 995, DKK_price: 755 },
    { name: "PW", price: 995, SEK_price: 9995, DKK_price: 7555 },
  ];
  const smartHomeSystem = {
    name: "Smart Home System",
    price: 400,
    SEK_price: 3995,
    DKK_price: 2995,
  };
  const stainlessTop = {
    name: "StainlessTop",
    price: 300,
    SEK_price: 2995,
    DKK_price: 1995,
  };

  const customPriceCheck = (stockStatus, standartPrice, manufactureCost) => {
    let price =
      stockStatus === "instock"
        ? Number(standartPrice)
        : Number(Number(standartPrice) + Number(manufactureCost));
    return price;
  };
  const priceCount = (items) => {
    let total = 0;
    items.map((item) => (total = total + item));
    return total;
  };
  const fireplacePrice = (fireplace) => {
    let product;
    //console.log(fireplace);
    fireplace.product.name === "DFM"
      ? (product = {
          ...fireplace.item,
          price: customPriceCheck(
            fireplace.item.stock_status,
            fireplace.item.price,
            fireplace.item.manufacture_cost_EUR
          ),
          filling: fireplace.filling,
          smart: fireplace.smart,
          top: fireplace.top,
          prices: getPrices(
            priceCount([
              customPriceCheck(
                fireplace.item.stock_status,
                fireplace.item.price,
                fireplace.item.manufacture_cost_EUR
              ),
              fillingTypes.find((item) => item.name === fireplace.filling)
                .price,
            ]),
            priceCount([
              customPriceCheck(
                fireplace.item.stock_status,
                fireplace.item.SEK_price,
                fireplace.item.manufacture_cost_SEK
              ),
              fillingTypes.find((item) => item.name === fireplace.filling)
                .SEK_price,
            ]),
            priceCount([
              customPriceCheck(
                fireplace.item.stock_status,
                fireplace.item.DKK_price,
                fireplace.item.manufacture_cost_DKK
              ),
              fillingTypes.find((item) => item.name === fireplace.filling)
                .DKK_price,
            ])
          ),
        })
      : (product = {
          ...fireplace.item,
          price: customPriceCheck(
            fireplace.item.stock_status,
            fireplace.item.price,
            fireplace.item.manufacture_cost_EUR
          ),
          filling: fireplace.filling,
          smart: fireplace.smart,
          top: fireplace.top,
          prices: getPrices(
            priceCount([
              customPriceCheck(
                fireplace.item.stock_status,
                fireplace.item.price,
                fireplace.item.manufacture_cost_EUR
              ),
              fireplace.smart && smartHomeSystem.price,
              fireplace.top && stainlessTop.price,
            ]),
            priceCount([
              customPriceCheck(
                fireplace.item.stock_status,
                fireplace.item.SEK_price,
                fireplace.item.manufacture_cost_SEK
              ),
              fireplace.smart && smartHomeSystem.SEK_price,
              fireplace.top && stainlessTop.SEK_price,
            ]),
            priceCount([
              customPriceCheck(
                fireplace.item.stock_status,
                fireplace.item.DKK_price,
                fireplace.item.manufacture_cost_DKK
              ),
              fireplace.smart && smartHomeSystem.DKK_price,
              fireplace.top && stainlessTop.DKK_price,
            ])
          ),
        });
    return product;
  };

  return { fireplacePrice };
};

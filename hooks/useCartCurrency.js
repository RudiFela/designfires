import { useState, useEffect } from "react";
import { useCart } from "react-use-cart";
const initialCart = [
  { amount: 0, currency: "EUR" },
  { amount: 0, currency: "DKK" },
  { amount: 0, currency: "SEK" },
];
export const useCartCurrency = () => {
  const [totalCart, setTotalCart] = useState(["lol"]);
  const [count, setCount] = useState(true);
  const { items, addItem, emptyCart, setItems } = useCart();
  /// maybe merge with useCart hook for useeffect here
  /*useEffect(() => {
    count && lol();
  }, [totalCart, count]);*/

  const addToCart = (item) => {
    addItem(item);
    // setCount(true);
    // console.log("added");
  };
  const deleteCart = () => {
    emptyCart();
    // setTotalCart(initialCart);
  };
  const setCart = (item) => {
    setItems(item);
    // setCount(true);
  };
  const getPrices = (EUR_price, SEK_price, DKK_price) => {
    return [
      { amount: Number(EUR_price), currency: "EUR" },
      { amount: Number(DKK_price), currency: "DKK" },
      { amount: Number(SEK_price), currency: "SEK" },
    ];
  };

  const countCartCurrency = (items) => {
    // items.map((item) => console.log(item.quantity));
    if (items !== null) {
      const price = items.reduce(
        (total, currentValue) =>
          total +
          currentValue.prices.find((item) => item.currency === "EUR").amount *
            currentValue.quantity,
        0
      );

      //console.log(items);
      // console.log(price, "here");
      const SEK_price = items.reduce(
        (total, currentValue) =>
          total +
          currentValue.prices.find((item) => item.currency === "SEK").amount *
            currentValue.quantity,
        0
      );
      const DKK_price = items.reduce(
        (total, currentValue) =>
          total +
          currentValue.prices.find((item) => item.currency === "DKK").amount *
            currentValue.quantity,
        0
      );
      return { price, SEK_price, DKK_price };
    }
    return;
  };
  const calculateItemTotals = (items) =>
    items.map((item) => ({
      ...item,
      itemTotal: item.price * item.quantity,
      itemTotals: item.prices.map((price) => ({
        currency: price.currency,
        total: price.amount * item.quantity,
      })),
    }));
  return {
    getPrices,
    calculateItemTotals,
    countCartCurrency,

    addToCart,
    deleteCart,
    setCart,
  };
};

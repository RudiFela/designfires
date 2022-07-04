import { createContext } from "react";
export const CartContext = createContext({
  addedCasing: {
    name: "",
    length: "",
    price: "",
  },
  addedFireplace: {
    name: "",
    length: "",
    price: "",
  },
  addedShs: {
    name: "Smart Home System",
    price: "",
  },
  addedTop: {
    name: "",
    price: "",
  },
  addedFilling: {
    name: "",
    price: "",
  },
  addedDecorations: [],
  addedAccessories: [],
  cartPrice: 0,
});

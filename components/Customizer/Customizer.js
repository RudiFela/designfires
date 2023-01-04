import {
  Button,
  Card,
  Stack,
  Container,
  Badge,
  Row,
  Col,
} from "react-bootstrap";
import { useState, useEffect, useContext, useCallback } from "react";
import FurnitureBox from "./FurnitureBox";
import { LanguageContext } from "../context/language-context";
import { RiDeleteBin6Line } from "react-icons/ri";
import CustomizerItemList from "./CustomizerItemList";
import CustomizerCasings from "./CustomizerCasings";
import CustomizerFirePlaces from "./CustomizerFirePlaces";
import CheckCartModal from "./CheckCartModal";
import { motion } from "framer-motion";
import CustomizerCard from "./CustomizerCard";
import { GiDivert, GiTreasureMap } from "react-icons/gi";
import DeleteButton from "../UI/DeleteButton";

const initialCartState = {
  addedCasing: {
    name: "",
    length: "",
    priceEUR: "0",
    priceSEK: "0",
    priceDKK: "0",
    pcs: 0,
  },
  addedFireplace: {
    name: "",
    length: "",
    priceEUR: "0",
    priceSEK: "0",
    priceDKK: "0",
    pcs: 0,
  },
  addedShs: {
    name: "",
    price: "0",
    priceEUR: "0",
    priceSEK: "0",
    priceDKK: "0",
    pcs: 0,
  },
  addedTop: {
    name: "",
    price: "0",
    priceEUR: "0",
    priceSEK: "0",
    priceDKK: "0",
    pcs: 0,
  },
  addedFilling: {
    name: "",
    price: "0",
    priceEUR: "0",
    priceSEK: "0",
    priceDKK: "0",
    pcs: 0,
  },
  addedDecorations: [],
  addedAccessories: {
    glass: {
      length: "",
      pcs: 2,
      priceEUR: "0",
      priceSEK: "0",
      priceDKK: "0",
      color: "Clear",
      image: "",
      //"https://designfires.pl/wp-content/uploads/2022/07/ClearGlass-scaled.jpg",
      split_glass: {
        length: { option: "" },
        pcs: 0,
        priceEUR: "0",
        priceSEK: "0",
        priceDKK: "0",
      },
      short: {
        short_length: "300",
        short_pcs: 2,
        priceEUR: "0",
        priceSEK: "0",
        priceDKK: "0",
        image: "",
      },
    },
    holders: {
      pcs: 0,
      priceEUR: "0",
      priceSEK: "0",
      priceDKK: "0",
      image: "",
    },
  },
  manufactureCost: {
    manufacture_cost_EUR: "0",
    manufacture_cost_SEK: "0",
    manufacture_cost_DKK: "0",
  },
  cartPrice: 0,
};
const initialFireplaceState = {
  name: ["Type"],
  length: ["Length"],
  photo: "http://designfires.pl/wp-content/uploads/2022/07/FIREPLACES-1.png",
  price: "0",
  priceEUR: "",
  priceSEK: "",
  priceDKK: "",
  variant: [],
  stock_status: "instock",
  variant_details: undefined,
  filling: [],
  selected: false,
};
const initialCasingState = {
  name: ["Type"],
  length: [""],
  photo:
    "https://designfires.pl/wp-content/uploads/2022/07/CasingsDesignFires-1.png",
  price: "0",
  priceEUR: "",
  priceSEK: "",
  priceDKK: "",
  fullName: "",
  stock_status: "instock", // was instock
  variant: [],
  enable: false,
  selected: false,
};
const initialFurnitureBoxState = {
  name: "-",
  priceEUR: "0",
  priceSEK: "0",
  priceDKK: "0",
  color: "none",
  image: "https://designfires.pl/wp-content/uploads/2022/10/FurnitureBOX.png",
  length: "0",
  enable: false,
  pcs: 0,
};
const Customizer = (props) => {
  const lang = useContext(LanguageContext);
  const { decorations, accessories, casings, fireplace } = props;
  const [glassPcs, setGlassPcs] = useState(4);
  const [shortGlassPcs, setShortGlassPcs] = useState(2);
  const [longGlassPcs, setLongGlassPcs] = useState(2);
  const [glassColor, setGlassColor] = useState("Clear");
  const [showCart, setShowCart] = useState(false);
  const [split, setSplit] = useState(false);
  const [blockPickerColor, setBlockPickerColor] = useState({
    color: "#FFFFFF",
    ral: "RAL 9010",
  });
  const [colorTouched, setColorTouched] = useState(false);
  const [customColorPick, setCustomColorPick] = useState(false);
  const [furnitureBox, setFurnitureBox] = useState(initialFurnitureBoxState);
  const [cart, setCart] = useState(initialCartState);
  /* const [manufactureCost, setManufactureCost] = useState({
    manufacture_cost_EUR: "0",
    manufacture_cost_SEK: "0",
    manufacture_cost_DKK: "0",
  });*/
  const [enableShs, setEnableShs] = useState(false);
  const [stainlessTop, setStainlessTop] = useState(false);
  const [casingItem, setCasingItem] = useState(initialCasingState);
  const [fireplaceItem, setFirePlaceItem] = useState(initialFireplaceState);
  useEffect(() => {
    countCart();
    console.log(props.accessories);
    props.cartHandler(cart);
  }, [
    cart.addedCasing.priceEUR,
    cart.addedFireplace.priceEUR,
    cart.addedShs.priceEUR,
    cart.addedFilling.priceEUR,
    cart.addedTop.priceEUR,
    JSON.stringify(cart.addedDecorations),
    JSON.stringify(cart.addedAccessories),
    lang.language,
    glassPcs,
    shortGlassPcs,
    longGlassPcs,
  ]);
  useEffect(() => {
    if (customColorPick && !colorTouched) {
      const customPriceEUR = Number((furnitureBox.priceEUR / 100) * 110);
      const customPriceDKK = Number((furnitureBox.priceDKK / 100) * 110);
      const customPriceSEK = Number((furnitureBox.priceSEK / 100) * 110);
      setFurnitureBox((prevBox) => ({
        ...prevBox,
        priceEUR: customPriceEUR,
        priceSEK: customPriceSEK,
        priceDKK: customPriceDKK,
      }));

      setColorTouched(true);
    }
    if (!customColorPick && colorTouched) {
      const customPriceEUR = Number((furnitureBox.priceEUR / 110) * 100);
      const customPriceDKK = Number((furnitureBox.priceDKK / 110) * 100);
      const customPriceSEK = Number((furnitureBox.priceSEK / 110) * 100);

      setFurnitureBox((prevBox) => ({
        ...prevBox,
        priceEUR: customPriceEUR,
        priceSEK: customPriceSEK,
        priceDKK: customPriceDKK,
      }));
      setColorTouched(false);
    }
  }, [customColorPick]);
  const countPriceOfArrayItems = (products) => {
    const countPrice = products.map((item) => {
      return {
        EUR: Number(item.priceEUR) * item.count,
        SEK: Number(item.priceSEK) * item.count,
        DKK: Number(item.priceDKK) * item.count,
      };
    });

    let EUR, SEK, DKK;
    if (countPrice[0]) {
      EUR = countPrice.reduce((partialSum, i) => partialSum + i.EUR, 0);
      SEK = countPrice.reduce((partialSum, i) => partialSum + i.SEK, 0);
      DKK = countPrice.reduce((partialSum, i) => partialSum + i.DKK, 0);
    } else {
      EUR = null;
      SEK = null;
      DKK = null;
    }
    return {
      EUR: EUR, //countPrice.EUR.reduce((partialSum, i) => partialSum.EUR + i, 0),
      SEK: SEK, //.reduce((partialSum, i) => partialSum + i, 0),
      DKK: DKK,
    };
  };
  const caseCart = () => {
    //console.log(cart.addedAccessories.glass.short.priceEUR);
    switch (lang.language) {
      case "english":
        return (
          Number(cart.addedCasing.priceEUR) +
          Number(cart.addedFireplace.priceEUR) +
          Number(cart.addedFilling.priceEUR) +
          Number(cart.addedShs.priceEUR) +
          Number(cart.addedTop.priceEUR) +
          countPriceOfArrayItems(cart.addedDecorations).EUR +
          Number(cart.addedAccessories.glass.priceEUR) *
            cart.addedAccessories.glass.pcs +
          Number(cart.addedAccessories.holders.priceEUR) *
            cart.addedAccessories.holders.pcs +
          Number(cart.addedAccessories.glass.short.priceEUR) *
            cart.addedAccessories.glass.short.short_pcs +
          Number(cart.manufactureCost.manufacture_cost_EUR)
        );
      case "swedish":
        return (
          Number(cart.addedCasing.priceSEK) +
          Number(cart.addedFireplace.priceSEK) +
          Number(cart.addedFilling.priceSEK) +
          Number(cart.addedShs.priceSEK) +
          Number(cart.addedTop.priceSEK) +
          countPriceOfArrayItems(cart.addedDecorations).SEK +
          Number(cart.addedAccessories.glass.priceSEK) *
            cart.addedAccessories.glass.pcs +
          Number(cart.addedAccessories.holders.priceSEK) *
            cart.addedAccessories.holders.pcs +
          Number(cart.addedAccessories.glass.short.priceSEK) *
            cart.addedAccessories.glass.short.short_pcs +
          Number(cart.manufactureCost.manufacture_cost_SEK)
        );

      case "danish":
        return (
          Number(cart.addedCasing.priceDKK) +
          Number(cart.addedFireplace.priceDKK) +
          Number(cart.addedFilling.priceDKK) +
          Number(cart.addedShs.priceDKK) +
          Number(cart.addedTop.priceDKK) +
          countPriceOfArrayItems(cart.addedDecorations).DKK +
          Number(cart.addedAccessories.glass.priceDKK) *
            cart.addedAccessories.glass.pcs +
          Number(cart.addedAccessories.holders.priceDKK) *
            cart.addedAccessories.holders.pcs +
          Number(cart.addedAccessories.glass.short.priceDKK) *
            cart.addedAccessories.glass.short.short_pcs +
          Number(cart.manufactureCost.manufacture_cost_DKK)
        );
    }
  };
  const countCart = () => {
    // countPriceOfArrayItems(cart.addedAccessories));
    setCart((prevCart) => ({
      ...prevCart,
      cartPrice: caseCart(),
    }));
  };

  const onFillingChange = (
    name,
    priceFillingEUR,
    priceFillingSEK,
    priceFillingDKK
  ) => {
    const { priceEUR, priceSEK, priceDKK } = fireplaceItem;
    const { addedFilling } = cart;
    priceEUR = Number(priceEUR) - Number(addedFilling.priceEUR);
    priceSEK = Number(priceSEK) - Number(addedFilling.priceSEK);
    priceDKK = Number(priceDKK) - Number(addedFilling.priceDKK);
    setFirePlaceItem((prevCasingItem) => ({
      ...prevCasingItem,
      priceEUR: Number(priceEUR) + Number(priceFillingEUR),
      priceSEK: Number(priceSEK) + Number(priceFillingSEK),
      priceDKK: Number(priceDKK) + Number(priceFillingDKK),
    }));
    setCart((prevCart) => ({
      ...prevCart,
      addedFilling: {
        name,
        priceEUR: priceFillingEUR,
        priceSEK: Number(priceFillingSEK),
        priceDKK: Number(priceFillingDKK),
        pcs: 1,
      },
    }));
  };

  const addDecorationsToCart = (item, name, id, image) => {
    let decoArray;
    decoArray = cart.addedDecorations;
    let findedItem = false;
    let arr = decoArray.map((object) => {
      if (object.id === id) {
        findedItem = true;
        return { ...object, count: object.count++ };
      }
      return [];
    });
    if (findedItem) {
      setCart((prevCart) => ({
        ...prevCart,
        addedDecorations: decoArray,
      }));
    } else {
      const priceSEK = item.meta_data.find(
        (key) =>
          key.key === "_alg_currency_switcher_per_product_regular_price_SEK"
      );
      const priceDKK = item.meta_data.find(
        (key) =>
          key.key === "_alg_currency_switcher_per_product_regular_price_DKK"
      );
      decoArray.push({
        id,
        name,
        priceEUR: item.price,
        priceSEK: priceSEK.value,
        priceDKK: priceDKK.value,
        count: 1,
        image,
      });

      setCart((prevCart) => ({
        ...prevCart,
        addedDecorations: decoArray,
      }));
    }
    arr = undefined;
  };
  const onShowCart = () => {
    //console.log(cart);
    //console.log(fireplaceItem);
    setShowCart(true);
  };
  const clearCart = () => {
    setCart(initialCartState);
    setFirePlaceItem(initialFireplaceState);
    setCasingItem(initialCasingState);
    setFurnitureBox(initialFurnitureBoxState);
    setBlockPickerColor("#FFFFFF");
  };
  ////Casings
  const showCasingPrice = (photo, name, variant, item, mainItem) => {
    setCasingItem((prevCasing) => ({
      ...prevCasing,
      name: mainItem.name,
      photo,
      //length: ["Length"],
      variant: variant,
      selected: true,
      stock_status: item.stock_status,
      priceEUR: item.price,
      priceSEK: item.SEK_price,
      priceDKK: item.DKK_price,
      fullName: mainItem.meta_data.find((item) => item.key === "fullname")
        .value,
      Drawing3d: item.drawing3d,
      pcs: 1,
    }));
    const a = accessories.find((x) => x.name === `${glassColor} Glass 6mm`);
    console.log(a);
    const glass = accessories
      .find((x) => x.name === `${glassColor} Glass 6mm`)
      .variant.find((x) => x.length.option === fireplaceItem.length);

    const glassHolders = accessories[1];
    const shortglass = accessories
      .find((x) => x.name === `${glassColor} Glass 6mm`)
      .variant.find((x) => x.length.option === "300");

    const openingLongSides = mainItem.meta_data.find(
      (item) => item.key === "long_opening_sides"
    ).value;
    const openingShortSides = mainItem.meta_data.find(
      (item) => item.key === "short_opening_sides"
    ).value;

    setCart((prevCart) => ({
      ...prevCart,
      addedCasing: {
        name: mainItem.name,
        length: item.length.option,
        priceEUR: item.price,
        priceSEK: item.SEK_price,
        priceDKK: item.DKK_price,
        photo,
        fullName: mainItem.meta_data.find((item) => item.key === "fullname")
          .value,
        pcs: 1,
      },
      addedAccessories: {
        glass: {
          short: {
            short_length: "300",
            short_pcs: openingShortSides,
            priceEUR: shortglass.price,
            priceSEK: shortglass.SEK_price,
            priceDKK: shortglass.DKK_price,
            //image:shortglass
          },
          split_glass: {
            length: { option: "" },
            pcs: 0,
            priceEUR: "0",
            priceSEK: "0",
            priceDKK: "0",
          },
          length: glass.length,
          pcs: openingLongSides,
          priceEUR: glass.price,
          priceSEK: glass.SEK_price,
          priceDKK: glass.DKK_price,
          color: glassColor,
          image: accessories.find((x) => x.name === `${glassColor} Glass 6mm`)
            .images[0].shop_catalog,
        },
        holders: {
          pcs: Number(openingLongSides) + Number(openingShortSides),
          priceEUR: glassHolders.price,
          priceSEK: glassHolders.meta_data.find(
            (key) =>
              key.key === "_alg_currency_switcher_per_product_regular_price_SEK"
          ).value,
          priceDKK: glassHolders.meta_data.find(
            (key) =>
              key.key === "_alg_currency_switcher_per_product_regular_price_DKK"
          ).value,
          image: glassHolders.images[0].woocommerce_gallery_thumbnail,
        },
      },
    }));
  };

  ////Fireplaces
  const addFireplaceToCart = (pickedLength, image, item) => {
    if (item.stock_status !== "instock") {
      setCasingItem((prevCasingItem) => ({
        ...prevCasingItem,
        enable: false,
      }));

      setCart((prevCart) => ({
        ...prevCart,
        manufactureCost: {
          manufacture_cost_EUR: item.manufacture_cost_EUR,
          manufacture_cost_SEK: item.manufacture_cost_SEK,
          manufacture_cost_DKK: item.manufacture_cost_DKK,
        },
      }));
      setFurnitureBox(initialFurnitureBoxState);
      // setFurnitureBox({})
    } else {
      setCasingItem((prevCasingItem) => ({
        ...prevCasingItem,
        enable: true,
      }));

      if (fireplaceItem.name === "DFM") {
        const fireplaceBox = props.boxes[0].variant.find((box) => {
          return box.length.option === pickedLength;
        });
        setFurnitureBox({
          name: "DFM Furniture Box",
          priceEUR: fireplaceBox.price,
          priceSEK: fireplaceBox.SEK_price,
          priceDKK: fireplaceBox.DKK_price,
          color: blockPickerColor.color,
          image: props.boxes[0].images[0].src,
          length: pickedLength,

          enable: true,
        });
      }
      if (fireplaceItem.name === "DFE") {
        const fireplaceBox = props.boxes[1].variant.find((box) => {
          return box.length.option === pickedLength;
        });
        setFurnitureBox({
          name: "DFE Furniture Box",
          priceEUR: fireplaceBox.price,
          priceSEK: fireplaceBox.SEK_price,
          priceDKK: fireplaceBox.DKK_price,
          color: blockPickerColor.color,
          image: props.boxes[1].images[0].src,
          length: pickedLength,

          enable: true,
        });
      }
    }

    setFirePlaceItem((prevItem) => ({
      ...prevItem,
      priceEUR:
        Number(item.price) +
        Number(cart.addedShs.priceEUR) +
        Number(cart.addedTop.priceEUR) +
        Number(cart.addedFilling.priceEUR), //currencyPrice(variantPrice, SEK_price, DKK_price),
      priceSEK:
        Number(item.SEK_price) +
        Number(cart.addedShs.priceSEK) +
        Number(cart.addedTop.priceSEK) +
        Number(cart.addedFilling.priceSEK), //Price +  shs top and filling
      priceDKK:
        Number(item.DKK_price) +
        Number(cart.addedShs.priceDKK) +
        Number(cart.addedTop.priceDKK) +
        Number(cart.addedFilling.priceDKK),
      length: item.length.option, //pickedLength,
      //photo: image,                           ///BACK HERE LATER ON!!!!
      selectedLength: true,
      stock_status: item.stock_status,
      variant_details: {
        id: item.id,
        liters: item.liters,
        power: item.power,
        burningtime: item.burning,
        length: item.dimensions.length,
        width: item.dimensions.width,
        heigth: item.dimensions.height,
        holesize: item.holesize,
        bottomsize: item.bottomsize,
        technical_image: item.technical_image[0],
        technical_PDF: item.drawing3d,
        manufacture_cost_EUR: item.manufacture_cost_EUR,
        manufacture_cost_SEK: item.manufacture_cost_SEK,
        manufacture_cost_DKK: item.manufacture_cost_DKK,
      },
    }));

    const colorGlass = accessories.find((accessories) => {
      return accessories.name === `${glassColor} Glass 6mm`;
    });
    const shortglass = accessories
      .find((x) => x.name === `${glassColor} Glass 6mm`)
      .variant.find((x) => x.length.option === "300");
    let glass;
    let glass_pcs;
    let enableCasingPick;
    let split_glass = {
      length: "",
      pcs: 0,
      priceEUR: "0",
      priceSEK: "0",
      priceDKK: "0",
    }; // if longer than 2000 then split glass(max glass length is 1500)
    const glassHolders = accessories[1];
    let leng = (Number(pickedLength) + 60).toString();
    ///////////////////////// length longer than 1500
    if (Number(pickedLength) > 2000) {
      enableCasingPick = false;
      const countingGlassPcs = Number(pickedLength) % 200;
      if (countingGlassPcs > 0) {
        setSplit(true);
        /// if glass is like 1700/1900 then we need add 2 diferent glass size
        //+ Number(pickedLength-100)
        const x = Number(pickedLength) + 100;

        glass = colorGlass.variant.find(
          (x) =>
            x.length.option === ((Number(pickedLength) + 100) / 2).toString() //find longer glass eg 1700 glass its 900+800
        ); //2 of them
        glass_pcs = longGlassPcs;
        const splitGlass = colorGlass.variant.find(
          (x) =>
            x.length.option === ((Number(pickedLength) - 100) / 2).toString() // find shorter glass
        ); //2 of them
        split_glass = {
          length: splitGlass.length,
          pcs: longGlassPcs,
          priceEUR: splitGlass.price,
          priceSEK: splitGlass.SEK_price,
          priceDKK: splitGlass.DKK_price,
        };
      } else {
        setSplit(false);
        // if length its like 1600 1800 then we need 2x800 or 2x900 glass
        glass = colorGlass.variant.find(
          (x) => x.length.option === (Number(pickedLength) / 2).toString() //4of them
        );
        glass_pcs = longGlassPcs * 2;
        split_glass = {
          length: "",
          pcs: 0,
          priceEUR: "0",
          priceSEK: "0",
          priceDKK: "0",
        };
      }

      setCasingItem({
        name: ["Custom"],
        length: leng,
        photo: casingItem.photo,
        price: "0",
        priceEUR: "0",
        priceSEK: "0",
        priceDKK: "0",
        fullName: "",
        stock_status: "instock",
        variant: [],
        enable: false,
        selected: false,
      });
      setCart((prevCart) => ({
        ...prevCart,
        addedCasing: {
          name: `Custom `, //${findCaseNamePicked.name}`,
          length: leng,
          priceEUR: "0",
          priceSEK: "0",
          priceDKK: "0",
          photo: casingItem.photo,
          fullName: "" /*findCaseNamePicked.meta_data.find(
            (item) => item.key === "fullname"
          ).value,*/,
          pcs: 1,
        },
        addedFireplace: {
          name: fireplaceItem.name,
          length: pickedLength,
          priceEUR: item.price,
          priceSEK: item.SEK_price,
          priceDKK: item.DKK_price,
          photo: image,
          info: `${item.dimensions.width}mm/${item.dimensions.height}mm`,
          height: `${item.dimensions.height}mm`,
          width: `${item.dimensions.width}mm`,
          pcs: 1,
        },
        addedAccessories: {
          glass: {
            short: {
              short_length: "300",
              short_pcs: shortGlassPcs,
              priceEUR: shortglass.price,
              priceSEK: shortglass.SEK_price,
              priceDKK: shortglass.DKK_price,
              //image:shortglass
            },
            split_glass,
            length: glass.length,
            pcs: glass_pcs,
            priceEUR: glass.price,
            priceSEK: glass.SEK_price,
            priceDKK: glass.DKK_price,
            color: glassColor,
            image: accessories.find((x) => x.name === `${glassColor} Glass 6mm`)
              .images[0].shop_catalog,
          },
          holders: {
            pcs: glass_pcs + split_glass.pcs + shortGlassPcs,
            priceEUR: glassHolders.price,
            priceSEK: glassHolders.meta_data.find(
              (key) =>
                key.key ===
                "_alg_currency_switcher_per_product_regular_price_SEK"
            ).value,
            priceDKK: glassHolders.meta_data.find(
              (key) =>
                key.key ===
                "_alg_currency_switcher_per_product_regular_price_DKK"
            ).value,
            image: glassHolders.images[0].woocommerce_gallery_thumbnail,
          },
        },
        manufactureCost: {
          manufacture_cost_EUR: item.manufacture_cost_EUR,
          manufacture_cost_SEK: item.manufacture_cost_SEK,
          manufacture_cost_DKK: item.manufacture_cost_DKK,
        },
      }));
    }
    //////////////////////// length longer than 1500
    //////////////////////// length shorter than 1500(standart case)
    else {
      setSplit(false);
      glass = colorGlass.variant.find((x) => x.length.option === pickedLength);
      enableCasingPick = true;

      if (!casingItem.selected) {
        //if case was picked
        setCasingItem((prevCasingItem) => ({
          ...prevCasingItem,
          length: leng,
          //enable: enableCasingPick,
        }));
        setCart((prevCart) => ({
          ...prevCart,
          addedFireplace: {
            name: fireplaceItem.name,
            length: pickedLength,
            priceEUR: item.price,
            priceSEK: item.SEK_price,
            priceDKK: item.DKK_price,

            photo: fireplaceItem.photo,
            info: `${item.dimensions.width}mm/${item.dimensions.height}mm`,
            height: `${item.dimensions.height}mm`,
            width: `${item.dimensions.width}mm`,
            pcs: 1,
          },
          addedAccessories: {
            glass: {
              short: {
                short_length: "300",
                short_pcs: shortGlassPcs,
                priceEUR: shortglass.price,
                priceSEK: shortglass.SEK_price,
                priceDKK: shortglass.DKK_price,
              },
              split_glass: split_glass,
              length: glass.length,
              pcs: longGlassPcs,
              priceEUR: glass.price,
              priceSEK: glass.SEK_price,
              priceDKK: glass.DKK_price,
              color: glassColor,
              image: colorGlass.images[0].shop_catalog,
            },
            holders: {
              pcs: longGlassPcs + shortGlassPcs,
              priceEUR: glassHolders.price,
              priceSEK: glassHolders.meta_data.find(
                (key) =>
                  key.key ===
                  "_alg_currency_switcher_per_product_regular_price_SEK"
              ).value,
              priceDKK: glassHolders.meta_data.find(
                (key) =>
                  key.key ===
                  "_alg_currency_switcher_per_product_regular_price_DKK"
              ).value,
              image: glassHolders.images[0].woocommerce_gallery_thumbnail,
            },
          },
        }));
      } // if casing not picked
      else {
        const findCaseNamePicked = casings.find(
          (casings) => casings.name === casingItem.name
        );

        const findCaseVariantPicked = findCaseNamePicked.variant.find(
          (findCaseNamePicked) => findCaseNamePicked.length.option === leng
        );
        //console.log(findCaseVariantPicked);
        //if casing variant its not standard(cant findt this variant after change fireplacelength)
        if (findCaseVariantPicked === undefined) {
          setCasingItem({
            name: ["Custom"],
            length: leng,
            photo:
              "https://designfires.pl/wp-content/uploads/2022/07/CasingsDesignFires-1.png",
            price: "0",
            priceEUR: "0",
            priceSEK: "0",
            priceDKK: "0",
            fullName: "",
            stock_status: "instock",
            variant: [],
            enable: false,
            selected: false,
          });
          setCart((prevCart) => ({
            ...prevCart,
            addedCasing: {
              name: `Custom `, //${findCaseNamePicked.name}`,
              length: leng,
              priceEUR: "0",
              priceSEK: "0",
              priceDKK: "0",
              photo: "",
              fullName: "" /*findCaseNamePicked.meta_data.find(
                (item) => item.key === "fullname"
              ).value,*/,
              pcs: 1,
            },
            addedFireplace: {
              name: fireplaceItem.name,
              length: pickedLength,
              priceEUR: item.price,
              priceSEK: item.SEK_price,
              priceDKK: item.DKK_price,
              photo: image,
              info: `${item.dimensions.width}mm/${item.dimensions.height}mm`,
              height: `${item.dimensions.height}mm`,
              width: `${item.dimensions.width}mm`,
              pcs: 1,
            },
          }));
          return;
        }
        setCasingItem((prevCasingItem) => ({
          ...prevCasingItem,
          length: leng,
          // enable: enableCasingPick,
          stock_status: findCaseVariantPicked.stock_status,
          priceEUR: findCaseVariantPicked.price,
          priceSEK: findCaseVariantPicked.SEK_price,
          priceDKK: findCaseVariantPicked.DKK_price,
        }));
        setCart((prevCart) => ({
          ...prevCart,
          addedCasing: {
            name: findCaseNamePicked.name,
            length: leng,
            priceEUR: findCaseVariantPicked.price,
            priceSEK: findCaseVariantPicked.SEK_price,
            priceDKK: findCaseVariantPicked.DKK_price,
            photo: findCaseVariantPicked.img,
            fullName: findCaseNamePicked.meta_data.find(
              (item) => item.key === "fullname"
            ).value,
            pcs: 1,
          },
          addedFireplace: {
            name: fireplaceItem.name,
            length: pickedLength,
            priceEUR: item.price,
            priceSEK: item.SEK_price,
            priceDKK: item.DKK_price,
            photo: image,
            info: `${item.dimensions.width}mm/${item.dimensions.height}mm`,
            height: `${item.dimensions.height}mm`,
            width: `${item.dimensions.width}mm`,
            pcs: 1,
          },
        }));
      }
    }
    ////////////////////////// length shorter than 1500(standart case)
  };
  const showFirePlacePrice = (photo, name, variant) => {
    setFirePlaceItem({
      name,
      photo,
      length: ["Length"],
      variant: variant,
      stock_status: "instock",
      selected: true,
      priceEUR: "0",
      priceSEK: "0",
      priceDKK: "0",
    });
  };
  /////////
  const toggleShsHandler = () => {
    const { priceEUR, priceSEK, priceDKK } = fireplaceItem;

    if (enableShs) {
      setEnableShs(false);
      setCart((prevCart) => ({
        ...prevCart,
        addedShs: {
          name: "",
          priceEUR: "0",
          priceSEK: "0",
          priceDKK: "0",
          pcs: 0,
        },
      }));
      setFirePlaceItem((prevItem) => ({
        ...prevItem,
        priceEUR: Number(priceEUR) - 400,
        priceSEK: Number(priceSEK) - 3995,
        priceDKK: Number(priceDKK) - 2995,
      }));
      ///
    } else {
      setEnableShs(true);
      setFirePlaceItem((prevItem) => ({
        ...prevItem,
        priceEUR: Number(priceEUR) + 400,
        priceSEK: Number(priceSEK) + 3995,
        priceDKK: Number(priceDKK) + 2995,
      }));
      setCart((prevCart) => ({
        ...prevCart,
        addedShs: {
          name: "Smart Home System",
          priceEUR: "400",
          priceSEK: "3995",
          priceDKK: "2995",
          pcs: 1,
        },
      }));
    }
  };
  const toggleStainlessTopHandler = () => {
    const { priceEUR, priceSEK, priceDKK } = fireplaceItem;

    if (stainlessTop) {
      setStainlessTop(false);
      setCart((prevCart) => ({
        ...prevCart,
        addedTop: {
          name: "",
          priceEUR: "0",
          priceSEK: "0",
          priceDKK: "0",
          pcs: 0,
        },
      }));
      setFirePlaceItem((prevCasingItem) => ({
        ...prevCasingItem,
        priceEUR: Number(priceEUR) - 300,
        priceSEK: Number(priceSEK) - 2995,
        priceDKK: Number(priceDKK) - 1995,
      }));
    } else {
      setStainlessTop(true);

      setFirePlaceItem((prevCasingItem) => ({
        ...prevCasingItem,
        priceEUR: Number(priceEUR) + 300,
        priceSEK: Number(priceSEK) + 2995,
        priceDKK: Number(priceDKK) + 1995,
      }));
      setCart((prevCart) => ({
        ...prevCart,
        addedTop: {
          name: "Stainless Top",
          priceEUR: "300",
          priceSEK: "2995",
          priceDKK: "1995",
        },
        pcs: 1,
      }));
    }
  };
  const clearModalCart = () => {
    clearCart();
    setShowCart(false);
  };
  const closeModalCart = () => {
    setShowCart(false);
  };
  const glassPiecesChange = (value, short_pcs, long_pcs) => {
    const { glass, holders } = cart.addedAccessories;

    setCart((prevCart) => ({
      ...prevCart,
      addedAccessories: {
        holders: {
          ...holders,
          pcs:
            Number(short_pcs) +
            Number(long_pcs) +
            Number(glass.split_glass.pcs),
        }, //{ ...holders },
        glass: {
          ...glass,
          pcs: Number(long_pcs),
          short: { ...glass.short, short_pcs: Number(short_pcs) },
          split_glass: {
            ...glass.split_glass,
            pcs: split ? Number(long_pcs) : 0,
          },
        },
      },
    }));
    setShortGlassPcs(Number(short_pcs));
    setLongGlassPcs(Number(long_pcs));
    setGlassPcs(value);
    //console.log(glassPcs);
  };
  const changeGlassColor = (color) => {
    const colorGlass = accessories.find((accessories) => {
      return accessories.name === `${color} Glass 6mm`;
    });
    const { glass, holders, split_glass } = cart.addedAccessories;
    const updateGlassPrices = () => {
      /// new long glass price based on color
      const longGlassVariant = colorGlass.variant.find(
        (variant) =>
          variant.length.option === cart.addedAccessories.glass.length.option
      );
      // new short glass price based on color
      const shortGlassVariant = colorGlass.variant.find(
        (variant) => variant.length.option === "300"
      );
      // new split glass price based on color
      const splitGlassVariant = colorGlass.variant.find(
        (variant) =>
          variant.length.option ===
          cart.addedAccessories.glass.split_glass.length.option
      );
      console.log(longGlassVariant, shortGlassVariant, splitGlassVariant);

      setCart((prevCart) => ({
        ...prevCart,
        addedAccessories: {
          holders: holders, //{ ...holders },
          glass: {
            ...glass,
            priceEUR: longGlassVariant.price,
            priceSEK: longGlassVariant.SEK_price,
            priceDKK: longGlassVariant.DKK_price,
            color,
            image: colorGlass.images[0].shop_thumbnail,
            split_glass: {
              ...glass.split_glass,
              priceEUR: splitGlassVariant ? splitGlassVariant.price : "",
              priceSEK: splitGlassVariant ? splitGlassVariant.SEK_price : "",
              priceDKK: splitGlassVariant ? splitGlassVariant.DKK_price : "",
            },
            short: {
              ...glass.short,
              priceEUR: shortGlassVariant ? shortGlassVariant.price : "",
              priceSEK: shortGlassVariant ? shortGlassVariant.SEK_price : "",
              priceDKK: shortGlassVariant ? shortGlassVariant.DKK_price : "",
            },
          },
        },
      }));
    };

    updateGlassPrices();

    setGlassColor(color);
  };
  const onBoxColorChange = (color, colorCode) => {
    if (color === "#FFFFFF") {
      setCustomColorPick(false);
    } else {
      setCustomColorPick(true);
    }
    if (furnitureBox.pcs > 0) {
      onAddFurnitureBox();
    }
    setBlockPickerColor({ color, ral: colorCode });
    console.log(colorCode);
  };
  const onFurnitureReset = () => {
    setFurnitureBox(initialFurnitureBoxState);
    setCustomColorPick(false);
    setBlockPickerColor("#FFFFFF");
  };
  const onAddFurnitureBox = () => {
    glassPiecesChange(3, "2", "2");
    setCasingItem(initialCasingState);
    setCart((prevCart) => ({
      ...prevCart,
      /*addedCasing: {
        name: "",
        length: "",
        priceEUR: "0",
        priceSEK: "0",
        priceDKK: "0",
        pcs: 0,
      },*/
      addedCasing: {
        name: "Furniture Box",
        length: Number(furnitureBox.length) + 100,
        priceEUR: furnitureBox.priceEUR,
        priceSEK: furnitureBox.priceSEK,
        priceDKK: furnitureBox.priceDKK,
        photo: furnitureBox.image,
        fullName: furnitureBox.name,
        color: blockPickerColor.color,
        colorCode: blockPickerColor.ral,
        pcs: 1,
      },
    }));
    setFurnitureBox((prevState) => ({ ...prevState, pcs: 1 }));
  };

  return (
    <div className="bg-primary pb-2">
      <div className="w-100 bg-danger p-3 fst-italic">
        <h1 id="customize" className="text-center text-white p-4 mt-3 ">
          Check possibilities on Your own!
        </h1>
      </div>
      <div className="mt-4">
        <Container>
          <CustomizerFirePlaces
            className=""
            onSelect={showFirePlacePrice}
            onPickLength={addFireplaceToCart}
            fireplaces={fireplace}
            selectedFireplace={fireplaceItem}
            technicalInfo={fireplaceItem.variant_details}
            shsSwitcher={toggleShsHandler}
            selected={fireplaceItem.selected}
            topSwitcher={toggleStainlessTopHandler}
            onFillingChange={onFillingChange}
            changeGlassColor={changeGlassColor}
            glassPiecesChange={glassPiecesChange}
            onShowCart={onShowCart}
          />
        </Container>
      </div>{" "}
      <Container style={{ position: "relative", zindex: 1250 }}>
        {" "}
        <div className="customize pt-4 pb-2">
          {" "}
          <Row xs="1" md="1" lg="2">
            <Col>
              <div
                className={
                  furnitureBox.pcs > 0 || !furnitureBox.enable
                    ? "disable-element"
                    : ""
                }
                style={{ position: "relative", zindex: 50 }}
              >
                <CustomizerCasings
                  className="ml-5 "
                  casings={casings}
                  onSelect={showCasingPrice}
                  pickedCaseItem={casingItem}
                  enable={casingItem.enable}
                  changeGlassColor={changeGlassColor}
                  glassPiecesChange={glassPiecesChange}
                />
              </div>{" "}
            </Col>
            <Col>
              {" "}
              <div
                className={
                  !furnitureBox.enable || casingItem.pcs > 0
                    ? "disable-element "
                    : ""
                }
              >
                <FurnitureBox
                  color={blockPickerColor.color}
                  onConfirm={onAddFurnitureBox}
                  disabled={!casingItem.enable}
                  item={furnitureBox}
                  onColorPick={onBoxColorChange}
                  length={fireplaceItem.length}
                  reset={onFurnitureReset}
                ></FurnitureBox>
              </div>
            </Col>
          </Row>
          <CheckCartModal
            cart={cart}
            showCart={showCart}
            onClose={() => closeModalCart()}
            onClear={() => clearModalCart()}
            currency={() => lang.currencySymbol()}
          />
        </div>
        <div className="mt-3 ">
          <div style={{ width: "100%" }}>
            <div style={{ width: "100%" }} className="card-deco deco-card test">
              <h3 className="text-white text-center mb-3">
                <Badge bg="danger">Select Accessories</Badge>
              </h3>
              <div className="tab-content">
                <CustomizerItemList
                  ItemToList={decorations}
                  onAdd={addDecorationsToCart}
                  cartDeco={cart.addedDecorations}
                />
              </div>
              <h5 className="text-white m-0 mx-auto pt-1 float-end">
                All prices includes 25% VAT
              </h5>
            </div>{" "}
          </div>
        </div>{" "}
      </Container>
      <div className=" d-flex flex-row-reverse bd-highlight">
        <Stack className="mx-auto " direction="horizontal" gap={4}>
          <Button className="my-2 ms-auto bolder" variant="info" disabled>
            {Number(cart.cartPrice).toLocaleString(undefined, {
              maximumFractionDigits: 2,
            })}
            <span> </span>
            {lang.currencySymbol()}
          </Button>
          <motion.div whileHover={{ scale: 1.1 }}>
            {" "}
            <Button
              className="bolder"
              variant="info"
              onClick={() => onShowCart()}
            >
              Check Your Choises
            </Button>{" "}
          </motion.div>

          <DeleteButton reset={clearCart} />
        </Stack>
      </div>
    </div>
  );
};
export default Customizer;
/*
Furniture
  */

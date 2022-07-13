import { Button, Card, Stack, Container } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { LanguageContext } from "../context/language-context";
import CustomizerItemList from "./CustomizerItemList";
import CustomizerCasings from "./CustomizerCasings";
import CustomizerFirePlaces from "./CustomizerFirePlaces";
import CheckCartModal from "./CheckCartModal";

const Customizer = (props) => {
  const lang = useContext(LanguageContext);
  const { decorations, accessories, casings, fireplace } = props;
  const [glassPcs, setGlassPcs] = useState(4);
  const [glassColor, setGlassColor] = useState("Clear");
  const [showCart, setShowCart] = useState(false);
  const [cart, setCart] = useState({
    addedCasing: {
      name: "",
      length: "",
      priceEUR: "0",
      priceSEK: "0",
      priceDKK: "0",
    },
    addedFireplace: {
      name: "",
      length: "",
      priceEUR: "0",
      priceSEK: "0",
      priceDKK: "0",
    },
    addedShs: {
      name: "",
      price: "0",
      priceEUR: "0",
      priceSEK: "0",
      priceDKK: "0",
    },
    addedTop: {
      name: "",
      price: "0",
      priceEUR: "0",
      priceSEK: "0",
      priceDKK: "0",
    },
    addedFilling: {
      name: "",
      price: "0",
      priceEUR: "0",
      priceSEK: "0",
      priceDKK: "0",
    },
    addedDecorations: [],
    addedAccessories: {
      glass: {
        length: "",
        pcs: 0,
        priceEUR: "0",
        priceSEK: "0",
        priceDKK: "0",
        color: glassColor,
      },
      holders: {
        pcs: 0,
        priceEUR: "0",
        priceSEK: "0",
        priceDKK: "0",
        image: "",
      },
    },
    cartPrice: 0,
  });

  const [enableShs, setEnableShs] = useState(false);
  const [stainlessTop, setStainlessTop] = useState(false);
  const [casingItem, setCasingItem] = useState({
    name: ["Select Type"],
    length: [""],
    photo:
      "http://designfires.pl/wp-content/uploads/2022/07/CasingsDesignFires.png",
    price: "0",
    priceEUR: "",
    priceSEK: "",
    priceDKK: "",
    fullName: "",
    variant: [],
    enable: false,
    selected: false,
  });
  const [fireplaceItem, setFirePlaceItem] = useState({
    name: ["Select FirePlace"],
    length: ["Length"],
    photo: "http://designfires.pl/wp-content/uploads/2022/07/FIREPLACES-1.png",
    price: "0",
    variant: [],
    variant_details: undefined,
    filling: [],
    selected: false,
  });
  useEffect(() => {
    //console.log(casingItem);
    // if (fireplaceItem.selected) {
    countCart();
    props.cartHandler(cart);
    //}
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
  ]);

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
            cart.addedAccessories.holders.pcs
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
            cart.addedAccessories.holders.pcs
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
            cart.addedAccessories.holders.pcs
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
        priceEUR: Number(priceFillingEUR),
        priceSEK: Number(priceFillingSEK),
        priceDKK: Number(priceFillingDKK),
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
    console.log(cart);
    setShowCart(true);
  };
  const clearCart = () => {
    setCart({
      addedCasing: {
        name: "",
        length: "",
        price: "",
        priceEUR: "",
        priceSEK: "",
        priceDKK: "",
      },
      addedFireplace: {
        name: "",
        length: "",
        price: "",
        priceEUR: "",
        priceSEK: "",
        priceDKK: "",
      },
      addedShs: {
        name: "",
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
    setFirePlaceItem({
      name: ["Select FirePlace"],
      length: ["Length"],
      photo:
        "http://designfires.pl/wp-content/uploads/2022/07/FIREPLACES-1.png",
      price: 0,
      variant: [],
      variant_details: undefined,
      filling: [],
      selected: false,
    });
    setCasingItem({
      name: ["Select Type"],
      length: [""],
      photo:
        "http://designfires.pl/wp-content/uploads/2022/07/CasingsDesignFires.png",
      price: 0,
      variant: [],
      enable: false,
      selected: false,
    });
  };
  ////Casings
  const showCasingPrice = (photo, name, variant, item, mainItem) => {
    // console.log(item);
    // console.log(mainItem);

    setCasingItem((prevCasing) => ({
      ...prevCasing,
      name: mainItem.name,
      photo,
      //length: ["Length"],
      variant: variant,
      selected: true,
      priceEUR: item.price,
      priceSEK: item.SEK_price.value,
      priceDKK: item.DKK_price.value,
      fullName: mainItem.meta_data.find((item) => item.key === "fullname")
        .value,
    }));

    const openingSides = mainItem.meta_data.find(
      (item) => item.key === "openingsides"
    ).value;
    const glass = accessories[0].variant.find(
      (x) => x.length === fireplaceItem.length
    );
    const glassHolders = accessories[1];
    console.log(glass);
    console.log(glassHolders);
    //console.log(accessories[0].variant);
    setCart((prevCart) => ({
      ...prevCart,
      addedCasing: {
        name: mainItem.name,
        length: item.length,
        priceEUR: item.price,
        priceSEK: item.SEK_price.value,
        priceDKK: item.DKK_price.value,
        photo,
        fullName: mainItem.meta_data.find((item) => item.key === "fullname")
          .value,
      },
      addedAccessories: {
        glass: {
          length: glass.length,
          pcs: openingSides,
          priceEUR: glass.price,
          priceSEK: glass.SEK_price.value,
          priceDKK: glass.DKK_price.value,
          color: glassColor,
        },
        holders: {
          pcs: openingSides,
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
  const addFireplaceToCart = (
    pickedLength,
    variantPrice,
    image,
    id,
    liters,
    power,
    burningtime,
    dimensions,
    DKK_price,
    SEK_price,
    holesize,
    bottomsize
  ) => {
    //console.log(casingItem);
    setFirePlaceItem((prevItem) => ({
      ...prevItem,
      priceEUR: variantPrice, //currencyPrice(variantPrice, SEK_price, DKK_price),
      priceSEK: SEK_price,
      priceDKK: DKK_price,
      length: pickedLength,
      photo: image,
      variant_details: {
        id,
        liters,
        power,
        burningtime,
        length: dimensions.length,
        width: dimensions.width,
        heigth: dimensions.heigth,
        holesize,
        bottomsize,
      },
    }));
    let leng = (Number(pickedLength) + 60).toString();
    if (!casingItem.selected) {
      setCasingItem((prevCasingItem) => ({
        ...prevCasingItem,
        length: leng,
        enable: true,
      }));
      const glass = accessories[0].variant.find(
        (x) => x.length === pickedLength
      );
      const glassHolders = accessories[1];

      setCart((prevCart) => ({
        ...prevCart,
        addedFireplace: {
          name: fireplaceItem.name,
          length: pickedLength,
          priceEUR: variantPrice,
          priceSEK: SEK_price,
          priceDKK: DKK_price,
          photo: image,
        },
        addedAccessories: {
          glass: {
            length: glass.length,
            pcs: glassPcs,
            priceEUR: glass.price,
            priceSEK: glass.SEK_price.value,
            priceDKK: glass.DKK_price.value,
            color: glassColor,
          },
          holders: {
            pcs: glassPcs,
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
    } else {
      const findCaseNamePicked = casings.find(
        (casings) => casings.name === casingItem.name
      );
      //console.log(findCaseNamePicked);
      const findCaseVariantPicked = findCaseNamePicked.variant.find(
        (findCaseNamePicked) => findCaseNamePicked.length === leng
      );
      //console.log(findCaseVariantPicked);
      //console.log(findCaseVariantPicked.price);
      // console.log("dkk");
      // console.log(findCaseVariantPicked);
      //console.log(findCaseNamePicked);
      setCasingItem((prevCasingItem) => ({
        ...prevCasingItem,
        length: leng,
        enable: true,
        priceEUR: findCaseVariantPicked.price,
        priceSEK: findCaseVariantPicked.SEK_price.value,
        priceDKK: findCaseVariantPicked.DKK_price.value,
      }));
      /* setCasingItem({
        length: leng,
        name: findCaseNamePicked.name,
        fullName: findCaseNamePicked.acf.fullname,
        photo: findCaseVariantPicked.img,
        priceEUR: findCaseVariantPicked.price,
        priceSEK: findCaseVariantPicked.SEK_price.value,
        priceDKK: findCaseVariantPicked.DKK_price.value,
        variant: findCaseNamePicked.variant,
        enable: true,
        selected: true,
      });*/

      setCart((prevCart) => ({
        ...prevCart,
        addedCasing: {
          name: findCaseNamePicked.name,
          length: leng,
          priceEUR: findCaseVariantPicked.price,
          priceSEK: findCaseVariantPicked.SEK_price.value,
          priceDKK: findCaseVariantPicked.DKK_price.value,
          photo: findCaseVariantPicked.img,
          fullName: findCaseNamePicked.meta_data.find(
            (item) => item.key === "fullname"
          ).value,
        },
        addedFireplace: {
          name: fireplaceItem.name,
          length: pickedLength,
          priceEUR: variantPrice,
          priceSEK: SEK_price,
          priceDKK: DKK_price,
          photo: image,
        },
      }));
    }

    // console.log(Number(pickedLength) + 60).toString();
    /*  setCart((prevCart) => ({
      ...prevCart,
      addedFireplace: {
        name: fireplaceItem.name,
        length: pickedLength,
        priceEUR: variantPrice,
        priceSEK: SEK_price,
        priceDKK: DKK_price,
        photo: image,
      },
    }));*/
  };
  const showFirePlacePrice = (photo, name, variant) => {
    setFirePlaceItem({
      name,
      photo,
      length: ["Length"],
      variant: variant,
      selected: true,
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
          name: "None",
          priceEUR: "0",
          priceSEK: "0",
          priceDKK: "0",
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
          name: "Black Top",
          priceEUR: "0",
          priceSEK: "0",
          priceDKK: "0",
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
  const glassPiecesChange = (value) => {
    const { glass, holders } = cart.addedAccessories;
    setCart((prevCart) => ({
      ...prevCart,
      addedAccessories: {
        holders: { ...holders, pcs: value }, //{ ...holders },
        glass: { ...glass, pcs: value },
      },
    }));
    setGlassPcs(value);
    console.log(glassPcs);
  };
  const changeGlassColor = (color) => {
    const { glass, holders } = cart.addedAccessories;
    setCart((prevCart) => ({
      ...prevCart,
      addedAccessories: {
        holders: holders, //{ ...holders },
        glass: { ...glass, color },
      },
    }));
    setGlassColor(color);
  };
  return (
    <>
      <h1 id="customize" className="text-center text-white p-5 ">
        Check possibilities on Your own!
      </h1>

      <div className="customizer  bg-primary pt-4 pb-2">
        <div className="customizer-item ">
          <Container>
            <CustomizerFirePlaces
              className="ml-5"
              onSelect={showFirePlacePrice}
              onPickLength={addFireplaceToCart}
              fireplaces={fireplace}
              selectedFireplace={fireplaceItem}
              technicalInfo={fireplaceItem.variant_details}
              shsSwitcher={toggleShsHandler}
              selected={fireplaceItem.selected}
              topSwitcher={toggleStainlessTopHandler}
              onFillingChange={onFillingChange}
            />
          </Container>
        </div>
        <div className="customizer-item">
          <Container>
            <CustomizerCasings
              className="ml-5"
              casings={casings}
              onSelect={showCasingPrice}
              pickedCaseItem={casingItem}
              enable={casingItem.enable}
              changeGlassColor={changeGlassColor}
              glassPiecesChange={glassPiecesChange}
            />
          </Container>
        </div>
        <CheckCartModal
          cart={cart}
          showCart={showCart}
          onClose={() => closeModalCart()}
          onClear={() => clearModalCart()}
          currency={() => lang.currencySymbol()}
        />
        <div className="customizer-item mt-3 ">
          <div>
            <Card className="card-deco carder">
              <Card.Header className="tab-content">
                <CustomizerItemList
                  ItemToList={decorations}
                  onAdd={addDecorationsToCart}
                />
              </Card.Header>
            </Card>{" "}
          </div>
        </div>{" "}
      </div>
      <div className="bg-primary d-flex flex-row-reverse bd-highlight">
        <Stack className="mx-auto " direction="horizontal" gap={4}>
          <div>
            <Button className="my-2 ms-auto bolder" variant="info" disabled>
              {cart.cartPrice}
              {lang.currencySymbol()}
            </Button>
          </div>
          <div>
            <Button
              className="bolder"
              variant="info"
              onClick={() => clearCart()}
            >
              Clear Cart
            </Button>
          </div>{" "}
          <div>
            <Button variant="info" onClick={() => onShowCart()}>
              Check Cart
            </Button>
          </div>
        </Stack>
      </div>
    </>
  );
};
export default Customizer;

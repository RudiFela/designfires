import {
  Button,
  Card,
  ListGroup,
  Tabs,
  Tab,
  Stack,
  Container,
  Modal,
  Row,
  Col,
} from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { useChangePrice } from "../../hooks/change-price";
import { LanguageContext } from "../context/language-context";
import CustomizerItemList from "./CustomizerItemList";
import CustomizerCasings from "./CustomizerCasings";
import CustomizerFirePlaces from "./CustomizerFirePlaces";

const Customizer = (props) => {
  const lang = useContext(LanguageContext);
  const { decorations, accessories, casings, fireplace } = props;
  const { switchCurrency } = useChangePrice();
  const [key, setKey] = useState("home");
  const [showCart, setShowCart] = useState(false);
  const [cart, setCart] = useState({
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
  const [enableShs, setEnableShs] = useState(false);
  const [stainlessTop, setStainlessTop] = useState(false);
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
  const currency = currencySymbol();
  const [casingItem, setCasingItem] = useState({
    name: ["Select Case"],
    length: ["Length"],
    photo: "http://designfires.pl/wp-content/uploads/2022/06/loaderImage.png",
    price: 0,
    variant: [],
    selected: false,
  });
  const [fireplaceItem, setFirePlaceItem] = useState({
    name: ["Select FirePlace"],
    length: ["Length"],
    photo: "http://designfires.pl/wp-content/uploads/2022/06/loaderImage.png",
    price: 0,
    variant: [],
    variant_details: undefined,
    filling: [],
    selected: false,
  });
  useEffect(() => {
    countCart();
    props.cartHandler(cart);
  }, [
    cart.addedCasing.price,
    cart.addedFireplace.price,
    cart.addedShs.price,
    cart.addedFilling.price,
    cart.addedTop.price,
    JSON.stringify(cart.addedDecorations),
    JSON.stringify(cart.addedAccessories),
  ]);
  const countPriceOfArrayItems = (products) => {
    const countPrice = products.map((item) => {
      return Number(item.price) * item.count;
    });
    const countedPrices = countPrice.reduce(
      (partialSum, i) => partialSum + i,
      0
    );
    return countedPrices;
  };
  const countCart = () => {
    const PRICE =
      Number(cart.addedCasing.price) +
      Number(cart.addedFireplace.price) +
      Number(cart.addedShs.price) +
      Number(cart.addedFilling.price) +
      Number(cart.addedTop.price) +
      countPriceOfArrayItems(cart.addedDecorations) +
      countPriceOfArrayItems(cart.addedAccessories);

    setCart((prevCart) => ({
      ...prevCart,
      cartPrice: PRICE,
    }));
  };

  const onFillingChange = (name, price) => {
    setCart((prevCart) => ({
      ...prevCart,
      addedFilling: {
        name,
        price,
      },
    }));
  };

  const addDecorationsToCart = (price, name, id) => {
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
      decoArray.push({ id, name, price, count: 1 });

      setCart((prevCart) => ({
        ...prevCart,
        addedDecorations: decoArray,
      }));
    }
    arr = undefined;
  };
  const addAccessoriesToCart = (price, name, id) => {
    console.log(price);
    let accessoryArray;
    accessoryArray = cart.addedAccessories;
    let findedItem = false;
    let arr = accessoryArray.map((object) => {
      if (object.id === id) {
        findedItem = true;
        return { ...object, count: object.count++ };
      }
      return [];
    });
    if (findedItem) {
      setCart((prevCart) => ({
        ...prevCart,
        addedAccesories: accessoryArray,
      }));
    } else {
      accessoryArray.push({ id, name, price, count: 1 });

      setCart((prevCart) => ({
        ...prevCart,
        addedAccessories: accessoryArray,
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
      },
      addedFireplace: {
        name: "",
        length: "",
        price: "",
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
  };
  ////Casings
  const showCasingPrice = (photo, name, variant) => {
    setCasingItem({
      name,
      photo,
      length: ["Length"],
      variant: variant,
      selected: true,
    });
  };
  const addCasingToCart = (
    pickedLength,
    variantPrice,
    variantImage,
    DKK_price,
    SEK_price
  ) => {
    const currencyPrice = () => {
      switch (lang.language) {
        case "swedish":
          return SEK_price;
        case "english":
          return variantPrice;

        case "danish":
          return DKK_price;
      }
    };
    setCasingItem((prevCasingItem) => ({
      ...prevCasingItem,
      price: currencyPrice(),
      length: pickedLength,
      photo: variantImage,
    }));

    setCart((prevCart) => ({
      ...prevCart,
      addedCasing: {
        name: casingItem.name,
        length: pickedLength,
        price: currencyPrice(),
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
    SEK_price
  ) => {
    const currencyPrice = () => {
      switch (lang.language) {
        case "swedish":
          return SEK_price;
        case "english":
          return variantPrice;

        case "danish":
          return DKK_price;
      }
    };

    setFirePlaceItem((prevCasingItem) => ({
      ...prevCasingItem,
      price: currencyPrice(),
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
      },
    }));

    setCart((prevCart) => ({
      ...prevCart,
      addedFireplace: {
        name: fireplaceItem.name,
        length: pickedLength,
        price: currencyPrice(),
      },
    }));
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
    if (enableShs) {
      setEnableShs(false);
      setCart((prevCart) => ({
        ...prevCart,
        addedShs: {
          name: "None",
          price: "0",
        },
      }));
      ///
    } else {
      setEnableShs(true);
      const currencyPrice = () => {
        switch (lang.language) {
          case "swedish":
            return "3995";
          case "english":
            return "400";

          case "danish":
            return "2995";
        }
      };
      setCart((prevCart) => ({
        ...prevCart,
        addedShs: {
          name: "Smart Home System",
          price: currencyPrice(),
        },
      }));
    }
  };
  const toggleStainlessTopHandler = () => {
    if (stainlessTop) {
      setStainlessTop(false);
      setCart((prevCart) => ({
        ...prevCart,
        addedTop: {
          name: "Black Top",
          price: "0",
        },
      }));
      ///
    } else {
      setStainlessTop(true);
      const currencyPrice = () => {
        switch (lang.language) {
          case "swedish":
            return "2995";
          case "english":
            return "300";

          case "danish":
            return "1995";
        }
      };
      setCart((prevCart) => ({
        ...prevCart,
        addedTop: {
          name: "Stainless Top",
          price: currencyPrice(),
        },
      }));
    }
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
              variant={fireplaceItem.variant}
              fireplaceName={fireplaceItem.name}
              fireplaceLength={fireplaceItem.length}
              selectedFireplacePrice={fireplaceItem.price}
              fireplacePhoto={fireplaceItem.photo}
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
              onPickLength={addCasingToCart}
              variant={casingItem.variant}
              casingName={casingItem.name}
              casingLength={casingItem.length}
              selectedCasingPrice={casingItem.price}
              casingPhoto={casingItem.photo}
              pickedCaseItem={casingItem}
            />
          </Container>
        </div>
        <Modal centered show={showCart} onHide={() => setShowCart(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Your Choise</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h3>
              {cart.addedCasing.name}
              {cart.addedCasing.length}
              {cart.addedCasing.price}
            </h3>
            <h3>
              {cart.addedFireplace.name}
              {cart.addedFireplace.length}
              {cart.addedFireplace.price}
              {cart.addedFilling.name && (
                <Row>
                  <Col md={{ span: 3, offset: 4 }}>
                    Filling Type: {cart.addedFilling.name}
                  </Col>
                  <Col md={{ span: 3, offset: 4 }}>
                    {cart.addedFilling.price}
                  </Col>
                </Row>
              )}

              {cart.addedShs.name}
              {cart.addedShs.price}
              {cart.addedTop.name}
              {cart.addedTop.price}
            </h3>
            <h3>
              {cart.addedCasing.name}
              {cart.addedCasing.length}
              {cart.addedCasing.price}
            </h3>
            <ul>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="outline-secondary"
              onClick={(() => clearCart(), () => setShowCart())}
            >
              Clear Cart
            </Button>
            <Button variant="primary" onClick={() => setShowCart(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <div className="customizer-item mt-3 ">
          <div>
            <Card className="card-deco carder">
              <Card.Header>
                <Tabs
                  id="controlled-tab"
                  activeKey={key}
                  onSelect={(k) => setKey(k)}
                  className="mb-1"
                >
                  <Tab eventKey="home" title="Decorations">
                    <ListGroup variant="flush">
                      <CustomizerItemList
                        ItemToList={decorations}
                        onAdd={addDecorationsToCart}
                        FireplaceLength={cart.addedFireplace.length}
                      />
                    </ListGroup>
                  </Tab>
                  <Tab eventKey="profile" title="Accessories">
                    <ListGroup variant="flush">
                      <CustomizerItemList
                        ItemToList={accessories}
                        onAdd={addAccessoriesToCart}
                      />
                    </ListGroup>
                  </Tab>
                </Tabs>
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
              {currency}
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
        </Stack>
      </div>
    </>
  );
};
export default Customizer;
/*<div>
            <Button variant="info" onClick={() => onShowCart()}>
              Check Cart
            </Button>
          </div>*/

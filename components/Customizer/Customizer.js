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
  Figure,
} from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { useChangePrice } from "../../hooks/change-price";
import { LanguageContext } from "../context/language-context";
import CustomizerItemList from "./CustomizerItemList";
import CustomizerCasings from "./CustomizerCasings";
import CustomizerFirePlaces from "./CustomizerFirePlaces";
import CustomizerModal from "./CustomizerModal";

const Customizer = (props) => {
  const lang = useContext(LanguageContext);
  const { decorations, accessories, casings, fireplace } = props;
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
  const currencyPrice = (engPrice, swePrice, danPrice) => {
    switch (lang.language) {
      case "english":
        return engPrice;
      case "swedish":
        return swePrice;
      case "danish":
        return danPrice;
    }
  };
  const currency = currencySymbol();
  const [casingItem, setCasingItem] = useState({
    name: ["Select Case"],
    length: [""],
    photo: "http://designfires.pl/wp-content/uploads/2022/06/loaderImage.png",
    price: 0,
    variant: [],
    enable: false,
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

  const onFillingChange = (name, Fillprice) => {
    const { price } = fireplaceItem;
    const { addedFilling } = cart;
    console.log(Fillprice);
    price = Number(price) - Number(addedFilling.price);
    setFirePlaceItem((prevCasingItem) => ({
      ...prevCasingItem,
      price: Number(price) + Number(Fillprice),
    }));
    setCart((prevCart) => ({
      ...prevCart,
      addedFilling: {
        name,
        price: Number(Fillprice),
      },
    }));
  };

  const addDecorationsToCart = (price, name, id, image) => {
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
      decoArray.push({ id, name, price, count: 1, image });

      setCart((prevCart) => ({
        ...prevCart,
        addedDecorations: decoArray,
      }));
    }
    arr = undefined;
  };
  const addAccessoriesToCart = (price, name, id, image) => {
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
      accessoryArray.push({ id, name, price, count: 1, image });

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
  const showCasingPrice = (photo, name, variant, item) => {
    console.log(item);

    setCasingItem((prevCasing) => ({
      ...prevCasing,
      name,
      photo,
      //length: ["Length"],
      variant: variant,
      selected: true,
      price: currencyPrice(
        item.price,
        item.SEK_price.value,
        item.DKK_price.value
      ),
    }));

    setCart((prevCart) => ({
      ...prevCart,
      addedCasing: {
        name: casingItem.name,
        length,
        price: currencyPrice(
          item.price,
          item.SEK_price.value,
          item.DKK_price.value
        ),
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
    setFirePlaceItem((prevItem) => ({
      ...prevItem,
      price: currencyPrice(variantPrice, SEK_price, DKK_price),
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
    let leng = (Number(pickedLength) + 60).toString();
    if (!casingItem.selected) {
      setCasingItem((prevCasingItem) => ({
        ...prevCasingItem,
        length: leng,
        enable: true,
      }));
    } else {
      const findCaseNamePicked = casings.find(
        (casings) => casings.name === casingItem.name
      );
      console.log(findCaseNamePicked);
      const findCaseVariantPicked = findCaseNamePicked.variant.find(
        (findCaseNamePicked) => findCaseNamePicked.length === leng
      );
      console.log(findCaseVariantPicked);
      console.log(findCaseVariantPicked.price);

      setCasingItem({
        length: leng,
        enable: true,
        name: findCaseNamePicked.name,
        length: leng,
        photo: findCaseVariantPicked.img,
        price: currencyPrice(
          findCaseVariantPicked.price,
          findCaseVariantPicked.SEK_price.value,
          findCaseVariantPicked.DKK_price.value
        ),
        variant: findCaseVariantPicked.variant,
        enable: true,
        selected: true,
      });
      setCart((prevCart) => ({
        ...prevCart,
        addedCasing: {
          name: findCaseNamePicked.name,
          length: leng,
          price: currencyPrice(
            findCaseVariantPicked.price,
            findCaseVariantPicked.SEK_price.value,
            findCaseVariantPicked.DKK_price.value
          ),
        },
      }));
    }

    // console.log(Number(pickedLength) + 60).toString();
    setCart((prevCart) => ({
      ...prevCart,
      addedFireplace: {
        name: fireplaceItem.name,
        length: pickedLength,
        price: currencyPrice(variantPrice, SEK_price, DKK_price),
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
    const { price } = fireplaceItem;

    if (enableShs) {
      setEnableShs(false);
      setCart((prevCart) => ({
        ...prevCart,
        addedShs: {
          name: "None",
          price: "0",
        },
      }));
      setFirePlaceItem((prevCasingItem) => ({
        ...prevCasingItem,
        price: Number(price) - Number(currencyPrice("400", "3995", "2995")),
      }));
      ///
    } else {
      setEnableShs(true);
      setFirePlaceItem((prevCasingItem) => ({
        ...prevCasingItem,
        price: Number(price) + Number(currencyPrice("400", "3995", "2995")),
      }));
      setCart((prevCart) => ({
        ...prevCart,
        addedShs: {
          name: "Smart Home System",
          price: currencyPrice("400", "3995", "2995"),
        },
      }));
    }
  };
  const toggleStainlessTopHandler = () => {
    const { price } = fireplaceItem;

    if (stainlessTop) {
      setStainlessTop(false);
      setCart((prevCart) => ({
        ...prevCart,
        addedTop: {
          name: "Black Top",
          price: "0",
        },
      }));
      setFirePlaceItem((prevCasingItem) => ({
        ...prevCasingItem,
        price: Number(price) - Number(currencyPrice("300", "2995", "1995")),
      }));
    } else {
      setStainlessTop(true);

      setFirePlaceItem((prevCasingItem) => ({
        ...prevCasingItem,
        price: Number(price) + Number(currencyPrice("300", "2995", "1995")),
      }));
      setCart((prevCart) => ({
        ...prevCart,
        addedTop: {
          name: "Stainless Top",
          price: currencyPrice("300", "2995", "1995"),
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
              onPickLength={showCasingPrice}
              variant={casingItem.variant}
              casingName={casingItem.name}
              casingLength={casingItem.length}
              selectedCasingPrice={casingItem.price}
              casingPhoto={casingItem.photo}
              pickedCaseItem={casingItem}
              enable={casingItem.enable}
            />
          </Container>
        </div>
        <Modal
          size="xl"
          centered
          show={showCart}
          onHide={() => setShowCart(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Your Choise</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col>
                <h2>FirePlace</h2>
                <Row>
                  <Col>
                    Name:{cart.addedFireplace.name}
                    {cart.addedFilling.name && (
                      <Row>
                        <Col md={{ span: 3, offset: 4 }}>
                          Filling Type: {cart.addedFilling.name}
                        </Col>
                        <Col md={{ span: 3, offset: 4 }}>
                          Price:{cart.addedFilling.price}
                        </Col>
                      </Row>
                    )}
                    {cart.addedShs.name && (
                      <div>
                        {cart.addedShs.name}
                        {cart.addedShs.price}
                      </div>
                    )}
                    {cart.addedTop.name && (
                      <div>
                        {" "}
                        {cart.addedTop.name}
                        {cart.addedTop.price}
                      </div>
                    )}
                  </Col>
                  <Col>Length:{cart.addedFireplace.length}</Col>
                  <Col>Price:{cart.addedFireplace.price}</Col>
                </Row>
              </Col>
              <Col>
                <h2>Casing</h2>
                <Row>
                  <Col>{cart.addedCasing.name}</Col>
                  <Col>Length:{cart.addedCasing.length}</Col>
                  <Col>Price:{cart.addedCasing.price}</Col>
                </Row>
              </Col>
            </Row>

            {cart.addedDecorations.map((item) => {
              return (
                <Row className="text-center">
                  <Col xs={3}>
                    <Figure>
                      <Figure.Image
                        className="figure-round mt-3"
                        min-width={50}
                        min-height={50}
                        width={100}
                        height={100}
                        alt="Fireplace decoration"
                        src={item.image} //"https://designfires.pl/wp-content/uploads/2022/06/transparentglass-100x100.jpeg" //{item.image}
                      />
                    </Figure>
                  </Col>
                  <Col xs={5}>
                    <p className="pt-5">{item.name}</p>
                  </Col>

                  <Col md="auto">
                    <p className="pt-5">x{item.count}</p>
                  </Col>
                  <Col md="auto">
                    <p className="pt-5">Price:{item.price}</p>
                  </Col>
                </Row>
              );
            })}

            <Col>
              {cart.addedAccessories.map((item) => {
                return (
                  <Row className="text-center">
                    <Col xs={3}>
                      <Figure>
                        <Figure.Image
                          className="figure-round mt-3"
                          min-width={50}
                          min-height={50}
                          width={100}
                          height={100}
                          alt="Fireplace decoration"
                          src={item.image} //"https://designfires.pl/wp-content/uploads/2022/06/transparentglass-100x100.jpeg" //{item.image}
                        />
                      </Figure>
                    </Col>
                    <Col xs={5}>
                      <p className="pt-5">{item.name}</p>
                    </Col>

                    <Col md="auto">
                      <p className="pt-5">x{item.count}</p>
                    </Col>
                    <Col md="auto">
                      <p className="pt-5">Price:{item.price}</p>
                    </Col>
                  </Row>
                );
              })}
            </Col>

            <h1>Total Price:{cart.cartPrice}</h1>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="outline-secondary"
              onClick={(() => clearCart(), () => setShowCart())}
            >
              Clear Cart
            </Button>
            <Button>Send This To Us</Button>
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

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
import { FiInfo } from "react-icons/fi";

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
    photo:
      "http://designfires.pl/wp-content/uploads/2022/07/CasingsDesignFires.png",
    price: 0,
    variant: [],
    enable: false,
    selected: false,
  });
  const [fireplaceItem, setFirePlaceItem] = useState({
    name: ["Select FirePlace"],
    length: ["Length"],
    photo: "http://designfires.pl/wp-content/uploads/2022/07/FIREPLACES.png",
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
    setFirePlaceItem({
      name: ["Select FirePlace"],
      length: ["Length"],
      photo: "http://designfires.pl/wp-content/uploads/2022/07/FIREPLACES.png",
      price: 0,
      variant: [],
      variant_details: undefined,
      filling: [],
      selected: false,
    });
    setCasingItem({
      name: ["Select Case"],
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
      price: currencyPrice(
        item.price,
        item.SEK_price.value,
        item.DKK_price.value
      ),
      fullName: mainItem.meta_data.find((item) => item.key === "fullname")
        .value,
    }));

    setCart((prevCart) => ({
      ...prevCart,
      addedCasing: {
        name: mainItem.name,
        length: item.length,
        price: currencyPrice(
          item.price,
          item.SEK_price.value,
          item.DKK_price.value
        ),
        photo,
        fullName: mainItem.meta_data.find((item) => item.key === "fullname")
          .value,
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
          photo: findCaseVariantPicked.img,
          fullName: findCaseNamePicked.meta_data.find(
            (item) => item.key === "fullname"
          ).value,
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
        photo: image,
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
          <Modal.Body className="modallo fw-bold">
            <div>
              <Row xs={2} md={2}>
                {cart.addedFireplace.length && (
                  <Col className="border">
                    <h2>FirePlace</h2>
                    <Row>
                      {" "}
                      <Figure>
                        <Figure.Image
                          className="figure-round mt-3"
                          width={300}
                          height={200}
                          alt="Fireplace image"
                          src={cart.addedFireplace.photo} //"https://designfires.pl/wp-content/uploads/2022/06/transparentglass-100x100.jpeg" //{item.image}
                        />
                      </Figure>
                      <Row>
                        <Col lg={true}>
                          <p>{cart.addedFireplace.name}</p>
                        </Col>
                        <Col lg={true}>
                          <p>Length:{cart.addedFireplace.length}mm</p>
                        </Col>

                        <Col lg={true}>
                          <p>
                            Price:{cart.addedFireplace.price}
                            {currencySymbol()}
                          </p>
                        </Col>
                      </Row>
                      <Row>
                        {cart.addedFilling.name && (
                          <Col lg={true}>
                            <p>
                              Filling Type: {cart.addedFilling.name}(
                              {cart.addedFilling.price}
                              {currencySymbol()})
                            </p>
                          </Col>
                        )}

                        {cart.addedShs.name && (
                          <Col>
                            <p>
                              {cart.addedShs.name}
                              {cart.addedShs.price}
                              {currencySymbol()}
                            </p>
                          </Col>
                        )}
                        {cart.addedTop.name && (
                          <Col>
                            <p>
                              {" "}
                              {cart.addedTop.name}
                              {cart.addedTop.price}
                              {currencySymbol()}
                            </p>
                          </Col>
                        )}
                      </Row>
                    </Row>
                  </Col>
                )}
                {cart.addedCasing.length && (
                  <Col className="border">
                    <h2>Casing</h2>
                    <Row>
                      <Figure>
                        <Figure.Image
                          className="figure-round mt-3"
                          width={250}
                          height={200}
                          alt="Casing image"
                          src={cart.addedCasing.photo}
                        />
                      </Figure>
                      <Row>
                        <Col lg={true}>
                          <p>{cart.addedCasing.fullName}</p>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={true}>
                          <p>{cart.addedCasing.name}</p>
                        </Col>
                        <Col lg={true}>
                          <p>Length:{cart.addedCasing.length}mm</p>
                        </Col>
                        <Col lg={true}>
                          <p>
                            Price:{cart.addedCasing.price}
                            {currencySymbol()}
                          </p>
                        </Col>
                      </Row>
                    </Row>
                  </Col>
                )}
              </Row>

              {cart.addedDecorations.map((items) => {
                return (
                  <Row
                    key={items.id}
                    className="justify-content-md-start border"
                  >
                    <Col xs lg="3">
                      <Figure>
                        <Figure.Image
                          className="figure-round mt-3"
                          width={100}
                          height={100}
                          alt="Fireplace decoration"
                          src={items.image} //"https://designfires.pl/wp-content/uploads/2022/06/transparentglass-100x100.jpeg" //{item.image}
                        />
                      </Figure>
                    </Col>
                    <Col xs={5} xs lg="4">
                      <p className="pt-5">{items.name}</p>
                    </Col>

                    <Col xs lg="1">
                      <p className="pt-5">x{items.count}</p>
                    </Col>
                    <Col xs lg="1">
                      <p className="pt-5">
                        Price:{items.price}
                        {currencySymbol()}
                      </p>
                    </Col>
                  </Row>
                );
              })}

              <Col>
                {cart.addedAccessories.map((item) => {
                  return (
                    <Row
                      key={item.id}
                      className="justify-content-md-start border"
                    >
                      <Col xs lg="3">
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
                      <Col xs={5} xs lg="4">
                        <p className="pt-5">{item.name}</p>
                      </Col>

                      <Col xs lg="1">
                        <p className="pt-5">x{item.count}</p>
                      </Col>
                      <Col xs lg="1">
                        <p className="pt-5">
                          Price:{item.price}
                          {currencySymbol()}
                        </p>
                      </Col>
                    </Row>
                  );
                })}
              </Col>
              {cart.addedCasing.length.length === 0 &&
              cart.addedFireplace.length.length === 0 &&
              cart.addedAccessories.length === 0 &&
              cart.addedDecorations.length === 0 ? (
                <h1>
                  Nothing added. Maybe You sholud add some of our beautiful
                  fireplace?
                </h1>
              ) : (
                <h1 className="mt-4">
                  Total Price:{cart.cartPrice}
                  {currencySymbol()}
                </h1>
              )}
            </div>
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

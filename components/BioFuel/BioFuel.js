import { useContext, useState } from "react";
import LanguageSwitcher from "../UI/LanguageSwitcher/LanguageSwitcher";
import {
  Row,
  Col,
  Button,
  Card,
  Container,
  Modal,
  Badge,
} from "react-bootstrap";
import { useCart } from "react-use-cart";
import { useCartCurrency } from "../../hooks/useCartCurrency";
import Contact from "../NewCustomizer/Contact";
import Image from "next/image";

import { LanguageContext } from "../context/language-context";

const BioFuel = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [pickedFuel, setPickedFuel] = useState();
  //const [pcsFuel, setPcsFuel] = useState(1);
  const lang = useContext(LanguageContext);
  const { addItem, getItem, updateItemQuantity, items, inCart } = useCart();
  const { getPrices } = useCartCurrency();
  const FuelProducts = props.fuel;
  const findCurrencyPrice = (itemArray, keyToSearch) => {
    let findedPriceObj = itemArray.find((item) => item.key === keyToSearch);

    return findedPriceObj;
  };
  const onFuelSelect = (item) => {
    /*  const priceSEK = item.meta_data.find(
      (key) =>
        key.key === "_alg_currency_switcher_per_product_regular_price_SEK"
    );
    const priceDKK = item.meta_data.find(
      (key) =>
        key.key === "_alg_currency_switcher_per_product_regular_price_DKK"
    );
    const itemWithPrices = {
      ...item,
      priceSEK: priceSEK.value,
      priceDKK: priceDKK.value,
    };*/

    //setPickedFuel(itemWithPrices);
    setPickedFuel(item);
    setOpenModal(true);
  };

  const onModalClose = () => {
    setShowContactForm(false);
    setOpenModal(false);
  };
  const onConfirm = () => {
    //  console.log(items);
    /* const decoArray = [];
    const priceSEK = pickedFuel.meta_data.find(
      (key) =>
        key.key === "_alg_currency_switcher_per_product_regular_price_SEK"
    );
    const priceDKK = pickedFuel.meta_data.find(
      (key) =>
        key.key === "_alg_currency_switcher_per_product_regular_price_DKK"
    );
    decoArray.push({
      id: pickedFuel.id,
      name: pickedFuel.name,
      priceEUR: pickedFuel.price,
      priceSEK: priceSEK.value,
      priceDKK: priceDKK.value,
      count: pcsFuel,
      image: pickedFuel.images[0].src,
    });

    props.cartHandler((prevCart) => ({
      ...prevCart,
      addedDecorations: decoArray,
    }));*/

    //console.log(decoArray);
    setShowContactForm(!showContactForm);
  };
  return (
    <div id="fuel" className="text-white text-center mb-5">
      <Modal size="xl" centered show={openModal} onHide={onModalClose}>
        {" "}
        <Modal.Header closeButton>
          <Modal.Title>Your Choise</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modallo">
          <Container>
            {pickedFuel && (
              <>
                <div>
                  <Row
                    xs={1}
                    md={4}
                    className="justify-content-between align-items-center p-2"
                  >
                    <Col>
                      <Image
                        className="rounded"
                        src={pickedFuel.images[0].shop_thumbnail}
                        alt="fuel image"
                        height={100}
                        width={100}
                      />
                    </Col>
                    <Col>
                      <Badge className="mt-3 text-wrap">
                        <h5 className="bolder"> {pickedFuel.name}</h5>
                      </Badge>
                    </Col>
                    <Col md="auto">
                      <Badge className="bolder ">
                        <span className="fw-bold fs-5">
                          {lang.currencyPrice(
                            pickedFuel.price,
                            pickedFuel.priceSEK,
                            pickedFuel.priceDKK
                          )}
                          {lang.currencySymbol()}
                        </span>
                      </Badge>
                    </Col>
                    <Col className="">
                      <Badge>
                        <span className="fw-bold fs-5">
                          x
                          {inCart(pickedFuel.id)
                            ? getItem(pickedFuel.id).quantity
                            : 0}
                        </span>
                      </Badge>

                      <Button
                        variant="info"
                        className="m-1"
                        size="sm"
                        //as={Badge}
                        onClick={() =>
                          addItem({
                            ...pickedFuel,
                            prices: getPrices(
                              pickedFuel.price,
                              pickedFuel.SEK_price,
                              pickedFuel.DKK_price
                            ),
                            img: pickedFuel.images[0].shop_thumbnail,
                          })
                        }
                      >
                        +
                      </Button>
                      {inCart(pickedFuel.id) && (
                        <Button
                          variant="info"
                          className="m-1"
                          size="sm"
                          //as={Badge}
                          //onClick={onRemove}
                          onClick={() =>
                            updateItemQuantity(
                              pickedFuel.id,
                              getItem(pickedFuel.id).quantity - 1
                            )
                          }
                        >
                          -
                        </Button>
                      )}
                    </Col>{" "}
                  </Row>{" "}
                  <h5 className="float-end">
                    <Badge>
                      <span className="fs-5">
                        Total:
                        {inCart(pickedFuel.id)
                          ? lang
                              .currencyPrice(
                                getItem(pickedFuel.id).prices.find(
                                  (item) => item.currency === "EUR"
                                ).amount * getItem(pickedFuel.id).quantity,
                                getItem(pickedFuel.id).prices.find(
                                  (item) => item.currency === "SEK"
                                ).amount * getItem(pickedFuel.id).quantity,
                                getItem(pickedFuel.id).prices.find(
                                  (item) => item.currency === "DKK"
                                ).amount * getItem(pickedFuel.id).quantity
                              )
                              .toLocaleString(undefined, {
                                maximumFractionDigits: 2,
                              })
                          : 0}{" "}
                        {lang.currencySymbol()}
                      </span>
                    </Badge>
                  </h5>
                  <h5>
                    <Badge>30 pcs its max on 1 pallet</Badge>
                  </h5>
                </div>
                <div className="my-3">
                  <Button variant="info" onClick={() => onConfirm()}>
                    Send it to us
                  </Button>
                  <span> </span>
                  <Button onClick={onModalClose}>Close</Button>
                </div>
              </>
            )}
            {showContactForm && <Contact />}
          </Container>
        </Modal.Body>
      </Modal>{" "}
      <div className="w-100 bg-danger p-3 my-5 fst-italic">
        <h1 className="">High Quality Bio-Ethanol Fuel</h1>
      </div>
      <Container>
        <div className="my-5">
          <h4 className="py-3">
            We are very proud to be able to deliver the best quality in the
            class of Bio-Ethanol. Use only the best Ethanol. Cheap ethanol is
            often sold as good quality.
          </h4>
          <p>
            Ethanol is not just ethanol, it can be made from mineral or
            vegetable (from underground or from plants) and there is a very big
            difference between ethanol and Ethanol.
          </p>
        </div>
        <Row className="bg-danger p-3 list" style={{ borderRadius: 35 }}>
          <Col>
            <h2 className="text-white fw-bold p-3 mb-3">
              <span className="shortName">DesignFires</span> Ethanol Fuel
            </h2>
            <ul className="">
              <li>Best alcohol % gives beautiful real yellow flames</li>
              <li>Plants-based ethanol which gives no smell on burned off</li>
              <li>Bio-Neutral</li>
              <li>Longer life of ethanol fireplaces</li>{" "}
              <li>
                1 liter 0.8kg Ethanol gives 7.2kW the same as a normal wood
                burning stove can provide
              </li>
            </ul>
          </Col>
          <Col>
            <h2 className="text-white p-3 mb-3">Others ethanol Fuel</h2>
            <ul>
              <li>Too high alcohol % gives a white flame</li>
              <li>Too low alcohol % gives a cold and blue flame</li>
              <li>Cheaper synthetics ethanol creates unpleasant smell</li>
              <li>Negative impact ethanol fireplaces ( more service cost )</li>
            </ul>
          </Col>
        </Row>
        <h5 className="mt-4">
          You know nothing about Ethanol fuel until you have tried DesignFires
          Ethanol fuel.
        </h5>

        <Row className="my-5 justify-content-center flex-nowrap">
          {FuelProducts.map((item) => (
            <Col key={item.id} className="d-flex justify-content-center">
              <Card
                bg="danger"
                className="grow"
                style={{ maxWidth: "24rem", borderRadius: "25px" }}
              >
                <Card.Img
                  variant="top"
                  src={item.images[0].woocommerce_thumbnail}
                  className="p-3 "
                  style={{ borderRadius: "25px", maxHeight: "350px" }}
                />
                <Card.Body>
                  <Card.Title className="fs-4">{item.name}</Card.Title>
                  <div className="fs-5 fw-bold my-3">
                    <Row>
                      <Col className="d-flex justify-content-end">
                        <span className="text-center py-3">
                          Price:<span> </span>
                          {Number(
                            lang.currencyPrice(
                              item.price,
                              findCurrencyPrice(
                                item.meta_data,
                                "_alg_currency_switcher_per_product_regular_price_SEK"
                              ).value,
                              findCurrencyPrice(
                                item.meta_data,
                                "_alg_currency_switcher_per_product_regular_price_DKK"
                              ).value
                            )
                          ).toLocaleString(undefined, {
                            maximumFractionDigits: 2,
                          })}
                          <span> </span>
                          {lang.currencySymbol()}
                        </span>
                      </Col>
                      <Col md="auto">
                        <LanguageSwitcher />
                      </Col>
                    </Row>
                  </div>
                  <Button
                    //href={`#${item.id}`}
                    onClick={() => onFuelSelect(item)}
                    variant="info"
                  >
                    Order
                  </Button>
                </Card.Body>
                <span className="p-2">Price includes 25% VAT</span>
              </Card>
            </Col>
          ))}
        </Row>

        <h6>
          Shipping is added when not purchasing a complete pallet. Send your
          address and we will give you a price for delivery. Delivery time from
          3-10 days.
        </h6>
      </Container>
    </div>
  );
};
export default BioFuel;

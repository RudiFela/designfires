import { useContext, useState, useRef } from "react";
import Dimensions from "../UI/Dimensions";
import { LanguageContext } from "../context/language-context";
import { RiDeleteBin6Line } from "react-icons/ri";
import {
  CgArrowsMergeAltV,
  CgArrowsShrinkH,
  CgArrowsShrinkV,
  CgArrowsExpandRight,
} from "react-icons/cg";
import {
  Modal,
  Row,
  Col,
  Button,
  Figure,
  Container,
  Badge,
  Ratio,
} from "react-bootstrap";
import Image from "next/image";
import ContactForm from "../../containers/footer/ContactForm";
import dynamic from "next/dynamic";
const GeneratePDF = dynamic(() => import("./../GeneratePDF/GeneratePdf"), {
  ssr: false,
});
const CheckCartModal = (props) => {
  const lang = useContext(LanguageContext);
  const { cart } = props;
  const [showContactForm, setShowContactForm] = useState(false);
  const CheckCartRef = useRef();
  const closeModal = () => {
    props.onClose();
    setShowContactForm(false);
  };
  const handleClick = () => {
    console.log(CheckCartRef.current.outerHTML);
  };
  return (
    <Modal
      size="xl"
      centered
      show={props.showCart}
      onHide={() => props.onClose()}
    >
      <Modal.Header closeButton>
        <Modal.Title>Your Choise</Modal.Title>
      </Modal.Header>

      <Modal.Body
        /* style={{
          backgroundImage:
            "url(" +
            "https://designfires.pl/wp-content/uploads/2022/07/CartBackground.png" +
            ")",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}*/

        id="print"
        ref={CheckCartRef}
        className="modallo fw-bold"
      >
        <div>
          <Container>
            <Row className="border p-2" id="text">
              {cart.addedFireplace.length && (
                <>
                  <h1 className="fw-bolder mb-3 text-center">
                    <Badge>FirePlace</Badge>
                  </h1>
                  <Row xs="1" md="1" lg="3">
                    {" "}
                    <Col>
                      <Figure className="m-0">
                        <img
                          className="figure-round figure-img img-fluid"
                          width={400}
                          height={300}
                          src={cart.addedFireplace.photo}
                          alt="Fireplace Image"
                        />
                      </Figure>
                    </Col>
                    <Col>
                      <Dimensions
                        name={cart.addedFireplace.name}
                        length={cart.addedFireplace.length}
                        height={cart.addedFireplace.height}
                        width={cart.addedFireplace.width}
                        thickness="3mm"
                      />

                      <Row>
                        <p className="fs-4">
                          Price:
                          <Badge className="float-end">
                            {" "}
                            {Number(
                              lang.currencyPrice(
                                cart.addedFireplace.priceEUR,
                                cart.addedFireplace.priceSEK,
                                cart.addedFireplace.priceDKK
                              )
                            ).toLocaleString(undefined, {
                              maximumFractionDigits: 2,
                            })}
                            <span> </span> {props.currency()}
                          </Badge>
                        </p>
                        {Number(cart.manufactureCost.manufacture_cost_EUR) >
                        0 ? (
                          <p className="fs-4">
                            Manufacture:
                            <span className="text-info">
                              <Badge bg="info" className="float-end">
                                {Number(
                                  lang.currencyPrice(
                                    cart.manufactureCost.manufacture_cost_EUR,
                                    cart.manufactureCost.manufacture_cost_SEK,
                                    cart.manufactureCost.manufacture_cost_DKK
                                  )
                                ).toLocaleString(undefined, {
                                  maximumFractionDigits: 2,
                                })}
                                <span> </span> {props.currency()}
                              </Badge>{" "}
                            </span>
                          </p>
                        ) : null}
                      </Row>
                    </Col>
                    <Col>
                      <Badge className="mb-3">
                        <span className="fs-4">Extra options</span>
                      </Badge>
                      {cart.addedFilling.name && (
                        <Col lg={true}>
                          <p className="fs-5">
                            Filling Type: {cart.addedFilling.name}
                            <Badge className="float-end">
                              {Number(
                                lang.currencyPrice(
                                  cart.addedFilling.priceEUR,
                                  cart.addedFilling.priceSEK,
                                  cart.addedFilling.priceDKK
                                )
                              ).toLocaleString(undefined, {
                                maximumFractionDigits: 2,
                              })}
                              <span> </span> {props.currency()}
                            </Badge>
                          </p>
                        </Col>
                      )}

                      {cart.addedShs.name && (
                        <Col>
                          <p className="fs-5">
                            {cart.addedShs.name}
                            <Badge className="float-end">
                              {Number(
                                lang.currencyPrice(
                                  cart.addedShs.priceEUR,
                                  cart.addedShs.priceSEK,
                                  cart.addedShs.priceDKK
                                )
                              ).toLocaleString(undefined, {
                                maximumFractionDigits: 2,
                              })}
                              <span> </span> {props.currency()}
                            </Badge>
                          </p>
                        </Col>
                      )}
                      {cart.addedTop.name && (
                        <Col>
                          <p className="fs-5">
                            {" "}
                            {cart.addedTop.name}{" "}
                            <Badge className="float-end">
                              {Number(
                                lang.currencyPrice(
                                  cart.addedTop.priceEUR,
                                  cart.addedTop.priceSEK,
                                  cart.addedTop.priceDKK
                                )
                              ).toLocaleString(undefined, {
                                maximumFractionDigits: 2,
                              })}
                              <span> </span> {props.currency()}
                            </Badge>
                          </p>
                        </Col>
                      )}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <p className="fs-4 float-end">
                        Total:
                        <Badge>
                          {Number(
                            lang.currencyPrice(
                              Number(cart.addedFireplace.priceEUR) +
                                Number(cart.addedShs.priceEUR) +
                                Number(cart.addedTop.priceEUR) +
                                Number(cart.addedFilling.priceEUR) +
                                Number(
                                  cart.manufactureCost.manufacture_cost_EUR
                                ),
                              Number(cart.addedFireplace.priceSEK) +
                                Number(cart.addedShs.priceSEK) +
                                Number(cart.addedTop.priceSEK) +
                                Number(cart.addedFilling.priceSEK) +
                                Number(
                                  cart.manufactureCost.manufacture_cost_SEK
                                ),
                              Number(cart.addedFireplace.priceDKK) +
                                Number(cart.addedShs.priceDKK) +
                                Number(cart.addedTop.priceDKK) +
                                Number(cart.addedFilling.priceDKK) +
                                Number(
                                  cart.manufactureCost.manufacture_cost_DKK
                                )
                            )
                          ).toLocaleString(undefined, {
                            maximumFractionDigits: 2,
                          })}
                          <span> </span> {props.currency()}
                        </Badge>
                      </p>
                    </Col>
                  </Row>
                </>
              )}
            </Row>

            {cart.addedCasing.length && (
              <Row className="border p-2" xs="1" md="1" lg="2">
                <Figure className="m-0">
                  <img
                    className="figure-round figure-img img-fluid"
                    //width={250}
                    //height={200}
                    width={350}
                    height={250}
                    //layout="fill"
                    src={cart.addedCasing.photo}
                    alt="Casing Image"
                  />
                </Figure>

                <Col>
                  <Dimensions
                    name={cart.addedCasing.fullName}
                    length={cart.addedCasing.length}
                    width="350"
                    height="500"
                    thickness={
                      cart.addedCasing.name === "Furniture Box" ? "25mm" : "5mm"
                    }
                  />{" "}
                  {cart.addedCasing.name === "Furniture Box" ? (
                    <Row>
                      <p>
                        <span>
                          Color:
                          <div
                            style={{
                              width: "50px",
                              height: "50px",
                              backgroundColor: cart.addedCasing.color,
                              border: "solid 1px",
                            }}
                            className="text-black"
                          ></div>
                        </span>
                      </p>
                    </Row>
                  ) : null}
                  <Col>
                    <Row>
                      <p className="fs-4">
                        Price:
                        <Badge className="float-end">
                          {" "}
                          {Number(
                            lang.currencyPrice(
                              cart.addedCasing.priceEUR,
                              cart.addedCasing.priceSEK,
                              cart.addedCasing.priceDKK
                            )
                          ).toLocaleString(undefined, {
                            maximumFractionDigits: 2,
                          })}
                          <span> </span> {props.currency()}
                        </Badge>
                      </p>
                    </Row>
                  </Col>
                </Col>
              </Row>
            )}

            {cart.addedDecorations.map((items) => {
              return (
                <Row
                  key={items.id}
                  className="justify-content-between align-items-center border p-2"
                >
                  <Col xs="auto">
                    <Figure className="m-0">
                      <img
                        className="figure-round figure-img img-fluid"
                        width={100}
                        height={100}
                        src={items.image}
                        alt="Decoration Image"
                      />
                    </Figure>
                  </Col>
                  <Col xs lg="3">
                    <p className="m-0">{items.name}</p>
                  </Col>

                  <Col xs="auto">
                    <p className="m-0">x{items.count}</p>
                  </Col>
                  <Col xs lg="2">
                    <p className="m-0">
                      Price:
                      {Number(
                        lang.currencyPrice(
                          items.priceEUR,
                          items.priceSEK,
                          items.priceDKK
                        )
                      ).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                      <span> </span> {props.currency()}
                    </p>
                  </Col>
                  <Col xs lg="3">
                    <p className=" m-0 ps-3 float-end">
                      Total:
                      {Number(
                        lang.currencyPrice(
                          items.priceEUR,
                          items.priceSEK,
                          items.priceDKK
                        ) * items.count
                      ).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                      <span> </span> {props.currency()}
                    </p>
                  </Col>
                </Row>
              );
            })}
            {Number(cart.addedAccessories.glass.pcs) > 0 &&
              cart.addedAccessories.glass.image !== "" && (
                <Row className="justify-content-between align-items-center border p-2">
                  <Col xs="auto">
                    <Figure className="m-0">
                      <img
                        className="figure-round figure-img img-fluid"
                        width={100}
                        height={100}
                        src={cart.addedAccessories.glass.image}
                        alt="Glass picture"
                      />
                    </Figure>
                  </Col>
                  <Col xs lg="3">
                    <p className="m-0">
                      Glass({cart.addedAccessories.glass.color}):
                    </p>
                    <p>
                      {cart.addedAccessories.glass.length.option}mm/200mm/6mm
                    </p>
                  </Col>

                  <Col xs="auto">
                    <p className="m-0">x{cart.addedAccessories.glass.pcs}</p>
                  </Col>
                  <Col xs lg="2">
                    <p className="m-0">
                      Price:
                      {Number(
                        lang.currencyPrice(
                          cart.addedAccessories.glass.priceEUR,
                          cart.addedAccessories.glass.priceSEK,
                          cart.addedAccessories.glass.priceDKK
                        )
                      ).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                      <span> </span> {props.currency()}
                    </p>
                  </Col>
                  <Col xs lg="3">
                    <p className="m-0 ps-2 float-end">
                      Total:
                      {Number(
                        lang.currencyPrice(
                          cart.addedAccessories.glass.priceEUR,
                          cart.addedAccessories.glass.priceSEK,
                          cart.addedAccessories.glass.priceDKK
                        ) * cart.addedAccessories.glass.pcs
                      ).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                      <span> </span> {props.currency()}
                    </p>
                  </Col>
                </Row>
              )}

            {Number(cart.addedAccessories.glass.split_glass.pcs) > 0 && (
              <Row className="justify-content-between align-items-center border p-2">
                <Col xs="auto">
                  <Figure className="m-0">
                    <img
                      className="figure-round figure-img img-fluid"
                      width={100}
                      height={100}
                      src={cart.addedAccessories.glass.image}
                      alt="Glass picture"
                    />
                  </Figure>
                </Col>
                <Col xs lg="3">
                  <p className="m-0">
                    Glass({cart.addedAccessories.glass.color}):
                  </p>
                  <p>
                    {cart.addedAccessories.glass.split_glass.length.option}
                    mm/200mm/6mm
                  </p>
                </Col>

                <Col xs="auto">
                  <p className="m-0">
                    x{cart.addedAccessories.glass.split_glass.pcs}
                  </p>
                </Col>
                <Col xs lg="2">
                  <p className="m-0">
                    Price:
                    {Number(
                      lang.currencyPrice(
                        cart.addedAccessories.glass.split_glass.priceEUR,
                        cart.addedAccessories.glass.split_glass.priceSEK,
                        cart.addedAccessories.glass.split_glass.priceDKK
                      )
                    ).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    <span> </span> {props.currency()}
                  </p>
                </Col>
                <Col xs lg="3">
                  <p className="m-0 ps-2 float-end">
                    Total:
                    {Number(
                      lang.currencyPrice(
                        cart.addedAccessories.glass.split_glass.priceEUR,
                        cart.addedAccessories.glass.split_glass.priceSEK,
                        cart.addedAccessories.glass.split_glass.priceDKK
                      ) * cart.addedAccessories.glass.split_glass.pcs
                    ).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    <span> </span> {props.currency()}
                  </p>
                </Col>
              </Row>
            )}

            {Number(cart.addedAccessories.glass.short.short_pcs) > 0 &&
              cart.addedAccessories.glass.image !== "" && (
                <Row className="justify-content-between align-items-center border p-2">
                  <Col xs="auto">
                    <Figure className="m-0">
                      <img
                        className="figure-round figure-img img-fluid"
                        width={100}
                        height={100}
                        src={cart.addedAccessories.glass.image}
                        alt="Glass picture"
                      />
                    </Figure>
                  </Col>
                  <Col xs lg="3">
                    <p className="m-0">
                      Glass({cart.addedAccessories.glass.color}):
                    </p>
                    <p>
                      {" "}
                      {cart.addedAccessories.glass.short.short_length}
                      mm/200mm/6mm
                    </p>
                  </Col>

                  <Col xs="auto">
                    <p className="m-0">
                      x{cart.addedAccessories.glass.short.short_pcs}
                    </p>
                  </Col>
                  <Col xs lg="2">
                    <p className="m-0">
                      Price:
                      {Number(
                        lang.currencyPrice(
                          cart.addedAccessories.glass.short.priceEUR,
                          cart.addedAccessories.glass.short.priceSEK,
                          cart.addedAccessories.glass.short.priceDKK
                        )
                      ).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                      <span> </span> {props.currency()}
                    </p>
                  </Col>
                  <Col xs lg="3">
                    <p className="m-0 ps-2 float-end">
                      Total:
                      {Number(
                        lang.currencyPrice(
                          cart.addedAccessories.glass.short.priceEUR,
                          cart.addedAccessories.glass.short.priceSEK,
                          cart.addedAccessories.glass.short.priceDKK
                        ) * cart.addedAccessories.glass.short.short_pcs
                      ).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                      <span> </span> {props.currency()}
                    </p>
                  </Col>
                </Row>
              )}
            {Number(cart.addedAccessories.holders.pcs) > 0 && (
              <Row className="justify-content-between align-items-center border p-2">
                <Col xs="auto">
                  <Figure className="m-0">
                    <img
                      className="figure-round figure-img img-fluid"
                      width={100}
                      height={100}
                      src={cart.addedAccessories.holders.image}
                      alt="Fireplace decoration"
                    />
                  </Figure>
                </Col>
                <Col xs lg="3">
                  <p className="m-0">Glass Holders x2 pcs </p>
                </Col>

                <Col xs="auto">
                  <p className="m-0">x{cart.addedAccessories.holders.pcs}</p>
                </Col>
                <Col xs lg="2">
                  <p className="m-0">
                    Price:
                    {Number(
                      lang.currencyPrice(
                        cart.addedAccessories.holders.priceEUR,
                        cart.addedAccessories.holders.priceSEK,
                        cart.addedAccessories.holders.priceDKK
                      )
                    ).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    <span> </span> {props.currency()}
                  </p>
                </Col>
                <Col xs lg="3">
                  <p className="m-0 ps-2 float-end">
                    Total:
                    {Number(
                      lang.currencyPrice(
                        cart.addedAccessories.holders.priceEUR,
                        cart.addedAccessories.holders.priceSEK,
                        cart.addedAccessories.holders.priceDKK
                      ) * cart.addedAccessories.holders.pcs
                    ).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    <span> </span> {props.currency()}
                  </p>
                </Col>
              </Row>
            )}
          </Container>
          {props.children}
          {cart.addedCasing.length.length === 0 &&
          cart.addedFireplace.length.length === 0 &&
          cart.addedDecorations.length === 0 ? (
            <h1>
              Nothing added. Maybe You sholud add some of our beautiful
              fireplace?
            </h1>
          ) : (
            <Col className="float-end">
              <h3 className="mt-4 fw-bold">
                Total Price:
                {Number(cart.cartPrice).toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}
                <span> </span> {props.currency()}
              </h3>
              <p>All prices includes 25% VAT</p>
            </Col>
          )}
          {showContactForm && (
            <ContactForm className="text-white" cartHandler={cart} />
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="info" onClick={() => props.onClear()}>
          <RiDeleteBin6Line />
        </Button>
        <Button onClick={() => setShowContactForm(true)}>
          Send This To Us
        </Button>
        <Button variant="primary" onClick={() => closeModal()}>
          Close
        </Button>
        <GeneratePDF html={CheckCartRef} />
      </Modal.Footer>
    </Modal>
  );
};
export default CheckCartModal;
/*{cart.addedAccessories.map((item) => {
              return (
                <Row key={item.id} className="justify-content-md-start border">
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
                  <Col xs lg="4">
                    <p className="pt-5">{item.name}</p>
                  </Col>

                  <Col xs lg="1">
                    <p className="pt-5">x{item.count}</p>
                  </Col>
                  <Col xs lg="1">
                    <p className="pt-5">
                      Price:{item.price}
                      {props.currency()}
                    </p>
                  </Col>
                </Row>
              );
            })}*/

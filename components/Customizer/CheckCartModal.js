import { useContext, useState } from "react";
import { LanguageContext } from "../context/language-context";
import { Modal, Row, Col, Button, Figure } from "react-bootstrap";
import Image from "next/image";
import ContactForm from "../../containers/footer/ContactForm";
const CheckCartModal = (props) => {
  const lang = useContext(LanguageContext);
  const { cart } = props;
  const [showContactForm, setShowContactForm] = useState(false);
  const closeModal = () => {
    props.onClose();
    setShowContactForm(false);
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
      <Modal.Body className="modallo fw-bold">
        <div>
          <Row xs={2} md={2}>
            {cart.addedFireplace.length && (
              <Col className="border">
                <h2>FirePlace</h2>
                <Row>
                  {" "}
                  <Col>
                    <Figure className="m-0">
                      <Image
                        className="figure-round figure-img img-fluid"
                        width={400}
                        height={300}
                        src={cart.addedFireplace.photo}
                        alt="Fireplace Image"
                      />
                    </Figure>
                  </Col>
                  <Col>
                    <Row>
                      <p>{cart.addedFireplace.name}</p>
                    </Row>
                    <Row>
                      <p>
                        {cart.addedFireplace.length}mm/
                        {cart.addedFireplace.info}/3mm
                      </p>
                    </Row>{" "}
                    <Row>
                      <p>
                        Price:
                        {lang.currencyPrice(
                          cart.addedFireplace.priceEUR,
                          cart.addedFireplace.priceSEK,
                          cart.addedFireplace.priceDKK
                        )}
                        {props.currency()}
                      </p>
                    </Row>
                  </Col>
                  <Row>
                    {cart.addedFilling.name && (
                      <Col lg={true}>
                        <p>
                          Filling Type: {cart.addedFilling.name}(
                          {lang.currencyPrice(
                            cart.addedFilling.priceEUR,
                            cart.addedFilling.priceSEK,
                            cart.addedFilling.priceDKK
                          )}
                          {props.currency()})
                        </p>
                      </Col>
                    )}

                    {cart.addedShs.name && (
                      <Col>
                        <p>
                          {cart.addedShs.name}
                          {lang.currencyPrice(
                            cart.addedShs.priceEUR,
                            cart.addedShs.priceSEK,
                            cart.addedShs.priceDKK
                          )}
                          {props.currency()}
                        </p>
                      </Col>
                    )}
                    {cart.addedTop.name && (
                      <Col>
                        <p>
                          {" "}
                          {cart.addedTop.name}{" "}
                          {lang.currencyPrice(
                            cart.addedTop.priceEUR,
                            cart.addedTop.priceSEK,
                            cart.addedTop.priceDKK
                          )}
                          {props.currency()}
                        </p>
                      </Col>
                    )}
                  </Row>
                </Row>
                <Row className="float-end">
                  <p>
                    Total:
                    {lang.currencyPrice(
                      Number(cart.addedFireplace.priceEUR) +
                        Number(cart.addedShs.priceEUR) +
                        Number(cart.addedTop.priceEUR) +
                        Number(cart.addedFilling.priceEUR),
                      Number(cart.addedFireplace.priceSEK) +
                        Number(cart.addedShs.priceSEK) +
                        Number(cart.addedTop.priceSEK) +
                        Number(cart.addedFilling.priceSEK),
                      Number(cart.addedFireplace.priceDKK) +
                        Number(cart.addedShs.priceDKK) +
                        Number(cart.addedTop.priceDKK) +
                        Number(cart.addedFilling.priceDKK)
                    )}
                    {props.currency()}
                  </p>
                </Row>
              </Col>
            )}
            {cart.addedCasing.length && (
              <Col className="border">
                <h2>Casing</h2>
                <Row>
                  <Col>
                    <Figure className="m-0">
                      <Image
                        className="figure-round figure-img img-fluid"
                        width={250}
                        height={200}
                        src={cart.addedCasing.photo}
                        alt="Casing Image"
                      />
                    </Figure>
                  </Col>
                  <Col lg={true}>
                    <Row>
                      <p>Name:{cart.addedCasing.name}</p>
                    </Row>
                    <Row>
                      <p>{cart.addedCasing.length}mm/350mm/500mm/5mm</p>
                    </Row>
                  </Col>
                  <Row>
                    <Col lg={true}>
                      <p>{cart.addedCasing.fullName}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={true}>
                      <p>
                        Price:
                        {lang.currencyPrice(
                          cart.addedCasing.priceEUR,
                          cart.addedCasing.priceSEK,
                          cart.addedCasing.priceDKK
                        )}
                        {props.currency()}
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
                className="justify-content-md-start align-items-center border"
              >
                <Col xs lg="2">
                  <Figure className="m-0">
                    <Image
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

                <Col xs lg="1">
                  <p className="m-0">x{items.count}</p>
                </Col>
                <Col xs lg="2">
                  <p className="m-0">
                    Price:
                    {lang.currencyPrice(
                      items.priceEUR,
                      items.priceSEK,
                      items.priceDKK
                    )}
                    {props.currency()}
                  </p>
                </Col>
                <Col xs lg="3">
                  <p className=" m-0 ps-3">
                    Total:
                    {lang.currencyPrice(
                      items.priceEUR,
                      items.priceSEK,
                      items.priceDKK
                    ) * items.count}
                    {props.currency()}
                  </p>
                </Col>
              </Row>
            );
          })}
          {Number(cart.addedAccessories.glass.pcs) > 0 && (
            <Row className="justify-content-md-start align-items-center border">
              <Col xs lg="2">
                <Figure className="m-0">
                  <Image
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
                <p>{cart.addedAccessories.glass.length.option}mm/200mm/6mm</p>
              </Col>

              <Col xs lg="1">
                <p className="m-0">x{cart.addedAccessories.glass.pcs}</p>
              </Col>
              <Col xs lg="2">
                <p className="m-0">
                  Price:
                  {lang.currencyPrice(
                    cart.addedAccessories.glass.priceEUR,
                    cart.addedAccessories.glass.priceSEK,
                    cart.addedAccessories.glass.priceDKK
                  )}
                  {props.currency()}
                </p>
              </Col>
              <Col xs lg="3">
                <p className="m-0 ps-2">
                  Total:
                  {lang.currencyPrice(
                    cart.addedAccessories.glass.priceEUR,
                    cart.addedAccessories.glass.priceSEK,
                    cart.addedAccessories.glass.priceDKK
                  ) * cart.addedAccessories.glass.pcs}
                  {props.currency()}
                </p>
              </Col>
            </Row>
          )}

          {Number(cart.addedAccessories.glass.split_glass.pcs) > 0 && (
            <Row className="justify-content-md-start align-items-center border">
              <Col xs lg="2">
                <Figure className="m-0">
                  <Image
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

              <Col xs lg="1">
                <p className="m-0">
                  x{cart.addedAccessories.glass.split_glass.pcs}
                </p>
              </Col>
              <Col xs lg="2">
                <p className="m-0">
                  Price:
                  {lang.currencyPrice(
                    cart.addedAccessories.glass.split_glass.priceEUR,
                    cart.addedAccessories.glass.split_glass.priceSEK,
                    cart.addedAccessories.glass.split_glass.priceDKK
                  )}
                  {props.currency()}
                </p>
              </Col>
              <Col xs lg="3">
                <p className="m-0 ps-2">
                  Total:
                  {lang.currencyPrice(
                    cart.addedAccessories.glass.split_glass.priceEUR,
                    cart.addedAccessories.glass.split_glass.priceSEK,
                    cart.addedAccessories.glass.split_glass.priceDKK
                  ) * cart.addedAccessories.glass.split_glass.pcs}
                  {props.currency()}
                </p>
              </Col>
            </Row>
          )}

          {Number(cart.addedAccessories.glass.short.short_pcs) > 0 && (
            <Row className="justify-content-md-start align-items-center border">
              <Col xs lg="2">
                <Figure className="m-0">
                  <Image
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
                  {cart.addedAccessories.glass.short.short_length}mm/200mm/6mm
                </p>
              </Col>

              <Col xs lg="1">
                <p className="m-0">
                  x{cart.addedAccessories.glass.short.short_pcs}
                </p>
              </Col>
              <Col xs lg="2">
                <p className="m-0">
                  Price:
                  {lang.currencyPrice(
                    cart.addedAccessories.glass.short.priceEUR,
                    cart.addedAccessories.glass.short.priceSEK,
                    cart.addedAccessories.glass.short.priceDKK
                  )}
                  {props.currency()}
                </p>
              </Col>
              <Col xs lg="3">
                <p className="m-0 ps-2">
                  Total:
                  {lang.currencyPrice(
                    cart.addedAccessories.glass.short.priceEUR,
                    cart.addedAccessories.glass.short.priceSEK,
                    cart.addedAccessories.glass.short.priceDKK
                  ) * cart.addedAccessories.glass.short.short_pcs}
                  {props.currency()}
                </p>
              </Col>
            </Row>
          )}
          {Number(cart.addedAccessories.holders.pcs) > 0 && (
            <Row className="justify-content-md-start align-items-center border">
              <Col xs lg="2">
                <Figure className="m-0">
                  <Image
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

              <Col xs lg="1">
                <p className="m-0">x{cart.addedAccessories.holders.pcs}</p>
              </Col>
              <Col xs lg="2">
                <p className="m-0">
                  Price:
                  {lang.currencyPrice(
                    cart.addedAccessories.holders.priceEUR,
                    cart.addedAccessories.holders.priceSEK,
                    cart.addedAccessories.holders.priceDKK
                  )}
                  {props.currency()}
                </p>
              </Col>
              <Col xs lg="3">
                <p className="m-0 ps-2">
                  Total:
                  {lang.currencyPrice(
                    cart.addedAccessories.holders.priceEUR,
                    cart.addedAccessories.holders.priceSEK,
                    cart.addedAccessories.holders.priceDKK
                  ) * cart.addedAccessories.holders.pcs}
                  {props.currency()}
                </p>
              </Col>
            </Row>
          )}

          {cart.addedCasing.length.length === 0 &&
          cart.addedFireplace.length.length === 0 &&
          cart.addedDecorations.length === 0 ? (
            <h1>
              Nothing added. Maybe You sholud add some of our beautiful
              fireplace?
            </h1>
          ) : (
            <Col>
              <h1 className="mt-4">
                Total Price:{cart.cartPrice}
                {props.currency()}
              </h1>
              <p>All prices includes 25% VAT</p>
            </Col>
          )}
          {showContactForm && (
            <ContactForm className="text-white" cartHandler={cart} />
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={() => props.onClear()}>
          Clear Cart
        </Button>
        <Button onClick={() => setShowContactForm(true)}>
          Send This To Us
        </Button>
        <Button variant="primary" onClick={() => closeModal()}>
          Close
        </Button>
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

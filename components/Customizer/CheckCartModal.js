import { useContext, useState } from "react";
import { LanguageContext } from "../context/language-context";
import { Modal, Row, Col, Button, Figure } from "react-bootstrap";
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
                  <Figure className="m-0">
                    <Figure.Image
                      className="figure-round"
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
                        Price:
                        {lang.currencyPrice(
                          cart.addedFireplace.priceEUR,
                          cart.addedFireplace.priceSEK,
                          cart.addedFireplace.priceDKK
                        )}
                        {props.currency()}
                      </p>
                    </Col>
                  </Row>
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
                          {cart.addedTop.name}
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
              </Col>
            )}
            {cart.addedCasing.length && (
              <Col className="border">
                <h2>Casing</h2>
                <Row>
                  <Figure className="m-0">
                    <Figure.Image
                      className="figure-round"
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
              <Row key={items.id} className="justify-content-md-start border">
                <Col xs lg="3">
                  <Figure className="m-0">
                    <Figure.Image
                      className="figure-round "
                      width={100}
                      height={100}
                      alt="Fireplace decoration"
                      src={items.image} //"https://designfires.pl/wp-content/uploads/2022/06/transparentglass-100x100.jpeg" //{item.image}
                    />
                  </Figure>
                </Col>
                <Col xs lg="4">
                  <p className="pt-5">{items.name}</p>
                </Col>

                <Col xs lg="1">
                  <p className="pt-5">x{items.count}</p>
                </Col>
                <Col xs lg="1">
                  <p className="pt-5">
                    Price:
                    {lang.currencyPrice(
                      items.priceEUR,
                      items.priceSEK,
                      items.priceDKK
                    )}
                    {props.currency()}
                  </p>
                </Col>
              </Row>
            );
          })}
          {Number(cart.addedAccessories.glass.pcs) > 0 && (
            <Row className="justify-content-md-start border">
              <Col xs lg="4">
                <p className="pt-5">
                  Glass 6 mm Length:{cart.addedAccessories.glass.length}mm{" "}
                  {cart.addedAccessories.glass.color}
                </p>
              </Col>

              <Col xs lg="1">
                <p className="pt-5">x{cart.addedAccessories.glass.pcs}</p>
              </Col>
              <Col xs lg="1">
                <p className="pt-5">
                  Price:
                  {lang.currencyPrice(
                    cart.addedAccessories.glass.priceEUR,
                    cart.addedAccessories.glass.priceSEK,
                    cart.addedAccessories.glass.priceDKK
                  )}
                  {props.currency()}
                </p>
              </Col>
            </Row>
          )}
          {Number(cart.addedAccessories.holders.pcs) > 0 && (
            <Row className="justify-content-md-start border">
              <Col xs lg="3">
                <Figure className="m-0">
                  <Figure.Image
                    className="figure-round "
                    width={100}
                    height={100}
                    alt="Fireplace decoration"
                    src={cart.addedAccessories.holders.image} //"https://designfires.pl/wp-content/uploads/2022/06/transparentglass-100x100.jpeg" //{item.image}
                  />
                </Figure>
              </Col>
              <Col xs lg="4">
                <p className="pt-5">Glass Holders x2 pcs </p>
              </Col>

              <Col xs lg="1">
                <p className="pt-5">x{cart.addedAccessories.holders.pcs}</p>
              </Col>
              <Col xs lg="1">
                <p className="pt-5">
                  Price:
                  {lang.currencyPrice(
                    cart.addedAccessories.holders.priceEUR,
                    cart.addedAccessories.holders.priceSEK,
                    cart.addedAccessories.holders.priceDKK
                  )}
                  {props.currency()}
                </p>
              </Col>
            </Row>
          )}
          <Col></Col>
          {cart.addedCasing.length.length === 0 &&
          cart.addedFireplace.length.length === 0 &&
          cart.addedDecorations.length === 0 ? (
            <h1>
              Nothing added. Maybe You sholud add some of our beautiful
              fireplace?
            </h1>
          ) : (
            <h1 className="mt-4">
              Total Price:{cart.cartPrice}
              {props.currency()}
            </h1>
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

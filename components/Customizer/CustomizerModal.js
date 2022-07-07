import { Modal, Button } from "react-bootstrap";
const CustomizerModal = (props) => {
  const { cart } = props;
  <Modal centered show={true} onHide={props.onHide}>
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
            <Col md={{ span: 3, offset: 4 }}>{cart.addedFilling.price}</Col>
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
  </Modal>;
};
export default CustomizerModal;

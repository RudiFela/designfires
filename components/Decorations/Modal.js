import { useState } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
const MyVerticallyCenteredModal = (props) => {
  const [isLoading, setIsLoading] = useState(true);

  const onComplete = () => {
    isLoading ? console.log("true") : console.log("false");
    setIsLoading(false);
  };
  const onHide = () => {
    setIsLoading(true);
    props.closeModal();
  };
  return (
    <Modal
      {...props}
      onHide={onHide}
      variant="dark"
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header
        className="bg-primary"
        closeButton
        closeVariant="white"
      ></Modal.Header>
      <Modal.Body className="bg-primary">
        {isLoading && (
          <div className="text-center">
            <Spinner animation="border" variant="secondary" />
          </div>
        )}
        <img
          style={{ display: !isLoading ? "block" : "none" }}
          className="mw-100"
          onLoad={onComplete}
          src={props.image}
        />
      </Modal.Body>
    </Modal>
  );
};
export default MyVerticallyCenteredModal;

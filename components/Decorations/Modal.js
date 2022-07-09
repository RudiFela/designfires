import { useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
const MyVerticallyCenteredModal = (props) => {
  const [isLoading, setIsLoading] = useState(true);

  const onComplete = () => {
    isLoading ? console.log("true") : console.log("false");
    setIsLoading(false);
  };
  const onHide = () => {
    props.closeModal();
    setIsLoading(true);
  };
  return (
    <Modal
      {...props}
      onHide={onHide}
      variant="dark"
      size="xl"
      centered
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
      {props.Footer ? (
        <Modal.Footer className="bg-primary text-white">
          {props.Footer}
        </Modal.Footer>
      ) : null}
    </Modal>
  );
};
export default MyVerticallyCenteredModal;

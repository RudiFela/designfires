import { useState } from "react";
import Image from "next/image";
import { Modal, Spinner } from "react-bootstrap";
const MyVerticallyCenteredModal = (props) => {
  const [isLoading, setIsLoading] = useState(true);

  const onComplete = () => {
    //isLoading ? console.log("true") : console.log("false");
    setIsLoading(false);
  };
  const onHide = () => {
    props.closemodal();
    setIsLoading(true);
  };
  return (
    <Modal
      {...props}
      onHide={onHide}
      variant="dark"
      size="lg"
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

        <Image
          className="figure-round figure-img img-fluid"
          width={2400}
          height={1600}
          onLoadingComplete={onComplete}
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
/*<Image
          className="figure-round figure-img img-fluid"
          width={400}
          height={300}
          onLoad={onComplete}
          src={props.image}
          alt="Fireplace Image"
        />*/

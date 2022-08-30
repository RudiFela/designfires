import { useState } from "react";
import Image from "next/image";
import { Modal, Spinner, Container } from "react-bootstrap";
const MyVerticallyCenteredModal = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const { ...others } = props;
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
      {...others}
      onHide={onHide}
      dialogClassName="rounded-45"
      variant="dark"
      size="xl"
      centered
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header
        className="bg-primary pb-2"
        closeButton
        closeVariant="white"
      >
        <div className="text-white">
          <h5>{props.Header}</h5>
        </div>
      </Modal.Header>
      <Modal.Body className="bg-primary ">
        {" "}
        <Container>
          {props.image ? (
            <>
              {isLoading && (
                <div className="text-center">
                  <Spinner animation="border" variant="secondary" />
                </div>
              )}

              <Image
                // className="figure-round figure-img img-fluid"
                width={1200}
                height={800}
                //layout="fill"
                objectFit="contain"
                onLoadingComplete={onComplete}
                src={props.image}
                alt="Modal Image"
              />
            </>
          ) : (
            <Container>{props.children}</Container>
          )}
        </Container>
      </Modal.Body>
      {props.Footer ? (
        <Modal.Footer className="bg-primary text-white">
          <div className="text-center">{props.Footer}</div>
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

import { useState } from "react";

import Carousel, { CarouselItem } from "../Carousel/Carousel";
import PhotoCard from "../PhotoCard/PhotoCard";
import { Container, Row, Col, Modal, Button, Spinner } from "react-bootstrap";
import AwesomeSlider from "react-awesome-slider";
import Decorations from "../Decorations/Decorations";
import "react-awesome-slider/dist/styles.css";

const MyVerticallyCenteredModal = (props) => {
  return (
    <Modal
      {...props}
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
        <img className="mw-100" src={props.image} />
      </Modal.Body>
    </Modal>
  );
};

const Inspired = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalPhoto, setModalPhoto] = useState();

  const photo =
    "http://designfires.pl/wp-content/uploads/2022/06/IMG_5312-scaled.jpg";
  const photo2 =
    "http://designfires.pl/wp-content/uploads/2022/06/IMG_5031-scaled.jpg";
  const photo3 =
    "http://designfires.pl/wp-content/uploads/2022/06/IMG_4803-scaled.jpg";
  const photo4 =
    "http://designfires.pl/wp-content/uploads/2022/06/IMG_4767-1-scaled.jpg";
  const photo5 =
    "http://designfires.pl/wp-content/uploads/2022/06/IMG_4722-scaled.jpg";
  const photo6 =
    "http://designfires.pl/wp-content/uploads/2022/06/IMG_5182-scaled.jpg";
  const photo7 =
    "http://designfires.pl/wp-content/uploads/2022/06/Mystic-SteamFire-DFM1200-scaled.jpg";

  const showModalHandler = (image) => {
    setModalPhoto(image);
    setShowModal(true);
  };

  return (
    <div id="projects">
      <h1 className="text-center text-white m-5">
        Get Inspired by Our customers projects
      </h1>
      <Container className="inspired">
        <Row className="mb-4">
          <Col>
            <div className="mh-50 mw-50">
              <img
                src={photo5}
                className="mw-100"
                onClick={() => showModalHandler(photo5)}
              />
            </div>
          </Col>
          <Col>
            <img
              src={photo2}
              className="mw-100"
              onClick={() => showModalHandler(photo2)}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <img
              src={photo}
              className="mw-100"
              onClick={() => showModalHandler(photo)}
            />
          </Col>
          <Col>
            <img
              src={photo4}
              className="mw-100"
              onClick={() => showModalHandler(photo4)}
            />
          </Col>
        </Row>
      </Container>

      <MyVerticallyCenteredModal
        image={modalPhoto}
        show={showModal}
        onHide={() => setShowModal(false)}
      />
    </div>
  );
};
export default Inspired;

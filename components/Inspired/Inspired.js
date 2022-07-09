import { useState, useEffect } from "react";

import Carousel, { CarouselItem } from "../Carousel/Carousel";
import PhotoCard from "../PhotoCard/PhotoCard";
import { Container, Row, Col, Modal, Button, Spinner } from "react-bootstrap";
import AwesomeSlider from "react-awesome-slider";
import Decorations from "../Decorations/Decorations";
import MyVerticallyCenteredModal from "../Decorations/Modal";
import "react-awesome-slider/dist/styles.css";
import axios from "axios";

/*const MyVerticallyCenteredModal = (props) => {
  return (
    <Modal
      {...props}
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
        <img
          className="mw-100"
          src={props.pickedPost ? props.pickedPost.acf.image.url : null}
        />
      </Modal.Body>
      <Modal.Footer className="bg-primary text-white">
        {props.pickedPost ? (
          <>
            <h3>{props.pickedPost.acf.fireplace_name}</h3>
            <h3>{props.pickedPost.acf.casing_name}</h3>
            <h3>{props.pickedPost.acf.decorations}</h3>
          </>
        ) : null}
      </Modal.Footer>
    </Modal>
  );
};*/
//<h1>{props.pickedPost.title.rendered}</h1>
const Inspired = () => {
  const [showModal, setShowModal] = useState(false);
  const [inspiredContent, setInspiredContent] = useState([]);
  const [pickedPost, setPickedPost] = useState();
  useEffect(() => {
    axios
      .get("https://designfires.pl/wp-json/wp/v2/inspirations")
      .then(function (response) {
        // handle success
        console.log(response.data);
        setInspiredContent(response.data);
      });
  }, []);
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
  const Footer = pickedPost ? (
    <>
      <h3>{pickedPost.acf.fireplace_name}</h3>
      <h3>{pickedPost.acf.casing_name}</h3>
      <h3>{pickedPost.acf.decorations}</h3>
    </>
  ) : null;
  const showModalHandler = (item) => {
    // setModalPhoto(image);
    setPickedPost(item);
    setShowModal(true);
  };
  const ins = inspiredContent.map((item) => {
    return (
      <Col className="p-2" sm={6} key={item.id}>
        <img
          src={item.acf.image.sizes.medium_large}
          className="mw-100"
          onClick={() => showModalHandler(item)}
        />
      </Col>
    );
  });
  return (
    <div id="projects">
      <h1 className="text-center text-white m-5">
        Get Inspired by Our customers projects
      </h1>
      <Container className="inspired">
        <Row className="mb-1">{ins}</Row>
      </Container>

      <MyVerticallyCenteredModal
        image={pickedPost ? pickedPost.acf.image.url : null}
        show={showModal}
        pickedPost={pickedPost}
        onHide={() => setShowModal(false)}
        closeModal={() => setShowModal(false)}
        Footer={Footer}
      />
    </div>
  );
};
export default Inspired;

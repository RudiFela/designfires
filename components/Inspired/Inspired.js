import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import MyVerticallyCenteredModal from "../Decorations/Modal";
import "react-awesome-slider/dist/styles.css";
import axios from "axios";

const Inspired = () => {
  const [showModal, setShowModal] = useState(false);
  const [inspiredContent, setInspiredContent] = useState([]);
  const [pickedPost, setPickedPost] = useState();
  useEffect(() => {
    axios
      .get("https://designfires.pl/wp-json/wp/v2/inspirations")
      .then(function (response) {
        setInspiredContent(response.data);
      });
  }, []);
  const Footer = pickedPost ? (
    <>
      <h3>{pickedPost.acf.fireplace_name}</h3>
      <h3>{pickedPost.acf.casing_name}</h3>
      <h3>{pickedPost.acf.decorations}</h3>
    </>
  ) : null;
  const showModalHandler = (item) => {
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
        closemodal={() => setShowModal(false)}
        Footer={Footer}
      />
    </div>
  );
};
export default Inspired;

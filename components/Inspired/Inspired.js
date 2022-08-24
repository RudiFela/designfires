import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Image from "next/image";
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
      <h5>{pickedPost.acf.fireplace_name}</h5>
      <h5>{pickedPost.acf.casing_name}</h5>
      <h5>{pickedPost.acf.decorations}</h5>
    </>
  ) : null;
  const showModalHandler = (item) => {
    setPickedPost(item);
    setShowModal(true);
  };
  const ins = inspiredContent.map((item) => {
    return (
      <Col className="p-2" sm={6} key={item.id}>
        <div className="rel">
          <Image
            src={item.acf.image.sizes.medium_large}
            className="mw-100"
            onClick={() => showModalHandler(item)}
            height={410}
            width={550}
            alt="inspiration picture of fireplaces"
          />
          <div className="overlay text-white mb-1">{item.acf.place_name}</div>
        </div>{" "}
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
        Header={pickedPost ? pickedPost.acf.place_name : null}
        image={pickedPost ? pickedPost.acf.image.url : null}
        show={showModal}
        pickedPost={pickedPost}
        onHide={() => setShowModal(false)}
        closemodal={() => setShowModal(false)}
        Footer={Footer}
        imagewidth={400}
        imageheight={400}
      />
    </div>
  );
};
export default Inspired;

import PhotoCard from "../PhotoCard/PhotoCard";
import { useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import Image from "next/image";

import MyVerticallyCenteredModal from "./Modal";

const Decorations = (props) => {
  //const [showModal, setShowModal] = useState(false);
  // const [modalPhoto, setModalPhoto] = useState();

  /* const showModalHandler = (image) => {
    setModalPhoto(image);
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };*/
  let a = props.decorations;
  let arrays = [],
    size = 3;

  for (let i = 0; i < a.length; i += size) arrays.push(a.slice(i, i + size));

  const help = (array) => {
    const ar = array.map((item) => (
      <Col
        key={item.id}
        className="flex-shrink-1"
        //onClick={() => showModalHandler(item.images[0].src)}
      >
        <div className="deco">
          <div className="rel">
            <PhotoCard
              image={item.images[0].shop_catalog}
              imagebig={item.images[0].src}
              // click={() => showModalHandler(item.images[0].src)}
            />
            <div className="overlay text-white">{item.name}</div>
          </div>
        </div>
      </Col>
    ));

    return ar;
  };
  const showdeco = arrays.map((array) => help(array));

  return (
    <Container className="text-white">
      <h1 className="text-center text-white">
        And add some individual style with decorations!
      </h1>
      <Row xs={2} md={3} lg={4}>
        {showdeco}
      </Row>{" "}
    </Container>
  );
};
export default Decorations;

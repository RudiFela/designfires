import PhotoCard from "../PhotoCard/PhotoCard";
import { useEffect, useState } from "react";
import { Row, Col, Container, Modal, Spinner } from "react-bootstrap";
import Image from "next/image";
import { FiHelpCircle } from "react-icons/fi";

import MyVerticallyCenteredModal from "./Modal";

const Decorations = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [modalPhoto, setModalPhoto] = useState();

  const showModalHandler = (image) => {
    setModalPhoto(image);
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };
  let a = props.decorations;
  let arrays = [],
    size = 3;

  for (let i = 0; i < a.length; i += size) arrays.push(a.slice(i, i + size));

  const help = (array) => {
    const ar = array.map((item) => (
      <Col
        key={item.id}
        className="flex-shrink-1"
        onClick={() => showModalHandler(item.images[0].src)}
      >
        <div className="deco">
          <div className="rel">
            <PhotoCard image={item.images[0].shop_catalog} />
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
      <MyVerticallyCenteredModal
        image={modalPhoto}
        show={showModal}
        closeModal={() => closeModal()}
      />
    </Container>
  );
};
export default Decorations;
/*<Row>
        <Col>
          <div className="rel">
            <PhotoCard image="http://designfires.pl/wp-content/uploads/2022/06/deco12.png" />
            <div className="overlay text-white">Glass Ceramic Crystals</div>
          </div>
        </Col>
        <Col>
          <div className="rel">
            <PhotoCard image="http://designfires.pl/wp-content/uploads/2022/06/deco14.png" />
            <div className="overlay text-white">Glowing Fiber</div>
          </div>
        </Col>
        <Col>
          <div className="rel">
            <PhotoCard image="http://designfires.pl/wp-content/uploads/2022/06/deco7.png" />
            <div className="overlay text-white">Ceramic Charcoal Pieces</div>
          </div>
        </Col>
        <Col>
          <div className="rel">
            <PhotoCard image="http://designfires.pl/wp-content/uploads/2022/06/deco8.png" />
            <div className="overlay text-white">Stone Bark Pebbles</div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="rel">
            <PhotoCard image="http://designfires.pl/wp-content/uploads/2022/06/deco4.png" />
            <div className="overlay text-white">Black Ceramic Crystals</div>
          </div>
        </Col>
        <Col>
          <Col>
            <div className="rel">
              <PhotoCard image="http://designfires.pl/wp-content/uploads/2022/06/deco9.png" />
              <div className="overlay text-white">Ceramic Birch Pieces</div>
            </div>
          </Col>
        </Col>
        <Col>
          <div className="rel">
            <PhotoCard image="http://designfires.pl/wp-content/uploads/2022/06/deco11.png" />
            <div className="overlay text-white">Ash Ceramic Flakes Grey</div>
          </div>
        </Col>
        <Col>
          <div className="rel">
            <PhotoCard image="http://designfires.pl/wp-content/uploads/2022/06/deco1.png" />
            <div className="overlay text-white">Black Ceramic Wood</div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="rel">
            <PhotoCard image="http://designfires.pl/wp-content/uploads/2022/06/deco3.png" />
            <div className="overlay text-white">Ceramic Splinters</div>
          </div>
        </Col>
        <Col>
          <div className="rel">
            <PhotoCard image="http://designfires.pl/wp-content/uploads/2022/06/deco10.png" />
            <div className="overlay text-white">Ash Ceramic Flakes Black</div>
          </div>
        </Col>
        <Col>
          <div className="rel">
            <PhotoCard image="http://designfires.pl/wp-content/uploads/2022/06/deco2.png" />
            <div className="overlay text-white">Black Ceramic Wood Set 3</div>
          </div>
        </Col>
        <Col>
          <div className="rel">
            <PhotoCard image="http://designfires.pl/wp-content/uploads/2022/06/deco13.png" />
            <div className="overlay text-white">White Decorative Stones</div>
          </div>
        </Col>
      </Row>*/

import { useState } from "react";
import Image from "next/image";
import { Row, Col } from "react-bootstrap";
import MyVerticallyCenteredModal from "../Decorations/Modal";
const PhotoCard = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [modalPhoto, setModalPhoto] = useState();
  //return <div className="photo-card">{props.children}</div>;
  const showModalHandler = (image) => {
    setModalPhoto(image);
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <div className="photo">
      <Image
        onClick={() => showModalHandler(props.imagebig)}
        //className="photo-image"
        alt="photocard-picture"
        src={props.image}
        layout="fill"
        objectFit="cover"
        //height={800} //{props.imageheight}
        //width={500} //{props.imagewidth}
        //layout="responsive"
        //sizes="(min-width:767px)33vw,100vw"
        //objectFit="contain"
      />{" "}
      <MyVerticallyCenteredModal
        image={modalPhoto}
        show={showModal}
        closemodal={() => closeModal()}
        imagewidth={props.imagewidth}
        imageheight={props.imageheight}
      />
    </div>
  );
};
export default PhotoCard;
// <img src={props.image} />

import { useState } from "react";
import { Ratio } from "react-bootstrap";
import Image from "next/image";
import MyVerticallyCenteredModal from "../Decorations/Modal";
const PhotoCard = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [modalPhoto, setModalPhoto] = useState();
  const showModalHandler = (image) => {
    setModalPhoto(image);
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <div className="photo-wrapper">
      <Ratio aspectRatio={"4x3"}>
        <Image
          className="borderr"
          onClick={() => showModalHandler(props.imagebig)}
          src={props.image}
          // width="100%"
          // height="100%"
          alt="photocard-picture"
          layout="fill"
          //objectFit="cover"
        />
      </Ratio>

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
/*
<div className="photo">
      <Image
        onClick={() => showModalHandler(props.imagebig)}
        //className="photo-image"
        alt="photocard-picture"
        src={props.image}
        layout="fill"
        objectFit="cover"
        className=""
        //height={800} //{props.imageheight}
        //width={500} //{props.imagewidth}
        //layout="responsive"
        //sizes="(min-width:767px)33vw,100vw"
        //objectFit="contain"
      />{" "}
      */

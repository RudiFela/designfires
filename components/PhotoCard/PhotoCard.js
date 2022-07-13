import { useState } from "react";
import Image from "next/image";
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
        //objectFit="cover"
        //layout="responsive"
        height={160}
        width={291}
      />
      <MyVerticallyCenteredModal
        image={modalPhoto}
        show={showModal}
        closemodal={() => closeModal()}
      />
    </div>
  );
};
export default PhotoCard;
// <img src={props.image} />

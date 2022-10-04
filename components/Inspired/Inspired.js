import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ImageGallery from "react-image-gallery";

import Image from "next/image";
import MyVerticallyCenteredModal from "../Decorations/Modal";

import axios from "axios";
import Slider from "../UI/Slider/Slider";
import MotionSlider from "../UI/Slider/MotionSlider";

const Inspired = () => {
  const [showModal, setShowModal] = useState(false);
  const [inspiredContent, setInspiredContent] = useState([]);
  const [pickedPost, setPickedPost] = useState();
  const [postGallery, setPostGallery] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axios
      .get("https://designfires.pl/wp-json/wp/v2/inspirations")
      .then(function (response) {
        setInspiredContent(response.data);
        setIsLoading(false);
      });
  }, []);

  const prepareGalleryImages = (postPhotos, postVideo, mainPhoto) => {
    let photosArray = [];
    if (postVideo) {
      const prepareVideoForGallery = () => {
        return (
          //this.state.showVideo[item.embedUrl] ?
          <div className="gallery-video-wrapper">
            <a
              className="close-video"
              // onClick={this._toggleShowVideo.bind(this, item.embedUrl)}
            ></a>
            <iframe
              width="100%"
              height="100%"
              src={postVideo} //"https://designfires.pl/wp-content/uploads/2022/07/GlowFibers.mp4"
              frameBorder="0"
              allow="autoplay"
              //allowFullScreen
            ></iframe>
          </div>
        );
      };
      photosArray.push({
        embedUrl: postVideo,
        original: mainPhoto,
        thumbnail: mainPhoto,
        renderItem: prepareVideoForGallery,
      });
    }
    postPhotos.forEach((item) => {
      photosArray.push({
        original: item.full_image_url,
        thumbnail: item.thumbnail_image_url,
      });
    });
    setPostGallery(photosArray);
  };
  const Footer = pickedPost ? (
    <>
      <h5>{pickedPost.acf.fireplace_name}</h5>
      <h5>{pickedPost.acf.casing_name}</h5>
      <h5>{pickedPost.acf.decorations}</h5>
    </>
  ) : null;
  const showModalHandler = (item) => {
    setPickedPost(item);
    prepareGalleryImages(
      item.acf.photo_gallery,
      item.acf.video,
      item.acf.image.sizes.medium_large
    );
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
          <div className="overlay text-center text-white mb-1">
            {item.acf.place_name}
          </div>
        </div>{" "}
      </Col>
    );
  });
  const containerStyles = {
    width: "100%",
    height: "35vw",
    margin: "0px auto",
  };
  return (
    <div id="projects">
      {" "}
      <h1 className="text-center text-white m-5">
        Get Inspired by Our customers projects
      </h1>{" "}
      <Container className="my-5">
        <div className="mx-2" style={containerStyles}>
          {!isLoading && (
            <Slider onPick={showModalHandler} slides={inspiredContent} />
          )}{" "}
        </div>
      </Container>
      <MyVerticallyCenteredModal
        Header={pickedPost ? pickedPost.acf.place_name : null}
        //image={pickedPost ? pickedPost.acf.image.url : null}
        show={showModal}
        pickedPost={pickedPost}
        onHide={() => setShowModal(false)}
        closemodal={() => setShowModal(false)}
        Footer={Footer}
        imagewidth={400}
        imageheight={400}
      >
        <ImageGallery
          items={postGallery}
          thumbnailPosition="left"
          showPlayButton={false}
        />
      </MyVerticallyCenteredModal>
    </div>
  );
};
export default Inspired;
/* <Container className="inspired">
        {" "}
        <Row className="mb-1">{ins}</Row>
      </Container>*/

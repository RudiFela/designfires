import PhotoCard from "../PhotoCard/PhotoCard";
import HoverVideoPlayer from "react-hover-video-player";
import { Row, Col, Container } from "react-bootstrap";
import Image from "next/image";
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
  const test = props.decorations.map((item) => (
    <Col
      key={item.id}
      className=""
      //onClick={() => showModalHandler(item.images[0].src)}
    >
      {item.acf.movie_of_decoration_product === false ? (
        <div className="deco m-1">
          <div className="rel">
            <Image
              src={item.images[0].woocommerce_single}
              alt=""
              // Make the image expand to cover the video's dimensions

              width="300px"
              height="168px"
              style={{ borderRadius: "25px" }}
            />

            <div className="overlay text-white mb-1 pb-2">{item.name}</div>
          </div>
        </div>
      ) : (
        <div className="m-1" style={{ width: "300px", heigth: "200px" }}>
          <HoverVideoPlayer
            videoSrc={item.acf.movie_of_decoration_product}
            style={{ borderRadius: "25px", heigth: "200px" }}
            // We should display an image over the video while it is paused
            videoStyle={{
              borderRadius: "25px",
              objectFit: "cover",
              heigth: "198px",
            }}
            pausedOverlay={
              <>
                {" "}
                <Image
                  src={item.images[0].woocommerce_single}
                  alt=""
                  layout="fill"
                  style={{
                    // Make the image expand to cover the video's dimensions
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "25px",
                  }}
                />{" "}
                <div className="overlay text-white">{item.name}</div>
              </>
            }
          />
        </div>
      )}
    </Col>
  ));
  /*  <PhotoCard
              image={item.images[0].woocommerce_single}
              imagebig={item.images[0].src}
              imagewidth={600}
              imageheight={400}
              // click={() => showModalHandler(item.images[0].src)}
            />
            
            
            
            
            let a = props.decorations;
  let arrays = [],
    size = 3;

  for (let i = 0; i < a.length; i += size) arrays.push(a.slice(i, i + size));

  const help = (array) => {
    const ar = array.map((item) => (
      <Col
        key={item.id}
        className=""
        //onClick={() => showModalHandler(item.images[0].src)}
      >
        <div className="deco">
          <div className="rel">
            <PhotoCard
              image={item.images[0].woocommerce_single}
              imagebig={item.images[0].src}
              imagewidth={600}
              imageheight={400}
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
*/
  const vid =
    //"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
    "https://designfires.pl/wp-content/uploads/2022/07/GreyFlakes.mp4";
  //"https://youtu.be/Lqh99Re13ow";
  return (
    <Container className="text-white">
      <h1 className="text-center text-white">
        Add some individual style with Our HAND MADE decorations!
      </h1>
      <Row xs={2} md={2} lg={3} xxl={4}>
        {test}
      </Row>{" "}
    </Container>
  );
};
export default Decorations;

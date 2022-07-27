import PhotoCard from "../PhotoCard/PhotoCard";
import { Row, Col, Container } from "react-bootstrap";
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
  /* let a = props.decorations;
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
  return (
    <Container className="text-white">
      <h1 className="text-center text-white">
        Add some individual style with Our "HAND MADE" decorations!
      </h1>
      <Row xs={2} md={2} lg={3} xxl={4}>
        {test}
      </Row>{" "}
    </Container>
  );
};
export default Decorations;

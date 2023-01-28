import PhotoCard from "../PhotoCard/PhotoCard";
import HoverVideoPlayer from "react-hover-video-player";
import { Row, Col, Container, Ratio } from "react-bootstrap";
import Image from "next/image";
const Decorations = (props) => {
  const test = props.decorations.map((item) => (
    <Col key={item.id} className="align-self-center">
      {item.acf.movie_of_decoration_product === false ? (
        <div className="m-1">
          <Ratio aspectRatio={"16x9"}>
            <>
              <div className="rel">
                <Image
                  src={item.images[0].woocommerce_single}
                  alt=""
                  style={{ borderRadius: "25px" }}
                  layout="fill"
                  //objectFit="cover"
                />

                <div className="overlay text-white mb-1 pb-2">{item.name}</div>
              </div>
            </>
          </Ratio>
        </div>
      ) : (
        <div className="m-1">
          <HoverVideoPlayer
            videoSrc={item.acf.movie_of_decoration_product}
            videoStyle={{
              borderRadius: "25px",
              objectFit: "cover",
              heigth: "200px",
            }}
            pausedOverlay={
              <>
                <Ratio aspectRatio={"16x9"}>
                  <Image
                    src={item.images[0].woocommerce_single}
                    alt=""
                    layout="fill"
                    style={{
                      // width: "100%",
                      // height: "100%",
                      // objectFit: "cover",
                      borderRadius: "25px",
                    }}
                  />
                </Ratio>
                <div className="overlay text-white">{item.name}</div>
              </>
            }
          />
        </div>
      )}
    </Col>
  ));

  return (
    <>
      <div className="w-100 bg-danger p-3 fst-italic my-4">
        <h1 className="text-center text-white my-4">
          Add some individual style with Our HAND MADE decorations!
        </h1>
      </div>
      <Container className="text-white">
        <Row xs={2} md={2} lg={2} xxl={3}>
          {test}
        </Row>
      </Container>
    </>
  );
};
export default Decorations;

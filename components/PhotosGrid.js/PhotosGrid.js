import PhotoCard from "../PhotoCard/PhotoCard";
import { Row, Col, Container } from "react-bootstrap";
const PhotosGrid = (props) => {
  return (
    <>
      <div className="photo-grid  p-3">
        <Row xs={2}>
          <Col>
            <PhotoCard
              image={props.image1}
              imagebig={props.image1}
              imagewidth={400}
              imageheight={300}
            />
          </Col>
          <Col>
            <PhotoCard
              image={props.image2}
              imagebig={props.image2}
              imagewidth={400}
              imageheight={300}
            />
          </Col>
        </Row>
        <Row xs={2}>
          <Col>
            <PhotoCard
              image={props.image3}
              imagebig={props.image3}
              imagewidth={400}
              imageheight={300}
            />
          </Col>
          <Col>
            <PhotoCard
              image={props.image6}
              imagebig={props.image6}
              imagewidth={400}
              imageheight={300}
            />
          </Col>
        </Row>
        <Row xs={2}>
          <Col>
            <PhotoCard
              image={props.image4}
              imagebig={props.image4}
              imagewidth={400}
              imageheight={300}
            />
          </Col>
          <Col>
            <PhotoCard
              image={props.image5}
              imagebig={props.image5}
              imagewidth={400}
              imageheight={300}
            />
          </Col>
        </Row>
        <Row xs={2}>
          <Col>
            <PhotoCard
              image={props.image7}
              imagebig={props.image7}
              imagewidth={400}
              imageheight={300}
            />
          </Col>
          <Col>
            <PhotoCard
              image={props.image8}
              imagebig={props.image8}
              imagewidth={400}
              imageheight={300}
            />
          </Col>
        </Row>
        <Row xs={2}>
          <Col>
            <PhotoCard
              image={props.image9}
              imagebig={props.image9}
              imagewidth={400}
              imageheight={300}
            />
          </Col>
          <Col>
            <PhotoCard
              image={props.image10}
              imagebig={props.image10}
              imagewidth={400}
              imageheight={300}
            />
          </Col>
        </Row>
      </div>
    </>
  );
};
export default PhotosGrid;
/* <div className="cardbox">
        <div className="photocard-container">
          <PhotoCard image={props.image1} imagebig={props.image1} />
          <PhotoCard image={props.image2} imagebig={props.image2} />
          <PhotoCard image={props.image3} imagebig={props.image3} />
          <PhotoCard image={props.image6} imagebig={props.image6} />
        </div>
        <div className="photocard-container-1">
          <PhotoCard image={props.image4} imagebig={props.image4} />
          <PhotoCard image={props.image5} imagebig={props.image5} />
          <PhotoCard image={props.image6} imagebig={props.image6} />
          <PhotoCard image={props.image6} imagebig={props.image6} />
        </div>
      </div>*/

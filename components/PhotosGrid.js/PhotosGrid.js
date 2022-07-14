import PhotoCard from "../PhotoCard/PhotoCard";
import { Row, Col, Container } from "react-bootstrap";
const PhotosGrid = (props) => {
  return (
    <>
      <Row xs={2} lg={2} className="photo-grid flex-grow-1 p-3">
        <Col>
          <PhotoCard image={props.image1} imagebig={props.image1} />
        </Col>
        <Col>
          <PhotoCard image={props.image2} imagebig={props.image2} />
        </Col>
        <Col>
          <PhotoCard image={props.image3} imagebig={props.image3} />
        </Col>
        <Col>
          <PhotoCard image={props.image6} imagebig={props.image6} />
        </Col>
        <Col>
          <PhotoCard image={props.image4} imagebig={props.image4} />
        </Col>
        <Col>
          <PhotoCard image={props.image5} imagebig={props.image5} />
        </Col>
        <Col>
          <PhotoCard image={props.image6} imagebig={props.image6} />
        </Col>
        <Col>
          <PhotoCard image={props.image6} imagebig={props.image6} />
        </Col>
      </Row>
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

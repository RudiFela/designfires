import AboutSection from "../AboutSection/AboutSection";
import Advantage from "../Advantage/Advantage";
import PhotosGrid from "../PhotosGrid.js/PhotosGrid";
import { Row, Col } from "react-bootstrap";
const Section = () => {
  return (
    <div>
      <Row>
        <Col className="p-0">
          <PhotosGrid />
        </Col>
        <Col className="px-0">
          <AboutSection />
        </Col>
      </Row>
      <div className="item3">
        <Advantage />
      </div>
    </div>
  );
};
export default Section;
/*<div>
      <div className="flex-container">
        <div className="item1">
          <PhotosGrid />
        </div>
        <div className="item2">
          <AboutSection />
        </div>
      </div>
      <div className="item3">
        <Advantage />
      </div>
    </div>*/

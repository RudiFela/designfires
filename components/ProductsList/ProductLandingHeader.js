import { Row, Col } from "react-bootstrap";

const ProductLandingHeader = (props) => {
  return (
    <Row>
      <Col md={6}>{props.productImageSection}</Col>
      <Col xs={2}>{props.productVariantSection} </Col>
      <Col>{props.productGeneralInfoSection}</Col>
    </Row>
  );
};
export default ProductLandingHeader;

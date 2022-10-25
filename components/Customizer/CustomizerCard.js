import { Badge, Card, Button, Ratio } from "react-bootstrap";
import Image from "next/image";
const CustomizerCard = (props) => {
  return (
    <Card className="card-deco my-3 customizer-card">
      {" "}
      <h3 className="text-white text-center mb-3">
        <Badge bg="danger">{props.title}</Badge>
      </h3>
      <div className="">
        <Ratio aspectRatio="4x3">{props.image}</Ratio>
      </div>
      <Card.Body className="pb-0">{props.children}</Card.Body>{" "}
    </Card>
  );
};
export default CustomizerCard;

import { Badge, Card, Button, Ratio } from "react-bootstrap";
import Image from "next/image";
const CustomizerCard = (props) => {
  return (
    <Card className="card-deco my-3 customizer-card">
      {" "}
      <h3 className="text-white text-center mb-3">
        <Badge bg="danger">{props.title}</Badge>
      </h3>
      <Ratio aspectRatio="4x3" className="mb-2">
        {props.image}
      </Ratio>
      <Card.Body style={{ position: "relative" }} className="pb-0">
        {props.children}
      </Card.Body>{" "}
    </Card>
  );
};
export default CustomizerCard;

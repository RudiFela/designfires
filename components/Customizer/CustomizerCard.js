import { Badge, Card, Button, Ratio } from "react-bootstrap";
import Image from "next/image";
const CustomizerCard = (props) => {
  return (
    <Card className="card-deco my-3 opacity-75">
      {" "}
      <h3 className="text-white text-center mb-3">
        <Badge bg="danger">{props.title}</Badge>
      </h3>
      <Ratio aspectRatio="4x3">
        <Image
          className="card-image-bottom"
          style={{
            maxheigth: "50vh",
            borderRadius: 35,
            backgroundColor: "black",
          }}
          alt="photocard-picture"
          src={props.photo}
          //height={400}

          layout="fill" //width={480}
        />
      </Ratio>
      <Card.Body className="pb-0">{props.children}</Card.Body>{" "}
    </Card>
  );
};
export default CustomizerCard;

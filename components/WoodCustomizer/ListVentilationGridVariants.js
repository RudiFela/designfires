import { Col, Row } from "react-bootstrap";
import VentilationGridCard from "./VentilationGridCard";
const ListVentilationGridVariants = (props) => {
  return (
    <Col className="mx-2">
      {props.itemToList.map(
        (variant) =>
          Number(props.grid) <= Number(variant.holesize) &&
          Number(props.grid) + 100 >= Number(variant.holesize) && (
            <Row>
              {" "}
              <VentilationGridCard
                variant={variant}
                name={props.name}
                onPick={props.onPick}
              />
            </Row>
          )
      )}
    </Col>
  );
};
export default ListVentilationGridVariants;

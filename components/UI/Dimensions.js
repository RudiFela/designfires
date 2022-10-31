import { Row, Col, Badge } from "react-bootstrap";
import {
  CgArrowsMergeAltV,
  CgArrowsShrinkH,
  CgArrowsShrinkV,
  CgArrowsExpandRight,
} from "react-icons/cg";
const Dimensions = (props) => {
  return (
    <Row className="fs-5">
      <span>
        Name: <Badge className="float-end text-wrap">{props.name}</Badge>
      </span>

      <span>
        Length:{" "}
        <Badge className="float-end">
          <CgArrowsShrinkH /> <span> </span>
          {props.length}mm{" "}
        </Badge>
      </span>
      <span>
        Height:{" "}
        <Badge className="float-end">
          <CgArrowsShrinkV /> <span> </span>
          {props.height}{" "}
        </Badge>
      </span>
      {props.width ? (
        <span>
          Deep:{" "}
          <Badge className="float-end">
            <CgArrowsExpandRight />
            <span> </span>
            {props.width}{" "}
          </Badge>
        </span>
      ) : null}
      <span>
        Thickness:
        <Badge className="float-end">
          {" "}
          <CgArrowsMergeAltV />
          <span> </span> {props.thickness}
        </Badge>
      </span>
    </Row>
  );
};
export default Dimensions;

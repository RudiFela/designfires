import { Row, Col, Badge } from "react-bootstrap";
import {
  CgArrowsMergeAltV,
  CgArrowsShrinkH,
  CgArrowsShrinkV,
  CgArrowsExpandRight,
} from "react-icons/cg";
const Dimensions = (props) => {
  return (
    <Row className="fs-5 my-1">
      {props.name ? (
        <span>
          Name: <Badge className="float-end text-wrap">{props.name}</Badge>
        </span>
      ) : null}

      {props.length ? (
        <span>
          Length:{" "}
          <Badge
            className="float-end"
            bg={props.variant ? `${props.variant}` : null}
          >
            <CgArrowsShrinkH /> <span> </span>
            {props.length} {props.unity}
          </Badge>
        </span>
      ) : null}
      {props.height ? (
        <span>
          Height:{" "}
          <Badge
            className="float-end"
            bg={props.variant ? `${props.variant}` : null}
          >
            <CgArrowsShrinkV /> <span> </span>
            {props.height} {props.unity}
          </Badge>
        </span>
      ) : null}
      {props.width ? (
        <span>
          Deep:{" "}
          <Badge
            className="float-end"
            bg={props.variant ? `${props.variant}` : null}
          >
            <CgArrowsExpandRight />
            <span> </span>
            {props.width} {props.unity}
          </Badge>
        </span>
      ) : null}
      {props.thickness ? (
        <span>
          Thickness:
          <Badge className="float-end">
            {" "}
            <CgArrowsMergeAltV />
            <span> </span> {props.thickness}
          </Badge>
        </span>
      ) : null}
      {props.children}
    </Row>
  );
};
export default Dimensions;

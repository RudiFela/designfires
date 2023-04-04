import React from "react";
import { BsInfoCircle, BsCheckSquare, BsXSquare } from "react-icons/bs";
import { Badge, Col, Row } from "react-bootstrap";

function Equipment(props) {
  const { item, show } = props;
  return (
    <>
      {show && (
        <Col className="px-3">
          {" "}
          <Row>
            <Badge className="fs-4 my-2" bg="success">
              Equipment
            </Badge>
            <span>
              External air inlet
              <Badge bg="info" className="float-end">
                {" "}
                <span> </span>{" "}
                {item.air_inlet ? <BsCheckSquare /> : <BsXSquare />}
              </Badge>
            </span>
            <span>
              Combustion chamber lining
              <Badge bg="info" className="float-end">
                {" "}
                <span> </span>{" "}
                {item.chamber_lining ? <BsCheckSquare /> : <BsXSquare />}
              </Badge>
            </span>
            <span>
              Ash pan
              <Badge bg="info" className="float-end">
                {" "}
                <span> </span>{" "}
                {item.ash_pan ? <BsCheckSquare /> : <BsXSquare />}
              </Badge>
            </span>
          </Row>
        </Col>
      )}
    </>
  );
}

export default Equipment;

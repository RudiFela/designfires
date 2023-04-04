import React from "react";
import { BsInfoCircle, BsCheckSquare, BsXSquare } from "react-icons/bs";
import { Badge, Col, Row } from "react-bootstrap";
function Certificates(props) {
  const { item, show } = props;
  return (
    <>
      {show && (
        <Col className="px-3">
          <Row>
            <Badge className="fs-4 mb-2" bg="success">
              Certificates / Compliance
            </Badge>
            <span>
              ECODESIGN compliance
              <Badge bg="info" className="float-end">
                {" "}
                <span> </span>{" "}
                {item.ekoprojekt ? <BsCheckSquare /> : <BsXSquare />}
              </Badge>
            </span>
            <span>
              Suitable for recuperation
              <Badge bg="info" className="float-end">
                {" "}
                <span> </span>{" "}
                {item.recuperation ? <BsCheckSquare /> : <BsXSquare />}
              </Badge>
            </span>
            <span>
              BImSchV 2 compliance
              <Badge bg="info" className="float-end">
                {" "}
                <span> </span> {item.blmshv ? <BsCheckSquare /> : <BsXSquare />}
              </Badge>
            </span>
          </Row>
        </Col>
      )}{" "}
    </>
  );
}

export default Certificates;

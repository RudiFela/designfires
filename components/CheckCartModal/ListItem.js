import { Row, Col, Figure, Badge, Ratio } from "react-bootstrap";
import { useEffect } from "react";
import Image from "next/image";
const ListItem = (props) => {
  return (
    <Row className="justify-content-between align-items-center border p-2 fs-4">
      <Col xs="auto">
        <Figure className="m-0">
          <Image
            className="figure-round figure-img img-fluid"
            width={100}
            height={100}
            src={props.image}
            alt="Fireplace decoration"
          />
        </Figure>
      </Col>
      <Col xs lg="3">
        {props.dimensions ? (
          props.children
        ) : (
          <span className="m-0 fs-5">{props.name} </span>
        )}
      </Col>

      <Col xs="auto" className="">
        <Badge bg="info" className="m-0">
          x{props.pcs}
        </Badge>
      </Col>
      <Col xs lg="2" className="">
        Price:
        <Badge className="m-0">
          {props.price} {props.currencySymbol}
        </Badge>
      </Col>
      <Col xs lg="auto" className="">
        <span className="float-end">
          Total:
          <Badge className="m-0 ps-2 ">
            {props.totalPrice} {props.currencySymbol}
          </Badge>
        </span>
      </Col>
    </Row>
  );
};
export default ListItem;
/*
 <Figure className="m-0">
          <Image
            className="figure-round figure-img img-fluid"
            width={100}
            height={100}
            src={props.image}
            alt="Fireplace decoration"
          />
        </Figure>
        */

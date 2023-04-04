import React from "react";
import { Badge } from "react-bootstrap";

function InfoWrapper(props) {
  const { value, text } = props;
  return (
    <>
      {value && (
        <span>
          {text}
          <Badge bg="info" className="float-end">
            <span> </span> {value === "" ? "--" : value}
          </Badge>
        </span>
      )}
    </>
  );
}

export default InfoWrapper;

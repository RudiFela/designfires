import { Popover, Row, Col, Badge } from "react-bootstrap";
const PopoverComponent = (props) => {
  //const popoverInfo = pickedCaseItem.selected ? (

  return (
    <div style={{ minWidth: "200px" }}>
      {props.info
        ? props.info.map((item, index) => {
            return (
              <Row key={index} className="my-1 fs-5 ">
                <Col>
                  <span className="fw-bold">
                    {item.name}

                    <Badge className="fs-5 float-end" bg="secondary">
                      {item.icon}
                      <span> </span>
                      {item.value} mm
                    </Badge>
                  </span>
                </Col>
              </Row>
            );
          })
        : null}

      {props.children}
    </div>
  );
};
export default PopoverComponent;

/*

 <Popover id="popover-basic">
      <Popover.Body>
        <div style={{ minWidth: "200px" }}>
          {props.info
            ? props.info.map((item, index) => {
                return (
                  <Row key={index} className="my-1 fs-5 ">
                    <Col>
                      <span className="fw-bold">
                        {item.name}
                        <Badge className="fs-5 float-end" bg="secondary">
                          {item.value} mm
                        </Badge>
                      </span>
                    </Col>
                  </Row>
                );
              })
            : null}

          {props.children}
        </div>
      </Popover.Body>
    </Popover>

    */

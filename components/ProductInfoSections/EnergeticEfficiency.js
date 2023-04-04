import { Badge, Row, Col } from "react-bootstrap";
const EnergeticEfficiency = (props) => {
  const { item, show } = props;
  return (
    <>
      {show && (
        <Col className="px-3">
          {" "}
          <Row>
            <Badge className="fs-4 mb-2" bg="success">
              Energetic efficiency
            </Badge>
            <span>
              Energy class
              <Badge bg="info" className="float-end">
                {" "}
                <span> </span> {item.energy_class}
              </Badge>
            </span>
            <span>
              Energy efficiency index (EEI)
              <Badge bg="info" className="float-end">
                {" "}
                <span> </span> {item.energy_efficiency_index}
              </Badge>
            </span>
            {item.co_emissions && (
              <span>
                CO emissions (at 13% O 2 ) ≤ given in %
                <Badge bg="info" className="float-end">
                  {" "}
                  <span> </span> {item.co_emissions}
                </Badge>
              </span>
            )}
            {item.dust_emission && (
              <span>
                Dust emission (mg/Nm3)
                <Badge bg="info" className="float-end">
                  {" "}
                  <span> </span> {item.dust_emission}
                </Badge>
              </span>
            )}
          </Row>
        </Col>
      )}
    </>
  );
};
export default EnergeticEfficiency;

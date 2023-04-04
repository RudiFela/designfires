import { Badge, Row, Col } from "react-bootstrap";
import InfoWrapper from "./InfoWrapper";
const GeneralInfo = (props) => {
  const { item, inlet, kw, glazing, outlet } = props;

  return (
    <Col className="px-3">
      <Row className="my-3">
        <Badge className="fs-4 mb-2" bg="success">
          General Information
        </Badge>
        <InfoWrapper value={item.kw} text="Rated output (kW)" />

        <InfoWrapper
          value={item.power_range}
          text=" Heating power range (kW)"
        />

        <InfoWrapper value={item.material} text="Material" />
        <InfoWrapper
          value={item.heating_efficiency}
          text="Heating efficiency (%)"
        />
        <InfoWrapper value={item.fuel_type} text="Fuel type" />
        <InfoWrapper
          value={item.gas_temperature}
          text="Exhaust gas temperature (℃)"
        />
        <InfoWrapper
          value={item.lenght_of_logs}
          text="Max length of logs (cm)"
        />
        {props.ventGrids && (
          <span>
            Min outlet grids active field (cm2)
            <Badge bg="info" className="float-end">
              {" "}
              <span> </span>{" "}
              {item.outlet_grids !== "" ? `≥${item.outlet_grids}` : "≥700"}
            </Badge>
          </span>
        )}
        {props.ventGrids && (
          <span>
            Min inlet grids active field (cm2)
            <Badge bg="info" className="float-end">
              {" "}
              <span> </span>{" "}
              {item.inlet_grids !== "" ? `≥${item.inlet_grids}` : "≥500"}
            </Badge>
          </span>
        )}
        <InfoWrapper value={item.glazing_type} text="Glazing type" />
        <InfoWrapper
          value={item.door_opening_system}
          text="Door opening system"
        />
      </Row>
    </Col>
  );
};
GeneralInfo.defaultProps = {
  inlet: true,
  outlet: true,
  kw: true,
  glazing: true,
};
export default GeneralInfo;

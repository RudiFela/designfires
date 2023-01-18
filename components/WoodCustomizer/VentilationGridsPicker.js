import { useEffect } from "react";
const VentilationGridsPicker = (props) => {
  useEffect(() => {
    console.log(props.ventilationGrids);
  }, []);
  return (
    <div className="text-white bg-primary">
      Inlet: {props.item.acf.inlet_grids}
      Outlet: {props.item.acf.outlet_grids}
      {props.ventilationGrids[0].variant.map((item) => (
        <h1 className="text-white">{item.id}</h1>
      ))}
    </div>
  );
};
export default VentilationGridsPicker;

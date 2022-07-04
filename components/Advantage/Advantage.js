import { Stack } from "react-bootstrap";
const Advantage = (props) => {
  return (
    <>
      <div
        className="advantage"
        style={{
          backgroundImage: "url(" + props.image + ")",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Stack className="justify-content-center darker" direction="horizontal">
          <h2>
            Advantage of
            <span className="shortName fw-bolder"> {props.shortName}</span>
          </h2>
        </Stack>
        <div className="advantage-flex darker">
          <div className="advantage-left">
            <ul>
              <li>Cheap to build-in</li>
              <li>No heat and cost less than other fireplaces</li>
              <li>Can be built in anywhere</li>
              <li>Children safe</li>
              <li>High security</li>
              <li>You do not have to spend money on a chimney</li>
              <li>Comes in 500 to 2400mm long</li>
            </ul>
          </div>
          <div className="advantage-right">
            <ul>
              <li>Remote control(standard)</li>
              <li>Control display on the DFE (standard)</li>
              <li>
                Sound from the Fireplace with info about refueling the Ethanol
                tank
              </li>
              <li>Ethanol refueling by the display</li>
              <li>
                Control via SHS (smart home system)(optional) works on all
                control systems such as example KNX
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
export default Advantage;

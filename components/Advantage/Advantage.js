import Image from "next/image";
import { Stack } from "react-bootstrap";
const Advantage = (props) => {
  const itemsLeft = props.itemsLeft.map((item) => {
    return <li key={Math.random()}>{item}</li>;
  });
  const itemsRight = props.itemsRight.map((item) => {
    return <li key={Math.random()}>{item}</li>;
  });
  return (
    <>
      <div
        className="advantage landingRest darker"
        /*  style={{
          backgroundImage: "url(" + props.image + ")",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}*/
      >
        <Image
          className="landingImage darker"
          src={props.image}
          alt="Picture of advantages"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
        <Stack className="justify-content-center darker" direction="horizontal">
          <h2>
            Advantage of
            <span className="shortName fw-bolder"> {props.shortName}</span>
          </h2>
        </Stack>
        <div className="advantage-flex darker">
          <div className="advantage-left">
            <ul>{itemsLeft}</ul>
          </div>
          <div className="advantage-right">
            <ul>{itemsRight}</ul>
          </div>
        </div>
      </div>
    </>
  );
};
export default Advantage;

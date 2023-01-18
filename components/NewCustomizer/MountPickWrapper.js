import { Ratio } from "react-bootstrap";
import Image from "next/image";
const MountPickWrapper = (props) => {
  return (
    <div className="bg-info h-100" style={{ borderRadius: 25 }}>
      {props.children}
    </div>
  );
};
export default MountPickWrapper;
/*
 <Ratio aspectRatio="4x3">
        <Image
          className=""
          style={{ borderRadius: 15 }}
          alt="photocard-picture"
          src={props.image}
          layout="fill"
        />
      </Ratio>
*/

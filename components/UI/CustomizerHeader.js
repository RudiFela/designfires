import { Badge } from "react-bootstrap";
const CustomizerHeader = (props) => {
  return (
    <h3 className="text-center ">
      <Badge className="my-2" bg="danger">
        {props.children}
      </Badge>
    </h3>
  );
};
export default CustomizerHeader;

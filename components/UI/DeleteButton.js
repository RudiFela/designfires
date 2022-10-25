import { RiDeleteBin6Line } from "react-icons/ri";
import { motion } from "framer-motion";
import { Button } from "react-bootstrap";
const DeleteButton = (props) => {
  return (
    <motion.div whileHover={{ scale: 1.1 }}>
      <Button variant="info" onClick={() => props.reset()}>
        <RiDeleteBin6Line fill="white" />
      </Button>
    </motion.div>
  );
};
export default DeleteButton;

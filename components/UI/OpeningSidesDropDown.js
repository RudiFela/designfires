import { useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { ImCancelCircle } from "react-icons/im";
import { motion, AnimatePresence } from "framer-motion";
import GlassOptions from "./glassPick";

const OpeningSidesDropDown = (props) => {
  const [dropDownTitle, setDropDownTitle] = useState(
    <div style={{ width: "50px" }}>Glass</div>
  );
  const [dropDownPicked, setDropDownPicked] = useState(false);
  const onDropDownChange = (item) => {
    //props.onChange();
    setDropDownPicked(true);
    setDropDownTitle(<div style={{ width: "50px" }}>{item.svg}</div>);
    props.onSelect(item);
    /*
    onSelectMountType(
                () =>
                  props.glassPiecesChange(
                    item.pieces,
                    item.shortGlass,
                    item.longGlass
                  ),
                item.svg
              )
              */
  };
  const onReset = () => {
    setDropDownPicked(false);
    props.onReset();
    setDropDownTitle(<div style={{ width: "50px" }}>Glass</div>);
  };
  return (
    <>
      <DropdownButton
        id="dropdown-basic-button"
        className="glass-picker"
        title={
          <div className="fw-bold fs-5 m-0" style={{ width: "50px" }}>
            {dropDownTitle}
          </div>
        }
        //disabled={!selected}
        variant="primary"
      >
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {GlassOptions.map((item) => (
              <Dropdown.Item
                key={item.title}
                className="text-white customizer px-3 mx-3"
                style={{ width: "220px" }}
                onClick={() => onDropDownChange(item)}
              >
                <div className="w-100">
                  {" "}
                  {item.svg}
                  <p className="fw-bold my-3 text-center">{item.title}</p>
                </div>
              </Dropdown.Item>
            ))}
          </motion.div>
        </AnimatePresence>
      </DropdownButton>
      {dropDownPicked && (
        <ImCancelCircle
          className="text-primary"
          onClick={() => {
            onReset();
          }}
        />
      )}
    </>
  );
};
export default OpeningSidesDropDown;

import { useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import GlassOptions from "./glassPick";

const OpeningSidesDropDown = (props) => {
  const [dropDownTitle, setDropDownTitle] = useState(
    <div style={{ width: "50px" }}>Glass</div>
  );

  const onDropDownChange = (item) => {
    //props.onChange();
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
    </>
  );
};
export default OpeningSidesDropDown;

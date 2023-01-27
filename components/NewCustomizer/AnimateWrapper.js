import React from "react";
import { motion, AnimatePresence } from "framer-motion";

function AnimateWrapper(props) {
  return (
    <AnimatePresence>
      <motion.div
        className="h-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {props.children}
      </motion.div>
    </AnimatePresence>
  );
}

export default AnimateWrapper;

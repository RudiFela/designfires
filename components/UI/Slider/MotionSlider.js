import {
  motion,
  useTime,
  useTransform,
  useMotionValue,
  AnimatePresence,
} from "framer-motion";
import { useEffect, useState, useRef } from "react";
const MotionSlider = ({ slides }) => {
  const [width, setWidth] = useState(0);
  const carouselRef = useRef();
  useEffect(() => {
    setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
  }, []);
  const time = useTime();
  const translateX = useTransform(time, [0, 4000], [0, -95], {
    clamp: false,
  }); //useTransform(x, [-50, -100], [0, 1]);
  //const x = useTransform(x, [0, 1], [0, 2], { clamp: false });
  return (
    <motion.div
      ref={carouselRef}
      className="carouselo"
      whileTap={{ cursor: "grabbing" }}
    >
      <motion.div
        drag="x"
        //transition={{ type: "spring" }}

        style={{ translateX }}
        //animate={{ x: 600 }}
        dragConstraints={{ right: 0, left: -width }}
        className="inner-carouselo"
      >
        {" "}
        {slides !== undefined
          ? slides.map((image) => {
              return (
                <AnimatePresence key={image.acf.image.url}>
                  <motion.img
                    className="w-100"
                    src={image.acf.image.url}
                    initial={{ x: 300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -300, opacity: 0 }}
                  />
                </AnimatePresence>
              );
            })
          : null}
      </motion.div>
    </motion.div>
  );
};
export default MotionSlider;
/*   <motion.div
                  initial={false}
                  key={image.id}
                  className="carouselo-item"
                >
                  <img src={image.acf.image.url} alt="" />
                </motion.div>*/

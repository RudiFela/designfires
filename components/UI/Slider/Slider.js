import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Row, Col, Ratio } from "react-bootstrap";
const Slider = ({ slides, onPick }) => {
  const [currentIndex, setCurrentIndex] = useState(3);
  const [nextIndex, setNextIndex] = useState(2);
  const [isHover, setIsHover] = useState(false);
  useEffect(() => {
    // console.log("current", currentIndex, "next", nextIndex);
    const intervalId = setInterval(() => {
      !isHover && goToNext();
    }, 4000);
    return () => {
      clearInterval(intervalId);
    };
  }, [nextIndex, isHover]);

  const sliderStyles = {
    height: "100%",
    position: "relative",
  };
  const slideStyles = {
    width: "100%",
    height: "100%",
    borderRadius: "10px",
    backgroundPosition: "center",
    backgroundSize: "cover",
    overflow: "hidden",
  };

  const goToPrevious = () => {
    const isLastSlideLeft = currentIndex - 2 <= slides.length - 1;
    const isLastSlideRight = nextIndex - 2 <= slides.length - 1;
    const newRightIndex = isLastSlideRight ? 1 : nextIndex - 2;
    const newLeftIndex = isLastSlideLeft ? 0 : currentIndex - 2;
    setCurrentIndex(newLeftIndex);
    setNextIndex(newRightIndex);
  };

  const goToNext = () => {
    const isLastSlideLeft = currentIndex + 2 >= slides.length - 1;
    const isLastSlideRight = nextIndex + 2 >= slides.length - 1;
    const newRightIndex = isLastSlideRight ? 1 : nextIndex + 2;
    const newLeftIndex = isLastSlideLeft ? 0 : currentIndex + 2;
    setCurrentIndex(newLeftIndex);
    setNextIndex(newRightIndex);
  };

  const leftArrowStyles = {
    position: "absolute",
    top: "50%",
    transform: "translate(0,-50%)",
    left: "1px",
    fontSize: "50px",
    color: "#fff",
    zIndex: 1,
    cursor: "pointer",
  };
  const rightArrowStyles = {
    position: "absolute",
    top: "50%",
    transform: "translate(0,-50%)",
    right: "1px",
    fontSize: "50px",
    color: "#fff",
    zIndex: 1,
    cursor: "pointer",
  };
  return (
    <>
      <div style={sliderStyles}>
        <div style={leftArrowStyles} className="p-4" onClick={goToPrevious}>
          {" "}
          {`<`}
        </div>{" "}
        <div style={rightArrowStyles} className="p-4" onClick={goToNext}>
          {" "}
          {`>`}{" "}
        </div>
        <AnimatePresence style={slideStyles}>
          <Row
            onMouseOver={() => setIsHover(true)}
            onMouseOut={() => setIsHover(false)}
            className=""
          >
            <Col className="p-3" style={{ height: "auto", width: "auto" }}>
              <motion.div className="" whileHover={{ scale: 1.1 }}>
                <Ratio aspectRatio="4x3">
                  <div className="rel ">
                    <>
                      <motion.img
                        whileHover={{ cursor: "pointer" }}
                        style={{
                          overflow: "hidden",
                          width: "100%",
                          height: "100%",
                          borderRadius: "25px",
                          backgroundPosition: "center",
                          backgroundSize: "100%,100%",
                          backgroundImage: `url(${slides[currentIndex].acf.image.url})`,
                        }}
                        key={`url(${slides[nextIndex].acf.image.url})`}
                        src={slides[currentIndex].acf.image.url}
                        initial={{ x: 200, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -100, opacity: 0 }}
                        transition={{ duration: 0.7 }}
                        onClick={() => onPick(slides[currentIndex])}
                      />{" "}
                      <motion.div className="overlay text-center text-white">
                        {slides[currentIndex].acf.place_name}
                      </motion.div>
                    </>
                  </div>
                </Ratio>
              </motion.div>
            </Col>
            <Col className="p-3">
              <motion.div className="h-100" whileHover={{ scale: 1.1 }}>
                <Ratio aspectRatio="4x3">
                  <div className="rel">
                    <motion.img
                      whileHover={{ cursor: "pointer" }}
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "25px",
                        // backgroundPosition: "center",
                        // backgroundSize: "cover",
                        // backgroundImage: `url(${slides[nextIndex].acf.image.url})`,
                        overflow: "hidden",
                      }}
                      key={`url(${slides[nextIndex].acf.image.url})`}
                      src={slides[nextIndex].acf.image.url}
                      initial={{ x: 200, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -200, opacity: 0 }}
                      transition={{ duration: 0.7 }}
                      onClick={() => onPick(slides[nextIndex])}
                    />
                    <motion.div className="overlay text-center text-white">
                      {slides[nextIndex].acf.place_name}
                    </motion.div>
                  </div>
                </Ratio>
              </motion.div>
            </Col>
          </Row>
        </AnimatePresence>
      </div>
    </>
  );
};
export default Slider;
//<img width="100%"src={slides[currentIndex + 1].acf.image.url}/>
/*
<div style={slideStyles}>
          <Row>
            <Col height="200px" style={firstSlide}></Col>
            <Col style={secondSlide}> </Col>
          </Row>
        </div>{" "}
 <Row style={slideStyles}>
          <Col className="mx-2" style={firstSlide}></Col>
          <Col className="mx-2" style={secondSlide}></Col>
        </Row>{" "}     
         <div style={leftArrowStyles} onClick={goToPrevious}>
          {" "}
          {`<`}
        </div>
        <div style={rightArrowStyles} onClick={goToNext}>
          {" "}
          {`>`}{" "}
        </div>{" "}  
         const firstSlide = {
    width: "100%",
    height: "100%",
    borderRadius: "25px",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundImage: `url(${slides[currentIndex].acf.image.url})`,
  };
  const secondSlide = {
    width: "100%",
    height: "100%",
    borderRadius: "25px",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundImage: `url(${slides[nextIndex].acf.image.url})`,
  };
  */

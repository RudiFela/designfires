import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
const Slider = ({ slides, onPick }) => {
  const [currentIndex, setCurrentIndex] = useState(3);
  const [nextIndex, setNextIndex] = useState(2);
  useEffect(() => {
    // console.log("current", currentIndex, "next", nextIndex);
    const intervalId = setInterval(() => {
      goToNext();
    }, 3000);
    return () => {
      clearInterval(intervalId);
    };
  }, [nextIndex]);

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
  return (
    <>
      <div style={sliderStyles}>
        <AnimatePresence style={slideStyles}>
          <Row className="h-100">
            <Col className="h-100 m-3">
              {" "}
              <motion.div className="h-100" whileHover={{ scale: 1.1 }}>
                <div className="rel h-100">
                  <motion.img
                    whileHover={{ cursor: "pointer" }}
                    style={{
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
                    exit={{ x: -200, opacity: 0 }}
                    onClick={() => onPick(slides[currentIndex])}
                  />{" "}
                  <motion.div className="overlay text-center text-white">
                    {slides[currentIndex].acf.place_name}
                  </motion.div>
                </div>
              </motion.div>
            </Col>
            <Col className="h-100 m-3">
              <motion.div className="h-100" whileHover={{ scale: 1.1 }}>
                <div className="rel h-100">
                  <motion.img
                    whileHover={{ cursor: "pointer" }}
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "25px",
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      backgroundImage: `url(${slides[nextIndex].acf.image.url})`,
                      overflow: "hidden",
                    }}
                    key={`url(${slides[nextIndex].acf.image.url})`}
                    src={slides[nextIndex].acf.image.url}
                    initial={{ x: 200, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -200, opacity: 0 }}
                    onClick={() => onPick(slides[nextIndex])}
                  />
                  <motion.div className="overlay text-center text-white">
                    {slides[nextIndex].acf.place_name}
                  </motion.div>
                </div>
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
  const leftArrowStyles = {
    position: "absolute",
    top: "50%",
    transform: "translate(0,-50%)",
    left: "32px",
    fontSize: "45px",
    color: "#fff",
    zIndex: 1,
    cursor: "pointer",
  };
  const rightArrowStyles = {
    position: "absolute",
    top: "50%",
    transform: "translate(0,-50%)",
    right: "32px",
    fontSize: "45px",
    color: "#fff",
    zIndex: 1,
    cursor: "pointer",
  }; */

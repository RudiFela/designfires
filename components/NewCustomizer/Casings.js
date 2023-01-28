import { useState, useContext, useEffect } from "react";
import {
  Button,
  Row,
  Col,
  Ratio,
  Badge,
  OverlayTrigger,
  Popover,
} from "react-bootstrap";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  CgArrowsExpandRight,
  CgArrowsShrinkH,
  CgArrowsShrinkV,
  CgArrowsMergeAltV,
} from "react-icons/cg";
import { LanguageContext } from "../context/language-context";
import CustomizerHeader from "../UI/CustomizerHeader";
import PopoverComponent from "../UI/Popover";
import MyVerticallyCenteredModal from "../Decorations/Modal";
import GlassColor from "./GlassColor";
const Casings = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [technicalDrawing, setTechnicalDrawing] = useState();
  const [shortPcs, setShortPcs] = useState();
  const [longPcs, setLongPcs] = useState();
  const [holdersPcs, setHoldersPcs] = useState();
  const [selected, setSelected] = useState(false);
  const [clicked, setClicked] = useState();
  useEffect(() => {
    // console.log(props.casings);
  }, []);
  const showModalHandler = (image) => {
    setTechnicalDrawing(image);
    setShowModal(true);
    document.body.click();
  };
  const closeModal = () => {
    setShowModal(false);
  };
  const findVariant = (array, name, long, short, holders) => {
    //console.log(props.casings);
    const findedVariant = array.find(
      (item) =>
        Number(item.length.option) === Number(Number(props.pickedLength) + 60)
    );
    return {
      ...findedVariant,
      name,
      longGlass: Number(long),
      shortGlass: Number(short),
      glassPcs: Number(holders),
    };
  };
  const lang = useContext(LanguageContext);

  const pickedVariantCasings = props.casings.map((item) =>
    findVariant(
      item.variant,
      item.meta_data.find((item) => item.key === "fullname").value,
      item.meta_data.find((item) => item.key === "long_opening_sides").value,
      item.meta_data.find((item) => item.key === "short_opening_sides").value,
      item.meta_data.find((item) => item.key === "openingsides").value
    )
  );

  //console.log(pickedVariantCasings);
  const onPick = (item) => {
    setClicked([item]);
    setLongPcs(item.longGlass);
    setShortPcs(item.shortGlass);
    setHoldersPcs(item.glassPcs);
    props.onCasingPick(item);
    setSelected(true);
    //console.log(item);
  };
  const pickStyle = `${selected ? "p-3" : "p-3 not-allowed"}`;
  return (
    <div>
      <CustomizerHeader>Casings</CustomizerHeader>
      <MyVerticallyCenteredModal
        //image={modalPhoto}
        show={showModal}
        closemodal={() => closeModal()}
      >
        <div className="embed-responsive embed-responsive-21by9 ">
          {technicalDrawing ? (
            <Ratio aspectRatio="4x3">
              <iframe
                style={{ width: "100%" }}
                className="embed-responsive-item modal-size"
                src={`${technicalDrawing}/embed?autospin=1&dnt=1`}
              ></iframe>
            </Ratio>
          ) : (
            <h2 className="text-white text-center mt-5">
              Sorry,cant find 3d model
            </h2>
          )}
        </div>
      </MyVerticallyCenteredModal>{" "}
      {!selected && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Row md={4}>
              {pickedVariantCasings.map((item) => (
                <Col key={item.id}>
                  <motion.div
                    className={`fw-bold bg-primary p-3 borderr m-1 ${
                      clicked
                        ? clicked.id === item.id &&
                          "border border-3 border-warning"
                        : ""
                    } `}

                    //  whileTap={{ scale: 0.9 }}
                  >
                    <Ratio aspectRatio="4x3" onClick={() => onPick(item)}>
                      <Image
                        src={item.img}
                        alt="casing photo"
                        //width={200}
                        //height={200}
                        style={{ borderRadius: "25px" }}
                        layout="fill"
                      />
                    </Ratio>
                    <p className="mt-3 fs-6 text-center wrap">{item.name}</p>
                    <Row>
                      <Col className="d-flex justify-content-center m-1">
                        <span>
                          <Badge bg="info" className=" fs-5">
                            {Number(
                              lang.currencyPrice(
                                item.price,
                                item.SEK_price,
                                item.DKK_price
                              )
                            ).toLocaleString(undefined, {
                              maximumFractionDigits: 2,
                            })}
                            <span> </span>
                            {lang.currencySymbol()}
                          </Badge>
                        </span>
                      </Col>
                      <Col className="d-flex justify-content-center m-2">
                        <OverlayTrigger
                          //ref={overlayRef}
                          //trigger={["hover", "focus"]}
                          trigger="click"
                          placement="bottom"
                          overlay={
                            <Popover id="popover-basic">
                              <Popover.Body>
                                <PopoverComponent
                                  info={[
                                    {
                                      name: "Length",
                                      value: item.length.option,
                                      icon: (
                                        <CgArrowsShrinkH className="me-1" />
                                      ),
                                    },
                                    {
                                      name: "Deep",
                                      value: "350",
                                      icon: (
                                        <CgArrowsExpandRight className="me-1" />
                                      ),
                                    },
                                    {
                                      name: "Heigth",
                                      value: "500",
                                      icon: (
                                        <CgArrowsShrinkV className="me-1" />
                                      ),
                                    },
                                    {
                                      name: "Thickness",
                                      value: "5",
                                      icon: (
                                        <CgArrowsMergeAltV className="me-1" />
                                      ),
                                    },
                                  ]}
                                >
                                  <Row>
                                    <Button
                                      className="mt-2"
                                      onClick={() =>
                                        showModalHandler(item.drawing3d)
                                      }
                                      // "https://designfires.pl/wp-content/uploads/2022/07/designfires.svg"
                                    >
                                      3D View
                                    </Button>
                                  </Row>
                                </PopoverComponent>
                              </Popover.Body>
                            </Popover>
                          }
                          //delay={{ show: 250, hide: 1600 }}
                          rootClose
                        >
                          <Button variant="success" size="sm">
                            <span className="fw-bold">Technical</span>
                          </Button>
                        </OverlayTrigger>
                      </Col>
                      <Col className="d-flex justify-content-center m-1">
                        <Button
                          className="fw-bold"
                          variant="info"
                          onClick={() => onPick(item)}
                        >
                          Select
                        </Button>
                      </Col>
                    </Row>
                  </motion.div>{" "}
                </Col>
              ))}
            </Row>
          </motion.div>
        </AnimatePresence>
      )}
      <div className={pickStyle}>
        {selected && (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Row>
                <Col>
                  <CustomizerHeader>Select Glass Color</CustomizerHeader>
                  <GlassColor
                    glass={props.glass}
                    pickedLength={props.pickedLength}
                    onGlassPick={props.onGlassPick}
                    longPcs={longPcs}
                    shortPcs={shortPcs}
                    holdersPcs={holdersPcs}
                    allowNextStep={props.allowNextStep}
                  />
                </Col>
                <Col md={4}>
                  {" "}
                  {clicked.map((item) => (
                    <Col key={item.id}>
                      <motion.div
                        className={`fw-bold bg-primary p-3 borderr m-1 ${
                          clicked
                            ? clicked.id === item.id &&
                              "border border-3 border-warning"
                            : ""
                        } `}
                        onClick={() => onPick(item)}
                      >
                        <Ratio aspectRatio="4x3">
                          <Image
                            src={item.img}
                            alt="casing photo"
                            //width={200}
                            //height={200}
                            style={{ borderRadius: "25px" }}
                            layout="fill"
                          />
                        </Ratio>
                        <p className="mt-3 fs-6 text-center wrap">
                          {item.name}
                        </p>
                        <Row>
                          <Col className="d-flex justify-content-center m-1">
                            <span>
                              <Badge bg="info" className=" fs-5">
                                {Number(
                                  lang.currencyPrice(
                                    item.price,
                                    item.SEK_price,
                                    item.DKK_price
                                  )
                                ).toLocaleString(undefined, {
                                  maximumFractionDigits: 2,
                                })}
                                <span> </span>
                                {lang.currencySymbol()}
                              </Badge>
                            </span>
                          </Col>
                          <Col className="d-flex justify-content-center m-2">
                            <OverlayTrigger
                              //ref={overlayRef}
                              //trigger={["hover", "focus"]}
                              trigger="click"
                              placement="bottom"
                              overlay={
                                <Popover id="popover-basic">
                                  <Popover.Body>
                                    <PopoverComponent
                                      info={[
                                        {
                                          name: "Length",
                                          value: item.length.option,
                                          icon: (
                                            <CgArrowsShrinkH className="me-1" />
                                          ),
                                        },
                                        {
                                          name: "Deep",
                                          value: "350",
                                          icon: (
                                            <CgArrowsExpandRight className="me-1" />
                                          ),
                                        },
                                        {
                                          name: "Heigth",
                                          value: "500",
                                          icon: (
                                            <CgArrowsShrinkV className="me-1" />
                                          ),
                                        },
                                        {
                                          name: "Thickness",
                                          value: "5",
                                          icon: (
                                            <CgArrowsMergeAltV className="me-1" />
                                          ),
                                        },
                                      ]}
                                    >
                                      <Row>
                                        <Button
                                          className="mt-2"
                                          onClick={() =>
                                            showModalHandler(item.drawing3d)
                                          }
                                          // "https://designfires.pl/wp-content/uploads/2022/07/designfires.svg"
                                        >
                                          3D View
                                        </Button>
                                      </Row>
                                    </PopoverComponent>
                                  </Popover.Body>
                                </Popover>
                              }
                              //delay={{ show: 250, hide: 1600 }}
                              rootClose
                            >
                              <Button variant="success" size="sm">
                                <span className="fw-bold">Technical</span>
                              </Button>
                            </OverlayTrigger>
                          </Col>
                        </Row>
                      </motion.div>
                    </Col>
                  ))}
                </Col>
              </Row>
              <Button className="mt-3" onClick={() => setSelected(false)}>
                Back To Casings
              </Button>{" "}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};
export default Casings;
/*
 */

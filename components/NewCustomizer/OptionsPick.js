import { useEffect, useState, useContext, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useFireplacePrice } from "../../hooks/useFireplacePrice";
import { LanguageContext } from "../context/language-context";
import MyVerticallyCenteredModal from "../Decorations/Modal";
import fileDownload from "js-file-download";
import { useCartCurrency } from "../../hooks/useCartCurrency";
import axios from "axios";
import { Col, Row, Badge, Button, Stack } from "react-bootstrap";
import { ImFire } from "react-icons/im";
import { GiAutoRepair } from "react-icons/gi";
import DfmOptions from "./DfmOptions";
import DfeOptions from "./DfeOptions";
import TechnicalInfo from "./TechnicalInfo";

const OptionsPick = (props) => {
  const [selectedOption, setSelectedOption] = useState();
  const [showModal, setShowModal] = useState(false);
  const [modalPhoto, setModalPhoto] = useState();
  const [fillingType, setFillingType] = useState("EW");
  const [shsPicked, setShsPicked] = useState(false);
  const [stainlessTopPicked, setStainlessTopPicked] = useState(false);
  const { fireplacePcs } = props;
  useEffect(() => {
    props.onSubmit.current = onSubmit;
    // console.log(selectedOption);
  }, [selectedOption, fillingType, fireplacePcs]);
  const lang = useContext(LanguageContext);
  const topRef = useRef();
  const shsRef = useRef();
  const onFillingType = (choice) => {
    setFillingType(choice);
    // console.log("Changed Filling type for ", choice);
  };

  const pickedFireplace = props.fireplaceItems.find(
    (item) => item.id === props.fireplaceType.id
  );

  const { fireplacePrice } = useFireplacePrice();
  const { setCart } = useCartCurrency();
  const onLengthPick = (item) => {
    // console.log(pickedFireplace);
    // console.log(item);
    props.allowNextStep();
    item.stock_status === "onbackorder"
      ? props.customVariant(true)
      : props.customVariant(false);
    setSelectedOption({
      ...item,
      img: pickedFireplace.images[0].shop_thumbnail,
      name: `${pickedFireplace.name} ${item.length.option}`,
    });
  };
  const closeModal = () => {
    setShowModal(false);
  };
  const showModalHandler = (image) => {
    setModalPhoto(image);
    setShowModal(true);
  };
  const downloadFile = (url, filename) => {
    axios
      .get(url, {
        responseType: "blob",
      })
      .then((res) => {
        fileDownload(res.data, filename);
      });
  };
  const length = pickedFireplace.variant.map((item) => (
    <p className="text-center my-2 " key={item.id}>
      <Button
        variant="info"
        className={`text-white bolder grow fs-5 ${
          selectedOption
            ? selectedOption.id === item.id && "border border-3 border-warning"
            : ""
        }`}
        key={item.id}
        style={{ width: "150px" }}
        onClick={() => {
          onLengthPick(item);
        }}
        eventKey={item}
      >
        {item.length.option}mm{" "}
        {item.stock_status === "instock" ? <ImFire /> : <GiAutoRepair />}
      </Button>
    </p>
  ));

  const onSubmit = () => {
    //console.log(fireplacePcs);
    // po wyborze dlugosci zastap caly koszyk bo i tak wszystko inne musi byc dodane na nowo
    setCart([
      fireplacePrice({
        product: pickedFireplace,
        filling: fillingType,
        smart: shsRef.current.checked,
        top: topRef.current ? topRef.current.checked : false,
        item: selectedOption,
        quantity: fireplacePcs,
      }),
    ]);

    props.onLengthPick(selectedOption.dimensions.length);
  };
  return (
    <Row xs={1} md={2} lg={3}>
      <Col>
        <h3 className="text-center">
          <Badge className="my-1" bg="danger">
            Pick Length
          </Badge>
        </h3>
        <div
          className="bg-primary px-2"
          style={{
            height: "420px",
            overflowY: "scroll",
            borderRadius: 15,
            opacity: 0.85,
          }}
        >
          {length}
        </div>
        <span>
          <Badge className="mt-2 fs-6 text-wrap text-white" bg="info">
            <ImFire />
            <span> </span>
            On Stock - Standard delivery time 5 days
          </Badge>
        </span>{" "}
        <span>
          <Badge className="m-0 mt-2 fs-6 text-white text-wrap" bg="info">
            <GiAutoRepair />
            <span> </span>Custom Variant - Longer delivery time 50-60 days,
            higher price
          </Badge>
        </span>
      </Col>
      <Col className="">
        <h3 className="text-center">
          <Badge className="my-1" bg="danger">
            Extra Options
          </Badge>
        </h3>
        {pickedFireplace.name === "DFM" ? (
          <>
            <DfmOptions
              //onSmartHomeSystem={onSmartHomeSystem}
              onFillingType={onFillingType}
              shsRef={shsRef}
              //onStainlessTop={onStainlessTop}
            />
          </>
        ) : (
          <DfeOptions
            // onSmartHomeSystem={onSmartHomeSystem}
            onFillingType={onFillingType}
            topRef={topRef}
            shsRef={shsRef}
            shsPicked={() => setShsPicked(!shsPicked)}
            topPicked={() => setStainlessTopPicked(!stainlessTopPicked)}
            //onStainlessTop={onStainlessTop}
          />
        )}
        <AnimatePresence>
          {pickedFireplace.name === "DFM" && fillingType !== "EW" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Button className="d-flex flex-column float-end m-1 p-2 fw-bold align-items-center">
                <Badge bg="info">Filling Type</Badge>+{" "}
                {fillingType === "T"
                  ? lang.currencyPrice(100, 995, 755)
                  : lang.currencyPrice(995, 9995, 7555)}{" "}
                {lang.currencySymbol()}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {pickedFireplace.name === "DFE" && shsPicked && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Button className="d-flex flex-column float-end m-1 p-2 fw-bold align-items-center">
                <Badge bg="info">SHS System</Badge>+
                {lang.currencyPrice(400, 3995, 2995)} {lang.currencySymbol()}
              </Button>
            </motion.div>
          )}{" "}
        </AnimatePresence>
        <AnimatePresence>
          {pickedFireplace.name === "DFE" && stainlessTopPicked && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Button className="d-flex flex-column float-end m-1 p-2 fw-bold align-items-center">
                <Badge bg="info">Stainless Top</Badge>+{" "}
                {lang.currencyPrice(300, 2995, 1995)} {lang.currencySymbol()}
              </Button>
            </motion.div>
          )}{" "}
        </AnimatePresence>
        <Button className="d-flex flex-column float-end m-1 p-2 fw-bold align-items-center">
          <Badge bg="info">Standard</Badge>
          {selectedOption ? (
            <>
              {Number(
                lang.currencyPrice(
                  selectedOption.price,
                  selectedOption.SEK_price,
                  selectedOption.DKK_price
                )
              ).toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}{" "}
              {lang.currencySymbol()}
              {selectedOption.stock_status === "instock" ? null : (
                <p className="m-0 p-0 ">
                  <Badge bg="info">
                    +
                    {Number(
                      lang.currencyPrice(
                        selectedOption.manufacture_cost_EUR,
                        selectedOption.manufacture_cost_SEK,
                        selectedOption.manufacture_cost_DKK
                      )
                    ).toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
                    <span> </span>
                    {lang.currencySymbol()}
                  </Badge>
                </p>
              )}
            </>
          ) : (
            <> 0 {lang.currencySymbol()}</>
          )}
        </Button>
      </Col>
      <Col>
        <h3 className="text-center">
          <Badge className="my-1" bg="danger">
            Technical Info
          </Badge>
        </h3>
        <TechnicalInfo
          item={selectedOption}
          showModalHandler={showModalHandler}
        />
        <MyVerticallyCenteredModal
          image={modalPhoto}
          show={showModal}
          closemodal={() => closeModal()}
          Footer={
            <Button
              //href={selectedFireplace.variant_details.technical_PDF}
              variant="info"
              className="text-white"
              onClick={() =>
                downloadFile(
                  selectedOption.drawing3d,
                  `${pickedFireplace.name} ${selectedOption.dimensions.length}.pdf`
                )
              }
            >
              Download PDF
            </Button>
          }
        ></MyVerticallyCenteredModal>
        {selectedOption && (
          <div className="d-flex flex-column float-end m-1 p-2 fw-bold align-items-center">
            <Badge>Do You need more than 1 fireplace?</Badge>
            <span className="mt-2 bg-primary p-3 rounded">
              <span className="fw-bold fs-5 px-2">{fireplacePcs}</span>
              <Button
                size="sm"
                variant="info"
                className="m-1 fw-bold"
                onClick={() => props.onFireplacePcs(true)}
              >
                +
              </Button>
              {fireplacePcs > 1 && (
                <Button
                  size="sm"
                  variant="success"
                  className="m-1 fw-bold"
                  onClick={() => props.onFireplacePcs(false)}
                >
                  -
                </Button>
              )}
            </span>
          </div>
        )}
      </Col>
    </Row>
  );
};
export default OptionsPick;

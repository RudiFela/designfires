import { useEffect, useState, useContext, useRef } from "react";
import { useFireplacePrice } from "../../hooks/useFireplacePrice";
import { LanguageContext } from "../context/language-context";
import MyVerticallyCenteredModal from "../Decorations/Modal";
import fileDownload from "js-file-download";
import { useCart } from "react-use-cart";
import { useCartCurrency } from "../../hooks/useCartCurrency";
import axios from "axios";
import { Col, Row, Badge, Button } from "react-bootstrap";
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
  useEffect(() => {
    props.onSubmit.current = onSubmit;
  }, [selectedOption]);
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
  const { setItems, calculateItemTotals } = useCart();
  const { fireplacePrice } = useFireplacePrice();
  const { addToCart, setCart } = useCartCurrency();
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
    <p className="text-center my-2" key={item.id}>
      <Button
        variant="info"
        className="text-white bolder grow fs-5"
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
    // po wyborze dlugosci zastap caly koszyk bo i tak wszystko inne musi byc dodane na nowo
    setCart([
      fireplacePrice({
        product: pickedFireplace,
        filling: fillingType,
        smart: shsRef.current.checked,
        top: topRef.current ? topRef.current.checked : false,
        item: selectedOption,
      }),
    ]);
    props.onLengthPick(selectedOption.dimensions.length);
  };
  return (
    <div>
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
              //onStainlessTop={onStainlessTop}
            />
          )}
          <Button className="float-end m-2 fw-bold">
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
                    selectedOption.technical_image[0],
                    `${pickedFireplace.name} ${selectedOption.dimensions.length}.pdf`
                  )
                }
              >
                Download PDF
              </Button>
            }
          ></MyVerticallyCenteredModal>
        </Col>
      </Row>
    </div>
  );
};
export default OptionsPick;

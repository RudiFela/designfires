import { useState, useEffect } from "react";
import { useCart } from "react-use-cart";
import { useCartCurrency } from "../../hooks/useCartCurrency";
import { Col, Row, Button, Badge } from "react-bootstrap";
import Casings from "./Casings";
import FurnitureBox from "./FurnitureBox";
import SelfBuildMount from "./SelfBuildMount";
import MountPickWrapper from "./MountPickWrapper";
const MountPick = (props) => {
  const [mountPick, setMountPick] = useState(0);
  const [shortGlass, setShortGlass] = useState();
  const [longGlass, setLongGlass] = useState();
  const [holdersPcs, setHoldersPcs] = useState();
  const [nextStep, setNextStep] = useState(false);
  const [mountProduct, setMountProduct] = useState();
  const { getPrices } = useCartCurrency();
  useEffect(() => {
    props.onSubmit.current = onSubmit;
  }, [shortGlass, longGlass, holdersPcs]);
  const { addItem, setCartMetadata, metadata } = useCart();
  //const furnitureVariant = props.furnitureBox.variant.find(
  //  (variant) => variant.length.option === props.pickedLength
  //);
  const furnitureBoxVariant = {
    ...props.furnitureBox.variant.find(
      (variant) => variant.length.option === props.pickedLength
    ),
    name: props.furnitureBox.name,
    img: props.furnitureBox.images[0].shop_thumbnail,
  };

  //console.log(furnitureBoxVariant);
  const onGlassPick = (selectedGlass) => {
    const longGlassCartProduct = {
      ...selectedGlass.long,
      name: selectedGlass.longName,
      img: selectedGlass.img,
    };
    const shortGlassCartProduct = {
      ...selectedGlass.short,
      name: selectedGlass.shortName,
      img: selectedGlass.img,
    };
    setLongGlass({ long: longGlassCartProduct, pcs: selectedGlass.longPcs });
    setShortGlass({
      short: shortGlassCartProduct,
      pcs: selectedGlass.shortPcs,
    });
    setHoldersPcs(selectedGlass.holderPcs);
    //on sumbit add glass!
    // HOLDERS PCS!
    onFinishStep();
    //console.log("long:", long, "pcs", longPcs, "short", short, "pcs", shortPcs);
  };
  const onFinishStep = () => {
    setNextStep(true);
  };
  const onCasingPick = (item) => {
    setMountProduct({
      ...item,
      prices: getPrices(item.price, item.SEK_price, item.DKK_price),
    });
  };
  const onSubmit = () => {
    const findGlassHolders = props.glass.find(
      (item) => item.name === "Glass Holder x 2 pcs"
    );
    const glassHolders = {
      ...findGlassHolders,
      img: findGlassHolders.images[0].shop_thumbnail,
      prices: getPrices(
        findGlassHolders.price,
        findGlassHolders.SEK_price,
        findGlassHolders.DKK_price
      ),
    };
    addItem(
      {
        ...longGlass.long,
        prices: getPrices(
          longGlass.long.price,
          longGlass.long.SEK_price,
          longGlass.long.DKK_price
        ),
      },
      longGlass.pcs
    );
    addItem(
      {
        ...shortGlass.short,
        prices: getPrices(
          shortGlass.short.price,
          shortGlass.short.SEK_price,
          shortGlass.short.DKK_price
        ),
      },
      shortGlass.pcs
    );
    addItem(glassHolders, holdersPcs);
    mountProduct && addItem(mountProduct);
  };

  const extendSection = () => {
    switch (mountPick) {
      case 0:
        return (
          <Row md={3} className="h-100">
            <Col
              className={`p-0 ${props.customFireplace ? "not-allowed" : null}`}
              onClick={() => setMountPick(1)}
            >
              <div className="bg-info h-100 casing-type">
                <h3 className="text-center fw-bold pt-2">
                  {" "}
                  <Badge>Casings</Badge>
                </h3>
              </div>
            </Col>
            <Col
              className={`p-0 ${props.customFireplace ? "not-allowed" : null}`}
              onClick={() => setMountPick(2)}
            >
              <div className="bg-info h-100 furniture-type">
                <h3 className="text-center fw-bold pt-2">
                  {" "}
                  <Badge>Furniture Box</Badge>
                </h3>
              </div>
            </Col>
            <Col className="p-0" onClick={() => setMountPick(3)}>
              <div className="bg-info h-100 selfbuild-type">
                <h3 className="text-center fw-bold pt-2">
                  {" "}
                  <Badge> Self-Build</Badge>
                </h3>
              </div>
            </Col>
          </Row>
        );
      case 1:
        return (
          <Casings
            pickedLength={props.pickedLength}
            glass={props.glass}
            onGlassPick={onGlassPick}
            casings={props.casings}
            stepBack={() => setMountPick(0)}
            onCasingPick={onCasingPick}
            allowNextStep={props.allowNextStep}
          />
        );
      case 2:
        return (
          <FurnitureBox
            pickedLength={props.pickedLength}
            glass={props.glass}
            onGlassPick={onGlassPick}
            furnitureBox={furnitureBoxVariant}
            stepBack={() => setMountPick(0)}
            onCasingPick={onCasingPick}
            allowNextStep={props.allowNextStep}
          />
        );
      case 3:
        return (
          <SelfBuildMount
            pickedLength={props.pickedLength}
            onGlassPick={onGlassPick}
            glass={props.glass}
            stepBack={() => setMountPick(0)}
            allowNextStep={props.allowNextStep}
          />
        );
    }
  };
  return (
    <div
      className={`h-100 ${mountPick > 0 ? `` : "overflow-hidden"}`}
      style={{ borderRadius: 25 }}
    >
      {extendSection()}
    </div>
  );
};
export default MountPick;

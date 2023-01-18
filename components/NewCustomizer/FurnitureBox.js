import { useState, useContext, useEffect } from "react";
import NewColorPicker from "../UI/NewColorPicker";
import Image from "next/image";
import { LanguageContext } from "../context/language-context";

import {
  Stack,
  Button,
  OverlayTrigger,
  Popover,
  Row,
  Col,
  Ratio,
} from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import colorPalete from "../UI/colors";
import PopoverComponent from "../UI/Popover";
import {
  CgArrowsExpandRight,
  CgArrowsShrinkH,
  CgArrowsShrinkV,
} from "react-icons/cg";
import CustomizerHeader from "../UI/CustomizerHeader";
import GlassColor from "./GlassColor";
const FurnitureBox = (props) => {
  const [blockPickerColor, setBlockPickerColor] = useState({
    color: "#FFFFFF",
    ral: "RAL 9010",
  });
  useEffect(() => {
    const furniture = {};
    blockPickerColor.color !== "#FFFFFF"
      ? (furniture = {
          ...props.furnitureBox,
          color: blockPickerColor,
          price: Number(
            Math.round(props.furnitureBox.price * 1.1 + "e+2") + "e-2"
          ),
        })
      : (furniture = { ...props.furnitureBox, color: blockPickerColor });

    props.onCasingPick(furniture);
  }, [blockPickerColor]);
  // API CALL FOR FURNITURE AND GLASS
  const lang = useContext(LanguageContext);
  const popover = (
    <Popover id="popover-basic">
      <Popover.Body>
        <PopoverComponent
          info={[
            {
              name: "Length",
              value: Number(props.pickedLength) + 100,
              icon: <CgArrowsShrinkH className="me-1" />,
            },
            {
              name: "Deep",
              value: "350",
              icon: <CgArrowsExpandRight className="me-1" />,
            },
            {
              name: "Height",
              value: "500",
              icon: <CgArrowsShrinkV className="me-1" />,
            },
          ]}
        ></PopoverComponent>
      </Popover.Body>
    </Popover>
  );

  const onChangeColor = (color, ral) => {
    console.log(props.furnitureBox);
    setBlockPickerColor({ color, ral });
  };

  return (
    <>
      <CustomizerHeader>Furnite Box</CustomizerHeader>
      <Row>
        <Col className="my-2 mx-2">
          <div className="product mb-2">
            <Ratio aspectRatio="4x3" className="">
              <div className="">
                <Image
                  className="card-image-bottom img-1"
                  alt="FurnitureBox"
                  layout="fill"
                  src="https://designfires.pl/wp-content/uploads/2022/10/FurnitureBox1.png"
                />
                <Image
                  className="card-image-bottom img-2 "
                  alt="FurnitureBox"
                  layout="fill"
                  src="https://designfires.pl/wp-content/uploads/2022/10/FurnitureBox2.png"
                />
              </div>
            </Ratio>
            <div
              className="color"
              style={{ backgroundColor: `${blockPickerColor.color}` }}
            ></div>
          </div>

          <GlassColor
            glass={props.glass}
            pickedLength={props.pickedLength}
            onGlassPick={props.onGlassPick}
            longPcs={2}
            shortPcs={2}
            holdersPcs={8}
            allowNextStep={props.allowNextStep}
          />
        </Col>
        <Col style={{ opacity: 0.85 }} className="mx-2">
          <NewColorPicker colors={colorPalete} onPick={onChangeColor} />{" "}
          <Stack className="mx-auto mt-2 " direction="horizontal" gap={1}>
            <Button variant="primary" className="fw-bold">
              {Number(
                lang.currencyPrice(
                  props.furnitureBox.price,
                  props.furnitureBox.SEK_price,
                  props.furnitureBox.DKK_price
                )
              ).toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}
              <span> </span>
              {lang.currencySymbol()}
            </Button>
            <OverlayTrigger
              trigger="click"
              placement="bottom"
              overlay={popover}
              //delay={{ show: 250, hide: 1600 }}
              rootClose
            >
              <Button variant="primary">Technical Info</Button>
            </OverlayTrigger>
          </Stack>
        </Col>
      </Row>
      <Button onClick={() => props.stepBack()}>Back</Button>
    </>
  );
};
export default FurnitureBox;

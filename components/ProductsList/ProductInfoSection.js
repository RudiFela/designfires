import React from "react";
import { useContext, useEffect, useRef, createRef } from "react";
import Image from "next/image";
import {
  Row,
  Col,
  Badge,
  Button,
  Ratio,
  Container,
  Stack,
} from "react-bootstrap";
import LanguageSwitcher from "../UI/LanguageSwitcher/LanguageSwitcher";
import ImageGallery from "react-image-gallery";
import { LanguageContext } from "../context/language-context";
import { motion, useAnimation } from "framer-motion";
import Dimensions from "../UI/Dimensions";
import { BsInfoCircle, BsCheckSquare, BsXSquare } from "react-icons/bs";
import VentilationGridsPicker from "./VentilationGridsPicker";
import SelectFireplace from "./SelectFireplace";
import GeneralInfo from "../ProductInfoSections/GeneralInfo";
import EnergeticEfficiency from "../ProductInfoSections/EnergeticEfficiency";
import Certificates from "../ProductInfoSections/Certificates";
import Equipment from "../ProductInfoSections/Equipment";

function ProductInfoSection(props) {
  const { item } = props;
  return (
    <Row className="my-3 fs-5" xs={1} md={1} lg={2}>
      <GeneralInfo item={item.acf} ventGrids={props.ventGrids} />

      <Col className="px-3 mt-3">
        <Row>
          <Badge className="fs-4 mb-2" bg="success">
            Basic dimensions
          </Badge>
        </Row>
        <Dimensions
          length={item.dimensions.length}
          height={item.dimensions.height}
          width={item.dimensions.width}
          variant="info"
          unity="cm"
        >
          <span>
            Weight:
            <Badge bg="info" className="float-end">
              {" "}
              <span> </span> {item.weight} kg
            </Badge>
          </span>
          {item.acf.exhaust_diameter && (
            <span>
              Exhaust outlet diameter
              <Badge bg="info" className="float-end">
                {" "}
                <span> </span> {item.acf.exhaust_diameter} mm
              </Badge>
            </span>
          )}

          <span>
            Type:
            <Badge bg="info" className="float-end">
              {" "}
              <span> </span> {item.acf.type}
            </Badge>
          </span>
        </Dimensions>
      </Col>
      <EnergeticEfficiency item={item.acf} show={props.energetic} />
      <Certificates item={item.acf} show={props.certificates} />
      <Equipment item={item.acf} show={props.equipment} />
    </Row>
  );
}

export default ProductInfoSection;

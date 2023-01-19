import { useEffect, useState } from "react";
import {
  Row,
  Col,
  Badge,
  Button,
  Card,
  Form,
  Container,
} from "react-bootstrap";
import { motion } from "framer-motion";
import WoodFilterOptions from "./WoodFilterOptions";
import WoodCard from "./WoodCard";
import MyVerticallyCenteredModal from "../Decorations/Modal";
import ModalInfoLayout from "./ProductLayout";
import WoodCartList from "./WoodCardList";
import WoodCardList from "./WoodCardList";
const WoodCustomizer = (props) => {
  const [fireplacesToList, setFireplacesToList] = useState(props.fireplace);
  const [showModal, setShowModal] = useState(false);
  const [productInfo, setProductInfo] = useState();
  const [mountFilterValue, setMountFilterValue] = useState();
  const [danishFilter, setDanishFilter] = useState(false);
  const [openingSidesFilter, setOpeningSidesFilter] = useState(false);
  const [rangeFilter, setRangeFilter] = useState(false);
  const [minRangeFilterValue, setMinRangeFilterValue] = useState(1);
  const [maxRangeFilterValue, setMaxRangeFilterValue] = useState(30);
  //const [expandCard, setExpandCard] = useState();
  useEffect(() => {
    mainArrayFilter();
  }, [
    mountFilterValue,
    danishFilter,
    openingSidesFilter,
    minRangeFilterValue,
    maxRangeFilterValue,
  ]);
  const mainArrayFilter = () => {
    let fireplacesArray = props.fireplace;
    fireplacesArray = filterByRange(
      minRangeFilterValue,
      maxRangeFilterValue,
      fireplacesArray
    );

    fireplacesArray = filterByMountType(mountFilterValue, fireplacesArray);
    fireplacesArray = filterDanishApproved(danishFilter, fireplacesArray);
    // fireplacesArray = filterBySides();
    setFireplacesToList(fireplacesArray);
    console.log(fireplacesArray.map((item) => item.id));
  };
  const filterByMountType = (value, array) => {
    //fireplacesToList
    let filtered;
    if (value !== undefined) {
      filtered = array.filter((item) => item.acf.type === value);
    } else {
      filtered = array;
    }
    //console.log(filtered);

    return filtered;
  };
  const filterBySides = () => {};
  const filterByRange = (from, to, array) => {
    //fireplacesToList
    const filtered = array.filter(
      (item) => Number(item.acf.kw) <= to && Number(item.acf.kw) > from
    );
    console.log(filtered);

    return filtered;
  };
  const filterDanishApproved = (x, array) => {
    if (x) {
      let filtered = array.filter((item) => item.acf.danish_approved === x);
      let filteredKratkiFireplaces = array.filter(
        (item) => item.acf.producent === "K"
      );
      let filteredFireplaces = filtered.concat(filteredKratkiFireplaces);
      return filteredFireplaces;
    }
    return array;
    //console.log("customizer", x);
  };
  const openModal = (item) => {
    setProductInfo(item);
    setShowModal(true);
  };
  const modalProductInfo = <div></div>;
  const minRangeChange = (value) => {
    setMinRangeFilterValue(value);
  };
  const maxRangeChange = (value) => {
    setMaxRangeFilterValue(value);
  };
  return (
    <div>
      <MyVerticallyCenteredModal
        show={showModal}
        closemodal={() => setShowModal(false)}
      >
        <ModalInfoLayout item={productInfo} />
      </MyVerticallyCenteredModal>
      <Container>
        <h1 className="text-white text-center mt-4">
          Find Wood Fireplace of Your Dreams!
        </h1>
        <h2></h2>
        <WoodFilterOptions
          rangeChange={filterByRange}
          mountTypeChange={setMountFilterValue}
          danishApproved={setDanishFilter}
          minRange={minRangeFilterValue}
          maxRange={maxRangeFilterValue}
          minRangeChange={minRangeChange}
          maxRangeChange={maxRangeChange}
        />
        <Row>
          <WoodCardList items={fireplacesToList} showModal={openModal} />
        </Row>
      </Container>
    </div>
  );
};
export default WoodCustomizer;

/*
<Row>
          {props.fireplace.map((item) => (
            <Col key={item.id}>
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src={item.images[0].src} />
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>{item.price}</Card.Text>
                  <Button variant="primary">Check</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

          Footer={
          <Button
            //href={selectedFireplace.variant_details.technical_PDF}
            variant="info"
            className="text-white"
            onClick={() =>
              downloadFile(
                technicalInfo.technical_PDF,
                `${selectedFireplace.name} ${selectedFireplace.length}.pdf`
              )
            }
          >
            Download PDF
          </Button>
        }
*/

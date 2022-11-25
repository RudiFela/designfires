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
import ModalInfoLayout from "./ModalInfoLayout";
const WoodCustomizer = (props) => {
  const [fireplacesToList, setFireplacesToList] = useState(props.fireplace);
  const [showModal, setShowModal] = useState(false);
  const [productInfo, setProductInfo] = useState();
  //const [expandCard, setExpandCard] = useState();
  useEffect(() => {
    // console.log(props.fireplace);
  }, []);
  const filterByMountType = (value) => {
    //fireplacesToList
    const filtered = props.fireplace.filter((item) => item.acf.type === value);
    //console.log(filtered);
    setFireplacesToList(filtered);
    return filtered;
  };
  const filterByRange = (from, to) => {
    //fireplacesToList
    const filtered = props.fireplace.filter(
      (item) => Number(item.acf.kw) <= to && Number(item.acf.kw) > from
    );
    console.log(filtered);
    setFireplacesToList(filtered);
    return filtered;
  };
  const openModal = (item) => {
    setProductInfo(item);
    setShowModal(true);
  };
  const modalProductInfo = <div></div>;

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
          mountTypeChange={filterByMountType}
        />
        <Row>
          <WoodCard items={fireplacesToList} showModal={openModal} />
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

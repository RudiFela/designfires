import Image from "next/image";
import { Col, Row, Stack, Figure, Container } from "react-bootstrap";
import { BsTelephone } from "react-icons/bs";
import { FiMail } from "react-icons/fi";
import Aboutus from "../../components/AboutUs/Aboutus";
import ContactForm from "./ContactForm";
const Footer = (props) => {
  const { cartHandler } = props;

  return (
    <>
      <div id="contact">
        {" "}
        <Container>
          <div className="borderr p-3 mx-3">
            <h2 className="text-white my-2">
              Any questions? Maybe need some more information? Just order
              contact!
            </h2>
            <ContactForm cartHandler={cartHandler} />
          </div>
        </Container>
        <Container fluid className="p-5">
          <Row xs={1} sm={2} className="flex-wrap-reverse">
            <Col>
              <Stack className="fs-4 text fw-bolder footer-wrap">
                <Figure>
                  <Image
                    className="figure-round figure-img img-fluid"
                    width={314}
                    height={131}
                    src="https://designfires.pl/wp-content/uploads/2022/06/logo.svg"
                    alt="Design Fires Logo"
                  />
                </Figure>

                <div className=" text-white">
                  <p>Lerbergets Byaväg 94 </p>
                  <p>263 52 Lerberget Sverige</p>
                </div>
                <div className=" text-white my-4">
                  <p>
                    <BsTelephone className="me-1" size={30} />
                    <a href="callto:+4673-8337191"> +46 73-833 71 91</a>
                  </p>
                </div>
                <div className=" text-white">
                  <p>
                    {" "}
                    <FiMail className="me-1" size={30} />
                    <a href="mailto:info@designfires.com">
                      {" "}
                      info@designfires.com
                    </a>
                  </p>
                </div>
              </Stack>
            </Col>
            <Col>
              <Aboutus />
            </Col>
          </Row>
        </Container>
        <p className="text-white text-center m-0 mt-2">
          © Designfires.com All rights reserved
        </p>
      </div>
    </>
  );
};
export default Footer;

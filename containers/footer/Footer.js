import Image from "next/image";
import { Col, Row, Stack, Figure } from "react-bootstrap";
import { BsTelephone } from "react-icons/bs";
import { FiMail } from "react-icons/fi";
import Aboutus from "../../components/AboutUs/Aboutus";
import ContactForm from "./ContactForm";
const Footer = (props) => {
  const { cartHandler } = props;

  return (
    <div>
      <div id="contact" className=" px-5 mt-4">
        <Row sm={1} md={3} className="footer-wrap">
          <Col>
            <Stack className="fs-4 text fw-bolder">
              <div className="">
                <Figure>
                  <Image
                    className="figure-round figure-img img-fluid"
                    width={314}
                    height={131}
                    src="https://designfires.pl/wp-content/uploads/2022/06/logo.svg"
                    alt="Design Fires Logo"
                  />
                </Figure>
              </div>
              <div className=" text-white">
                <p>Lerbergets Byaväg 94 </p>
                <p>263 52 Lerberget Sverige</p>
              </div>
              <div className=" text-white my-4">
                <p>
                  {" "}
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
          <Col>
            <h2 className="text-white my-2">
              Any questions? Maybe need some more information? Just order
              contact!
            </h2>
            <ContactForm cartHandler={cartHandler} />
          </Col>
        </Row>
        <p className="text-white text-center m-0 mt-2">
          © Designfires.com All rights reserved
        </p>
      </div>
    </div>
  );
};
export default Footer;

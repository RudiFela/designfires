import { useContext, useRef, useState } from "react";
import { useCart } from "react-use-cart";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { AiOutlineCheck } from "react-icons/ai";
import { VscError } from "react-icons/vsc";
import { Form, Row, Col, FloatingLabel, Button } from "react-bootstrap";
import { LanguageContext } from "../../components/context/language-context";
import CustomizerHeader from "../UI/CustomizerHeader";
const ContactForm = (props) => {
  const [sending, setSending] = useState(false);
  const [emailResponse, setEmailResponse] = useState();
  const lang = useContext(LanguageContext);
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const phoneInputRef = useRef();
  const subjectInputRef = useRef();
  const textAreaInputRef = useRef();
  const adressInputRef = useRef();
  const cityInputRef = useRef();
  const zipInputRef = useRef();
  const formInputRef = useRef();
  const { cartTotals } = props;
  const { items, cartTotal } = useCart();
  const cartPrepare = items.map(
    (item) =>
      ` <tr>
    <td style="line-height: 24px; font-size: 16px; width: 100%; margin: 0; padding: 8px;" align="left" width="100%">${
      item.name
    }${item.color ? item.color.ral : ""}</td>
    <td style="line-height: 24px; font-size: 16px; width: 100%; margin: 0; padding: 8px;" align="left" width="100%">x${
      item.quantity
    }</td>
    <td class="text-right" style="line-height: 24px; font-size: 16px; width: 100%; margin: 0; padding: 8px;" align="right" width="100%">${
      //lang.currencyPrice(item.priceEUR, item.priceSEK, item.priceDKK) +
      lang
        .currencyPrice(
          item.prices
            ? item.prices.find((item) => item.currency === "EUR").amount
            : item.price,
          item.prices
            ? item.prices.find((item) => item.currency === "SEK").amount
            : item.SEK_price,
          item.prices
            ? item.prices.find((item) => item.currency === "DKK").amount
            : item.DKK_price
        )
        .toLocaleString(undefined, {
          maximumFractionDigits: 2,
        }) +
      " " +
      lang.currencySymbol()
    }</td>
  </tr>`
  );

  const submitHandler = (event) => {
    event.preventDefault();
    const tables = `
  <body class="bg-dark" style="outline: 0; width: 100%; min-width: 100%; height: 100%; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; font-family: Helvetica, Arial, sans-serif; line-height: 24px; font-weight: normal; font-size: 16px; -moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box; color: #000000; margin: 0; padding: 0; border-width: 0;" bgcolor="#1a202c">
  <table class="bg-dark body" valign="top" role="presentation" border="0" cellpadding="0" cellspacing="0" style="outline: 0; width: 100%; min-width: 100%; height: 100%; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; font-family: Helvetica, Arial, sans-serif; line-height: 24px; font-weight: normal; font-size: 16px; -moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box; color: #000000; margin: 0; padding: 0; border-width: 0;" bgcolor="#1a202c">
    <tbody>
      <tr>
        <td valign="top" style="line-height: 24px; font-size: 16px; margin: 0;" align="left" bgcolor="#1a202c">
          <table class="container" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;">
            <tbody>
                <tr>
                  <td align="center" style="line-height: 24px; font-size: 16px; margin: 0; padding: 0 16px;">
                    <!--[if (gte mso 9)|(IE)]>
                      <table align="center" role="presentation">
                        <tbody>
                          <tr>
                            <td width="600">
                    <![endif]-->
                    <table align="center" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%; max-width: 600px; margin: 0 auto;">
                      <tbody>
                        <tr>
                          <td style="line-height: 24px; font-size: 16px; margin: 0;" align="left">
                            <table class="p-3" role="presentation" border="0" cellpadding="0" cellspacing="0">
                              <tbody>
                                <tr>
                                  <td style="line-height: 24px; font-size: 16px; margin: 0; padding: 12px;" align="left">
                                    <img class="img-fluid" src="https://designfires.pl/wp-content/uploads/2022/07/designfires.svg" style="height: auto; line-height: 100%; outline: none; text-decoration: none; display: block; max-width: 100%; width: 100%; border-style: none; border-width: 0;" width="100%">
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <table class="card rounded-3xl px-4 py-8 p-lg-10" role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-radius: 24px; border-collapse: separate !important; width: 100%; overflow: hidden; border: 1px solid #e2e8f0;" bgcolor="#ffffff">
                              <tbody>
                                <tr>
                                  <td style="line-height: 24px; font-size: 16px; width: 100%; border-radius: 24px; margin: 0; padding: 40px;" align="left" bgcolor="#ffffff">
                                    <h1 class="text-4xl fw-800" style="padding-top: 0; padding-bottom: 0; font-weight: 800 !important; vertical-align: baseline; font-size: 36px; line-height: 43.2px; margin: 0;" align="left">Thanks for your contact, ${
                                      nameInputRef.current.value
                                    }
                                     </h1>
                                    <table class="s-3 w-full" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;" width="100%">
                                      <tbody>
                                        <tr>
                                          <td style="line-height: 12px; font-size: 12px; width: 100%; height: 12px; margin: 0;" align="left" width="100%" height="12">
                                            &#160;
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <p style="line-height: 24px; font-size: 16px; width: 100%; margin: 0;" align="left">We are happy to welcome You in DesignFires world,where our support doesnt end when You bought fireplace.</p>
                                    <p style="line-height: 24px; font-size: 16px; width: 100%; margin: 0;" align="left">You can count on us always!</p>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <table class="s-6 w-full" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;" width="100%">
                              <tbody>
                                <tr>
                                  <td style="line-height: 24px; font-size: 24px; width: 100%; height: 24px; margin: 0;" align="left" width="100%" height="24">
                                    &#160;
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <table class="card rounded-3xl px-4 py-8 p-lg-10" role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-radius: 24px; border-collapse: separate !important; width: 100%; overflow: hidden; border: 1px solid #e2e8f0;" bgcolor="#ffffff">
                              <tbody>
                                <tr>
                                  <td style="line-height: 24px; font-size: 16px; width: 100%; border-radius: 24px; margin: 0; padding: 40px;" align="left" bgcolor="#ffffff">
                                    <h3 class="text-center" style="padding-top: 0; padding-bottom: 0; font-weight: 500; vertical-align: baseline; font-size: 28px; line-height: 33.6px; margin: 0;" align="center">Your choices from Designfires.com: </h3>
                                    <table class="s-2 w-full" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;" width="100%">
                                      <tbody>
                                        <tr>
                                          <td style="line-height: 8px; font-size: 8px; width: 100%; height: 8px; margin: 0;" align="left" width="100%" height="8">
                                            &#160;
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <table class="p-2 w-full" border="0" cellpadding="0" cellspacing="0" style="width: 100%;" width="100%">
                                      <tbody>
                                      ${cartPrepare.join("")}
                                        <tr>
                                          <td class="fw-700 border-top" style="line-height: 24px; font-size: 16px; border-top-width: 1px !important; border-top-color: #e2e8f0 !important; border-top-style: solid !important; width: 100%; font-weight: 700 !important; margin: 0; padding: 8px;" align="left" width="100%">Total Cost</td>
                                          <td class="fw-700 border-top" style="line-height: 24px; font-size: 16px; border-top-width: 1px !important; border-top-color: #e2e8f0 !important; border-top-style: solid !important; width: 100%; font-weight: 700 !important; margin: 0; padding: 8px;" align="left" width="100%"></td>
                                          <td class="fw-700 text-right border-top" style="line-height: 24px; font-size: 16px; border-top-width: 1px !important; border-top-color: #e2e8f0 !important; border-top-style: solid !important; width: 100%; font-weight: 700 !important; margin: 0; padding: 8px;" align="right" width="100%">${lang
                                            .currencyPrice(
                                              cartTotals.price,
                                              cartTotals.SEK_price,
                                              cartTotals.DKK_price
                                            )
                                            .toLocaleString(undefined, {
                                              maximumFractionDigits: 2,
                                            })} ${lang.currencySymbol()}</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <table class="s-6 w-full" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;" width="100%">
                                      <tbody>
                                        <tr>
                                          <td style="line-height: 24px; font-size: 24px; width: 100%; height: 24px; margin: 0;" align="left" width="100%" height="24">
                                            &#160;
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <table class="hr" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;">
                                      <tbody>
                                        <tr>
                                          <td style="line-height: 24px; font-size: 16px; border-top-width: 1px; border-top-color: #e2e8f0; border-top-style: solid; height: 1px; width: 100%; margin: 0;" align="left">
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <table class="s-6 w-full" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;" width="100%">
                                      <tbody>
                                        <tr>
                                          <td style="line-height: 24px; font-size: 24px; width: 100%; height: 24px; margin: 0;" align="left" width="100%" height="24">
                                            &#160;
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <p style="line-height: 24px; font-size: 16px; width: 100%; margin: 0;" align="left">We will contact with You as soon as possible! </p>
                                    <p style="line-height: 24px; font-size: 16px; width: 100%; margin: 0;" align="left">Thank You for visit us at <a href="https://designfires.com" style="color: #0d6efd;">DesignFires.com</a>.</p>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <table class="s-6 w-full" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;" width="100%">
                              <tbody>
                                <tr>
                                  <td style="line-height: 24px; font-size: 24px; width: 100%; height: 24px; margin: 0;" align="left" width="100%" height="24">
                                    &#160;
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <!--[if (gte mso 9)|(IE)]>
                    </td>
                  </tr>
                </tbody>
              </table>
                    <![endif]-->
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </body>`;
    //console.log(cartHandler);
    setSending(true);

    const emailData = {
      user_name: nameInputRef.current.value,
      user_email: emailInputRef.current.value,
      user_phone: phoneInputRef.current.value,
      user_subject: subjectInputRef.current.value,
      user_textarea: textAreaInputRef.current.value,
      user_adress: adressInputRef.current.value,
      user_city: cityInputRef.current.value,
      user_zip: zipInputRef.current.value,
      user_decorations: tables,
      //user_totalprice: cartHandler.cartPrice + lang.currencySymbol(),
    };
    emailjs
      .send(
        "service_q2uegul",
        "template_test", //"template_2xfql34", //"template_ikf1gyk",
        emailData,
        "iHSdOd-oJFmGSr9Zp"
      )
      .then(
        (result) => {
          //console.log(result.text);
          setEmailResponse(true);
          setSending(false);
        },
        (error) => {
          //console.log(error.text);
          setEmailResponse(false);
          setSending(false);
        }
      );
    //console.log(emailData);
  };
  const handleClick = () => setSending(true);
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {emailResponse === undefined ? (
          <Form ref={formInputRef} onSubmit={submitHandler}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridName">
                <FloatingLabel
                  controlId="floatingNameInput"
                  label="Name"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Enter Name"
                    ref={nameInputRef}
                    name="user_name"
                    required
                  />
                </FloatingLabel>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridEmail">
                <FloatingLabel
                  controlId="floatingEmailInput"
                  label="Email address"
                  className="mb-3 "
                >
                  {" "}
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    ref={emailInputRef}
                    name="user_email"
                    required
                  />
                </FloatingLabel>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridAdress">
                <FloatingLabel
                  controlId="floatingAdressInput"
                  label="Adress"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Enter Adress"
                    ref={adressInputRef}
                    name="user_adress"
                    required
                  />
                </FloatingLabel>
              </Form.Group>
              <Form.Group as={Col} md={3} controlId="formGridCity">
                <FloatingLabel
                  controlId="floatingCityInput"
                  label="City"
                  className="mb-3 "
                >
                  {" "}
                  <Form.Control
                    type="zip"
                    placeholder="Enter City"
                    ref={cityInputRef}
                    name="user_city"
                    required
                  />
                </FloatingLabel>
              </Form.Group>
              <Form.Group as={Col} md={2} controlId="formGridZip">
                <FloatingLabel
                  controlId="floatingZipInput"
                  label="Zip-Code"
                  className="mb-3 "
                >
                  {" "}
                  <Form.Control
                    type="zip"
                    placeholder="Enter Zip Code"
                    ref={zipInputRef}
                    name="user_zip"
                    required
                  />
                </FloatingLabel>
              </Form.Group>
            </Row>

            <Row className="mb-3 ">
              <Form.Group as={Col} controlId="formGridTelephone">
                <FloatingLabel
                  controlId="floatingTelephoneInput"
                  label="Telephone"
                  className="mb-3"
                  name="user_phone"
                  required
                >
                  <Form.Control
                    type="text"
                    placeholder="Enter Telephone"
                    ref={phoneInputRef}
                  />
                </FloatingLabel>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Subject"
                  name="user_subject"
                  className="mb-3"
                >
                  <Form.Select defaultValue="" ref={subjectInputRef}>
                    <option>Select Subject</option>
                    <option>Bio-Ethanol</option>
                    <option>Mystic Steamfire</option>
                    <option>Wood Fireplaces</option>
                    <option>Others</option>
                  </Form.Select>
                </FloatingLabel>
              </Form.Group>
            </Row>
            <Form.Group
              className="mb-3 bg-secondary"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control
                className="p-3 mb-2  "
                as="textarea"
                placeholder="Your questions..."
                rows={2}
                name="user_textarea"
                ref={textAreaInputRef}
              />
            </Form.Group>
            <p className="fw-bold text-white">
              Your personal data are using only for faster calculate shipping
              cost and faster contact with offer!
            </p>
            <Button
              className="float-end"
              variant="info"
              type="submit"
              disabled={sending}
              //onClick={!sending ? handleClick : null}
            >
              {sending ? "Sending..." : "Send"}
            </Button>
            <p className="float-end p-1">
              {emailResponse === undefined ? null : emailResponse ? (
                <AiOutlineCheck size={30} color="green" />
              ) : (
                <VscError size={30} color="red" />
              )}
            </p>
          </Form>
        ) : emailResponse ? (
          <div>
            <CustomizerHeader>
              Message Sended! <br />
              Thank You For Contact Us!{" "}
              <AiOutlineCheck size={30} color="green" />
            </CustomizerHeader>{" "}
          </div>
        ) : (
          <Form ref={formInputRef} onSubmit={submitHandler}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridName">
                <FloatingLabel
                  controlId="floatingNameInput"
                  label="Name"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Enter Name"
                    ref={nameInputRef}
                    name="user_name"
                    required
                  />
                </FloatingLabel>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridEmail">
                <FloatingLabel
                  controlId="floatingEmailInput"
                  label="Email address"
                  className="mb-3 "
                >
                  {" "}
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    ref={emailInputRef}
                    name="user_email"
                    required
                  />
                </FloatingLabel>
              </Form.Group>
            </Row>
            <Row className="mb-3 ">
              <Form.Group as={Col} controlId="formGridTelephone">
                <FloatingLabel
                  controlId="floatingTelephoneInput"
                  label="Telephone"
                  className="mb-3"
                  name="user_phone"
                  required
                >
                  <Form.Control
                    type="text"
                    placeholder="Enter Telephone"
                    ref={phoneInputRef}
                  />
                </FloatingLabel>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Subject"
                  name="user_subject"
                  className="mb-3"
                >
                  <Form.Select defaultValue="" ref={subjectInputRef}>
                    <option>Select Subject</option>
                    <option>Bio-Ethanol</option>
                    <option>Mystic Steamfire</option>
                    <option>Others</option>
                  </Form.Select>
                </FloatingLabel>
              </Form.Group>
            </Row>
            <Form.Group
              className="mb-3 bg-secondary"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control
                className="p-3 mb-2  "
                as="textarea"
                placeholder="Your questions..."
                rows={5}
                name="user_textarea"
                ref={textAreaInputRef}
              />
            </Form.Group>
            <Button
              className="float-end"
              variant="info"
              type="submit"
              disabled={sending}
              //onClick={!sending ? handleClick : null}
            >
              {sending ? "Sending..." : "Send"}
            </Button>
            <p className="float-end p-1">
              {emailResponse === undefined ? null : emailResponse ? (
                <AiOutlineCheck size={30} color="green" />
              ) : (
                <VscError size={30} color="red" />
              )}
            </p>
          </Form>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
export default ContactForm;

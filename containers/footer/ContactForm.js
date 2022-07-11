import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { AiOutlineCheck } from "react-icons/ai";
import { VscError } from "react-icons/vsc";
import { Form, Row, Col, FloatingLabel, Button } from "react-bootstrap";
const ContactForm = (props) => {
  const [sending, setSending] = useState(false);
  const [emailResponse, setEmailResponse] = useState();
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const phoneInputRef = useRef();
  const subjectInputRef = useRef();
  const textAreaInputRef = useRef();
  const formInputRef = useRef();
  const { cartHandler } = props;
  const arrayToString = (array, lines) => {
    let str = "";

    array.forEach((obj) => {
      Object.values(obj).forEach((val, key) => {
        str += val;
        key != lines - 1 ? (str += ",<br/>") : (str += "<br/><br/>");
      });
    });
    return str;
  };
  const submitHandler = (event) => {
    event.preventDefault();
    setSending(true);
    const emailData = {
      user_name: nameInputRef.current.value,
      user_email: emailInputRef.current.value,
      user_phone: phoneInputRef.current.value,
      user_subject: subjectInputRef.current.value,
      user_textarea: textAreaInputRef.current.value,

      user_casing: JSON.stringify(cartHandler.addedCasing, null, "<br/>"),
      user_fireplace: JSON.stringify(cartHandler.addedFireplace, null, "<br/>"),
      user_shs: JSON.stringify(cartHandler.addedShs, null, "<br/>"),
      user_top: JSON.stringify(cartHandler.addedTop, null, "<br/>"),
      user_filling: JSON.stringify(cartHandler.addedFilling, null, "<br/>"),
      user_decorations: arrayToString(cartHandler.addedDecorations, 4),
      user_accessories: arrayToString(cartHandler.addedAccessories, 4),
      user_totalprice: JSON.stringify(cartHandler.cartPrice, null, 0),
    };

    emailjs
      .send(
        "service_vzn306h",
        "template_ikf1gyk",
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
  );
};
export default ContactForm;

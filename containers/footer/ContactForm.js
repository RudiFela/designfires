import { useContext, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { AiOutlineCheck } from "react-icons/ai";
import { VscError } from "react-icons/vsc";
import { Form, Row, Col, FloatingLabel, Button } from "react-bootstrap";
import { LanguageContext } from "../../components/context/language-context";
const ContactForm = (props) => {
  const [sending, setSending] = useState(false);
  const [emailResponse, setEmailResponse] = useState();
  const lang = useContext(LanguageContext);
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const phoneInputRef = useRef();
  const subjectInputRef = useRef();
  const textAreaInputRef = useRef();
  const formInputRef = useRef();
  const { cartHandler } = props;
  const arrayToString = (array, lines) => {
    let str = "";
    //const test = Object.fromEntries(cartHandler.addedDecorations);
    //console.log(test);
    array.forEach((obj) => {
      Object.values(obj).forEach((val, key) => {
        str += val;
        key != lines - 1 ? (str += ",<br/>") : (str += "<br/><br/>");
      });
    });
    return str;
  };
  const splitDecorationsArray = () => {
    const preparedDeco = cartHandler.addedDecorations.map((item) => ({
      name: item.name,
      pcs: "x" + item.count,
      price:
        lang.currencyPrice(item.priceEUR, item.priceSEK, item.priceDKK) +
        lang.currencySymbol(),
    }));
    return arrayToString(preparedDeco, 3);
  };
  const prepareDataToSend = () => {
    let fireplace = `Name: ${cartHandler.addedFireplace.name}"Length:"${cartHandler.addedFireplace.length}"mm"`;
    let casing = `Name: ${cartHandler.addedCasing.name}"Length:"${cartHandler.addedCasing.length}"mm"`;
    let filling = `Fill: ${cartHandler.addedFilling.name}`;
    let shs = `SHS:${cartHandler.addedShs.name}`;
    let top = `TOP:${cartHandler.addedTop.name}`;
    let glass = `Glass:${cartHandler.addedAccessories.glass.color}" Length:${cartHandler.addedAccessories.glass} x:${cartHandler.addedAccessories.glass.pcs}`;
    let holders = `Holders x2 x:${cartHandler.addedAccessories.holder.pcs}`;
  };
  const submitHandler = (event) => {
    event.preventDefault();
    setSending(true);
    let dec = splitDecorationsArray();
    const emailData = {
      user_name: nameInputRef.current.value,
      user_email: emailInputRef.current.value,
      user_phone: phoneInputRef.current.value,
      user_subject: subjectInputRef.current.value,
      user_textarea: textAreaInputRef.current.value,
      user_casing_name: cartHandler.addedCasing.name,
      user_casing_length: cartHandler.addedCasing.length,
      user_casing_price:
        lang.currencyPrice(
          cartHandler.addedCasing.priceEUR,
          cartHandler.addedCasing.priceSEK,
          cartHandler.addedCasing.priceDKK
        ) + lang.currencySymbol(),
      user_casing_pcs:
        cartHandler.addedCasing.pcs === 1 ? cartHandler.addedCasing.pcs : "-",
      //user_fireplace: <p>{cartHandler.addedFireplace.name}Some JSX</p>, //JSON.stringify(cartHandler.addedFireplace, null, "<br/>"),
      user_fireplace_name: cartHandler.addedFireplace.name,
      user_fireplace_length: `${
        cartHandler.addedFireplace.pcs === 1
          ? `${cartHandler.addedFireplace.length}mm/${cartHandler.addedFireplace.info}mm`
          : "-"
      }`,
      user_fireplace_price:
        lang.currencyPrice(
          cartHandler.addedFireplace.priceEUR,
          cartHandler.addedFireplace.priceSEK,
          cartHandler.addedFireplace.priceDKK
        ) + lang.currencySymbol(),
      user_fireplace_pcs: `${
        cartHandler.addedFireplace.pcs === 1
          ? cartHandler.addedFireplace.pcs
          : "-"
      }`,
      user_shs_price:
        lang.currencyPrice(
          cartHandler.addedShs.priceEUR,
          cartHandler.addedShs.priceSEK,
          cartHandler.addedShs.priceDKK
        ) + lang.currencySymbol(),
      user_shs_pcs:
        cartHandler.addedShs.pcs === 1 ? cartHandler.addedShs.pcs : "-",
      // user_shs: JSON.stringify(cartHandler.addedShs, null, "<br/>"),
      user_top_name: cartHandler.addedTop.name,
      user_top_price:
        lang.currencyPrice(
          cartHandler.addedTop.priceEUR,
          cartHandler.addedTop.priceSEK,
          cartHandler.addedTop.priceDKK
        ) + lang.currencySymbol(),
      user_top_pcs:
        cartHandler.addedTop.pcs === 1 ? cartHandler.addedTop.pcs : "-",
      //user_top: JSON.stringify(cartHandler.addedTop, null, "<br/>"),
      user_filling_name: cartHandler.addedFilling.name,
      user_filling_price:
        lang.currencyPrice(
          cartHandler.addedFilling.priceEUR,
          cartHandler.addedFilling.priceSEK,
          cartHandler.addedFilling.priceDKK
        ) + lang.currencySymbol(),
      user_filling_pcs:
        cartHandler.addedFilling.pcs === 1 ? cartHandler.addedFilling.pcs : "-",
      //user_filling: JSON.stringify(cartHandler.addedFilling, null, "<br/>"),
      user_decorations: splitDecorationsArray(),
      user_glass_color:
        cartHandler.addedAccessories.glass.pcs > 0
          ? cartHandler.addedAccessories.glass.color
          : "-",
      user_glass_length: `${cartHandler.addedAccessories.glass.length}mm/200mm/6mm`,
      user_glass_pcs: cartHandler.addedAccessories.glass.pcs,
      user_glass_price:
        lang.currencyPrice(
          cartHandler.addedAccessories.glass.priceEUR,
          cartHandler.addedAccessories.glass.priceSEK,
          cartHandler.addedAccessories.glass.priceDKK
        ) + lang.currencySymbol(),

      user_short_glass_length: `${cartHandler.addedAccessories.glass.short.short_length}mm/200mm/6mm`,
      user_short_glass_pcs: cartHandler.addedAccessories.glass.short.short_pcs,
      user_short_glass_price:
        lang.currencyPrice(
          cartHandler.addedAccessories.glass.short.priceEUR,
          cartHandler.addedAccessories.glass.short.priceSEK,
          cartHandler.addedAccessories.glass.short.priceDKK
        ) + lang.currencySymbol(),
      //user_glass: `Glass:${cartHandler.addedAccessories.glass.color} Length:${cartHandler.addedAccessories.glass.length} x:${cartHandler.addedAccessories.glass.pcs}`,
      //user_holders: `Holders x2 x:${cartHandler.addedAccessories.holders.pcs}`,
      user_holders_pcs: cartHandler.addedAccessories.holders.pcs,
      user_holders_price:
        lang.currencyPrice(
          cartHandler.addedAccessories.holders.priceEUR,
          cartHandler.addedAccessories.holders.priceSEK,
          cartHandler.addedAccessories.holders.priceDKK
        ) + lang.currencySymbol(),
      user_totalprice: cartHandler.cartPrice + lang.currencySymbol(),
    };

    /* emailjs
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
      );*/
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

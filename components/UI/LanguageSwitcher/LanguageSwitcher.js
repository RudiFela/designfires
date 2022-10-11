import { useContext, useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { LanguageContext } from "../../context/language-context";
const english = "/static/images/greatbritain.png";
const denmark = "/static/images/denmark.png";
const sweden = "/static/images/sweden.png";
const europe = "/static/images/europe.png";

const designImage = "/static/images/DanishDesign.png";

const LanguageSwitcher = (props) => {
  const language = useContext(LanguageContext);
  const [lang, setLang] = useState();
  useEffect(() => {
    //console.log(language.language);
    switch (language.language) {
      case "swedish":
        return setLang(
          <Image src={sweden} height={40} width={40} alt="Country Flag" />
        );
      case "danish":
        return onLanguageChange(denmark, "danish");
      default:
        return onLanguageChange(europe, "english");
    }
  }, []);

  const onLanguageChange = (langPhoto, langName) => {
    setLang(
      <Image src={langPhoto} height={40} width={40} alt="Country Flag" />
    );
    //props.setLanguage(langName);
    language.setLanguage(langName);
  };
  return (
    <NavDropdown
      className="text-center bg-primary"
      style={{ borderRadius: 2 }}
      align="end"
      flip="true"
      title={lang}
      id="collasible-nav-dropdown"
    >
      <NavDropdown.Item
        onClick={() => {
          onLanguageChange(europe, "english");
        }}
        //  href="#action/3.1"
        className="text-white text-center fs-5 text fw-normal p-1"
      >
        <motion.div whileHover={{ scale: 1.1 }}>
          {" "}
          <Image src={europe} height={45} width={45} alt="English flag" />
        </motion.div>
      </NavDropdown.Item>
      <NavDropdown.Item
        onClick={() => {
          onLanguageChange(denmark, "danish");
        }}
        //  href="#action/3.2"
        className="text-white text-center fs-5 text fw-normal p-1 "
      >
        <motion.div whileHover={{ scale: 1.1 }}>
          <Image src={denmark} height={45} width={45} alt="DEN flag" />
        </motion.div>
      </NavDropdown.Item>
      <NavDropdown.Item
        onClick={() => {
          onLanguageChange(sweden, "swedish");
        }}
        // href="#action/3.3"
        className="text-white text-center fs-5 p-1"
      >
        <motion.div whileHover={{ scale: 1.1 }}>
          <Image src={sweden} height={45} width={45} alt="SWE flag" />
        </motion.div>
      </NavDropdown.Item>
    </NavDropdown>
  );
};
export default LanguageSwitcher;

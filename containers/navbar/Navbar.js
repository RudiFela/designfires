import { useContext, useState, useEffect } from "react";
import Image from "next/image";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { LanguageContext } from "../../components/context/language-context";
const english = "/static/images/greatbritain.png";
const denmark = "/static/images/denmark.png";
const sweden = "/static/images/sweden.png";
const designImage = "/static/images/DanishDesign.png";
const Navibar = () => {
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
        return onLanguageChange(english, "english");
    }
  }, []);

  const onLanguageChange = (langPhoto, langName) => {
    setLang(
      <Image src={langPhoto} height={40} width={40} alt="Country Flag" />
    );
    //props.setLanguage(langName);
    language.setLanguage(langName);
  };
  /**/
  return (
    <>
      <Navbar
        collapseOnSelect
        expand="xl"
        bg="dark"
        variant="dark"
        className="py-0"
        sticky="top"
      >
        <Container className="py-0 ">
          <Navbar.Brand href="#home" className="w-50">
            <Image
              src="https://designfires.pl/wp-content/uploads/2022/08/designfiresn.png" //"https://designfires.pl/wp-content/uploads/2022/07/designfires.svg"
              //layout="fill"
              //width={376}
              //height={114}
              width={572}
              height={172}
              alt="DesignFires.com LOGO"
              className="navbar-logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            id="responsive-navbar-nav"
            //className="justify-content-end"
            //className="flex-wrap"
          >
            <Nav className="navbar-links fs-6 fw-light">
              <Nav.Link className="text-white text-center" href="#bio">
                Digital DFE Bio-Ehtanol Fireplace PRO
              </Nav.Link>
              <Nav.Link className="text-white text-center" href="#steamfire">
                Mystic SteamFire DFM PRO Fireplace
              </Nav.Link>
              <Nav.Link
                className="text-white text-center"
                href="https://old.designfires.com/gas-fireplace/"
              >
                Gas Fireplace
              </Nav.Link>
              <Nav.Link
                className="text-white text-center"
                href="https://old.designfires.com/traepejse/"
              >
                Wood Fireplace
              </Nav.Link>
              <Nav.Link
                className="text-white text-center"
                href="https://old.designfires.com/outdoorgarden/"
              >
                Outdoor Fireplace
              </Nav.Link>
              <Nav.Link className="text-white text-center" href="#customize">
                Customize
              </Nav.Link>

              <NavDropdown
                className="text-center"
                align="end"
                flip="true"
                title={lang}
                id="collasible-nav-dropdown"
              >
                <NavDropdown.Item
                  onClick={() => {
                    onLanguageChange(english, "english");
                  }}
                  //  href="#action/3.1"
                  className="text-white text-center fs-5 text fw-normal p-1"
                >
                  <Image
                    src={english}
                    height={45}
                    width={45}
                    alt="English flag"
                  />
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => {
                    onLanguageChange(denmark, "danish");
                  }}
                  //  href="#action/3.2"
                  className="text-white text-center fs-5 text fw-normal p-1 "
                >
                  <Image src={denmark} height={45} width={45} alt="DEN flag" />
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => {
                    onLanguageChange(sweden, "swedish");
                  }}
                  // href="#action/3.3"
                  className="text-white text-center fs-5 p-1"
                >
                  <Image src={sweden} height={45} width={45} alt="SWE flag" />
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>{" "}
        </Container>
      </Navbar>
    </>
  );
};
export default Navibar;

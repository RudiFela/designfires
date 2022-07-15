import { useContext, useState } from "react";
import Image from "next/image";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { LanguageContext } from "../../components/context/language-context";
const english =
  "https://designfires.pl/wp-content/uploads/2022/07/greatbritain.png";
const denmark = "https://designfires.pl/wp-content/uploads/2022/07/denmark.png";
const sweden = "https://designfires.pl/wp-content/uploads/2022/07/sweden.png";
const Navibar = () => {
  const language = useContext(LanguageContext);
  const [lang, setLang] = useState(
    <Image src={english} height={40} width={40} alt="USA flag" priority />
  );
  const onLanguageChange = (lang, langName) => {
    setLang(<Image src={lang} height={40} width={40} alt="Country Flag" />);
    //props.setLanguage(langName);
    language.setLanguage(langName);
  };
  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
        className="py-0"
        sticky="top"
      >
        <Container className="py-0 ">
          <Navbar.Brand href="#home">
            <Image
              src="https://designfires.pl/wp-content/uploads/2022/07/designfires.svg"
              width={250}
              alt="DesignFires.com LOGO"
              height={156}
              className="navbar-logo"
              priority
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="justify-content-end"
          >
            <Nav className="navbar-links">
              <Nav.Link className="text-white text-center" href="#bio">
                Digital DFE Bio-Ehtanol Fireplace PRO
              </Nav.Link>
              <Nav.Link className="text-white text-center" href="#steamfire">
                Mystic SteamFire DFM PRO Fireplace
              </Nav.Link>
              <Nav.Link
                className="text-white text-center"
                href="https://designfires.com/gas-fireplace/"
              >
                Gas Fireplace
              </Nav.Link>
              <Nav.Link
                className="text-white text-center"
                href="https://designfires.com/traepejse/"
              >
                Wood Fireplace
              </Nav.Link>
              <Nav.Link
                className="text-white text-center"
                href="https://designfires.com/outdoorgarden/"
              >
                Outdoor Fireplace
              </Nav.Link>
              <Nav.Link className="text-white text-center" href="#customize">
                Customize
              </Nav.Link>

              <NavDropdown
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
                    priority
                  />
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => {
                    onLanguageChange(denmark, "danish");
                  }}
                  //  href="#action/3.2"
                  className="text-white text-center fs-5 text fw-normal p-1 "
                >
                  <Image
                    src={denmark}
                    height={45}
                    width={45}
                    alt="DEN flag"
                    priority
                  />
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => {
                    onLanguageChange(sweden, "swedish");
                  }}
                  // href="#action/3.3"
                  className="text-white fs-5 p-1"
                >
                  <Image
                    src={sweden}
                    height={45}
                    width={45}
                    alt="SWE flag"
                    priority
                  />
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
export default Navibar;

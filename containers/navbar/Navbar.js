import { useContext, useState } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { LanguageContext } from "../../components/context/language-context";
const english =
  "https://designfires.pl/wp-content/uploads/2022/07/greatbritain.png";
const denmark = "https://designfires.pl/wp-content/uploads/2022/07/denmark.png";
const sweden = "https://designfires.pl/wp-content/uploads/2022/07/sweden.png";
const Navibar = () => {
  const language = useContext(LanguageContext);
  const [lang, setLang] = useState(
    <img src={english} height="30" alt="USA flag" />
  );
  const onLanguageChange = (lang, langName) => {
    setLang(<img src={lang} height="30" alt="Country Flag" />);
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
            <img
              src="https://designfires.pl/wp-content/uploads/2022/07/designfires.svg"
              className="navbar-logo"
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
                  className="text-white fs-5 text fw-normal"
                >
                  ENG <img src={english} height="35" alt="USA flag" />
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => {
                    onLanguageChange(denmark, "danish");
                  }}
                  //  href="#action/3.2"
                  className="text-white fs-5 text fw-normal"
                >
                  DEN <img src={denmark} height="35" alt="USA flag" />
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => {
                    onLanguageChange(sweden, "swedish");
                  }}
                  // href="#action/3.3"
                  className="text-white fs-5 text fw-normal"
                >
                  SWE <img src={sweden} height="35" alt="USA flag" />
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

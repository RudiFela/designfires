import { useState } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";

const english =
  "http://designfires.pl/wp-content/uploads/2022/07/greatbritain.png";
const denmark = "http://designfires.pl/wp-content/uploads/2022/07/denmark.png";
const sweden = "http://designfires.pl/wp-content/uploads/2022/07/sweden.png";
const Navibar = () => {
  const [language, setLanguage] = useState(
    <img src={english} height="30" alt="USA flag" />
  );
  const onLanguageChange = (lang) => {
    setLanguage(<img src={lang} height="30" alt="USA flag" />);
  };
  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
        className="py-0"
      >
        <Container className="py-0">
          <Navbar.Brand href="#home">
            <img
              src="http://designfires.pl/wp-content/uploads/2022/06/logo.svg"
              className="navbar-logo"
            ></img>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="justify-content-end"
          >
            <Nav className="navbar-links">
              <Nav.Link className="text-white " href="#home">
                Home
              </Nav.Link>
              <Nav.Link className="text-white" href="#bio">
                Bio-Ehtanol
              </Nav.Link>
              <Nav.Link className="text-white" href="#steamfire">
                Mystic SteamFire
              </Nav.Link>
              <Nav.Link className="text-white" href="#projects">
                Our Projects
              </Nav.Link>
              <Nav.Link className="text-white" href="#contact">
                Contact
              </Nav.Link>
              <NavDropdown
                align="end"
                flip="true"
                title={language}
                id="collasible-nav-dropdown"
              >
                <NavDropdown.Item
                  onClick={() => {
                    onLanguageChange(english);
                  }}
                  href="#action/3.1"
                  className="text-white fs-5 text fw-normal"
                >
                  ENG <img src={english} height="35" alt="USA flag" />
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => {
                    onLanguageChange(denmark);
                  }}
                  href="#action/3.2"
                  className="text-white fs-5 text fw-normal"
                >
                  DEN <img src={denmark} height="35" alt="USA flag" />
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => {
                    onLanguageChange(sweden);
                  }}
                  href="#action/3.3"
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

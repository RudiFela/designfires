import PhotosGrid from "../PhotosGrid.js/PhotosGrid";
import { Row, Col } from "react-bootstrap";
import AboutSection from "../AboutSection/AboutSection";
import Advantage from "../Advantage/Advantage";

const Ethanol = (props) => {
  const title = "Digital Bio-Ethanol Fireplace (DFE)";
  const listItems = [
    "Most beautiful flame pictures on the market",
    "Longest fire / Widest fire length on the market, (50mm more fire on all our models)",
    "20 hours burning time (largest standard Ethanol Fuel tank on the market)",
    "Starts fastest of all automatic ethanol fireplaces on the market, starting as soon as you press the start button",
    "Remote Control is standard",
    "Is very operationally safe and simple to service, best on the market",
    "It can be built in anywhere and is safe and easy to use",
    "The best choice and most for your money if you want real fire and cosiness in your apartment or house",
  ];
  const aboutParagraph =
    "DFE provides cosiness & warmth in a old open fireplace that often looks very boring in private houses or in public environments.You can design and get the style and look you want, as standard. We make your fireplace, according to your tastes and dreams";
  const paragraphs = [
    "It can be made in length from DFE500mm, DFE700mm, DFE1000mm, DFE1200mm and not standart up to DFE2400mm",
    " We can build around it for you in hand made Steel Casing from Long: 560mm 760mm 1060mm 1260mm High: 500mm Deep: 350mm only. With openings on all sides or only 1 side or 2 or 3 sides open or in concrete, 100% according to your needs",
    "You decide for yourself the decoration from the large selection of luxury hand made Accessories",
  ];

  const advantageItemsLeft = [
    "High safety, Thanks to a Digital Fireplace with many safety sensor and electronic refueling. (Many accidents happen when refueling the Ethanol fireplaces).",
    "Automatic Ethanol Fuel pump built-in, which stops automatic when the Ethanol tank is full, it makes it 100% safe to refuel, and very easy to refuel, as there is only a silicone hose in between the DFE and the Ethanol can",
    "Beautiful real hot orange fire, that is alive and provides just as much heat as a real Wood stove",
    "It will provides from 3.6kW in heating the DFE500. or 5.76kW DFE700. or 8.64kW DFE1000. or 10.08kW DFE1200. to the wild 21,06kW in the DFE2400",
    "Market's Largest Ethanol FuelTank as standard, that provides up to over 20 hours of burning time. Additional we can make the Ethanol Fueltank as big as you wish",
    "DFE burns clean and gives a real sound of flames while the Bio-Ethanol is burning, as we have the market's best quality Bio-Ethanol Fuel on the market. and we will gladly send it to you",
  ];
  const advantageItemsRight = [
    "Voice info from the Fireplace with info about when to refuel, or message about what the fireplace does or need from you",
    "Child safety. with children lock",
    "Cheap to install. Can be built in anywhere, you want a fireplace indoors. requires only 220V",
    "You do not have to spend money on a chimney. or gas system as bottles, pipes, and cabinet. It will save you more than DFE costs you in purchasing",
    "All our fireplaces are tested and packed to the highest standard, so we know they work and come to you without, you having to spend time on problems.Read the manual and then it plug and play",
    "It can be controlled via SHS (smart home system) (Optional) works on all control systems such as KNX",
    "Best customer support on the market, We help you all the way, even after warranty has expired",
  ];
  return (
    <div id="bio">
      <Row
        className=" about-wrapper justify-content-around flex-wrap-reverse"
        xs="auto"
      >
        <Col className="align-self-center mt-3">
          <PhotosGrid
            //image1="https://designfires.pl/wp-content/uploads/2022/06/etanol1.jpg"
            image1="https://designfires.pl/wp-content/uploads/2022/07/Ethanol1-2.png"
            image2="https://designfires.pl/wp-content/uploads/2022/07/Ethanol2-2.png"
            image3="https://designfires.pl/wp-content/uploads/2022/07/Ethanol3-2.png"
            image8="https://designfires.pl/wp-content/uploads/2022/07/Ethanol4-2.png"
            image5="https://designfires.pl/wp-content/uploads/2022/07/Ethanol5-2.png"
            image6="https://designfires.pl/wp-content/uploads/2022/07/Ethanol6-2.png"
            image7="https://designfires.pl/wp-content/uploads/2022/07/Ethanol7-2.png"
            image4="https://designfires.pl/wp-content/uploads/2022/07/Ethanol8-2.png"
            image9="https://designfires.pl/wp-content/uploads/2022/07/Ethanol9-2.png"
            image10="https://designfires.pl/wp-content/uploads/2022/07/Ethanol10-2.png"
          />
        </Col>
        <Col>
          <AboutSection
            title={title}
            listItem1={listItems[0]}
            listItem2={listItems[1]}
            listItem3={listItems[2]}
            listItem4={listItems[3]}
            listItem5={listItems[4]}
            listItem={listItems}
            paragraph={paragraphs}
            price={props.price}
            aboutParagraph={aboutParagraph}
          />
        </Col>
      </Row>
      <div className="item3 mt-4">
        <Advantage
          image="https://designfires.pl/wp-content/uploads/2022/06/Rectangle4.png"
          shortName={"DFE"}
          itemsLeft={advantageItemsLeft}
          itemsRight={advantageItemsRight}
        />
      </div>
    </div>
  );
};
export default Ethanol;
/*<div id="bio">
      <div className="flex-container">
        <div className="item1">
          <PhotosGrid
            image1="https://designfires.pl/wp-content/uploads/2022/06/etanol1.jpg"
            image2="https://designfires.pl/wp-content/uploads/2022/06/etanol2.jpg"
            image3="https://designfires.pl/wp-content/uploads/2022/06/etanol3.jpg"
            image4="https://designfires.pl/wp-content/uploads/2022/06/etanol4.jpg"
            image5="https://designfires.pl/wp-content/uploads/2022/06/etanol5.jpeg"
            image6="https://designfires.pl/wp-content/uploads/2022/06/etanol6.jpg"
          />
        </div>
        <div className="item2">
          <AboutSection
            title={title}
            listItem1={listItems[0]}
            listItem2={listItems[1]}
            listItem3={listItems[2]}
            listItem4={listItems[3]}
            listItem5={listItems[4]}
            listItem={listItems}
            paragraph={paragraphs}
            price={props.price}
            aboutParagraph={aboutParagraph}
          />
        </div>
      </div>
      <div className="item3">
        <Advantage
          image="https://designfires.pl/wp-content/uploads/2022/06/Rectangle4.png"
          shortName={"DFE"}
          itemsLeft={advantageItemsLeft}
          itemsRight={advantageItemsRight}
        />
      </div>
    </div>*/

import PhotosGrid from "../PhotosGrid.js/PhotosGrid";
import { Row, Col, Container } from "react-bootstrap";
import AboutSection from "../AboutSection/AboutSection";
import Advantage from "../Advantage/Advantage";
import Image from "next/image";
import PhotoCard from "../PhotoCard/PhotoCard";

const Ethanol = (props) => {
  const title = "Digital Bio-Ethanol Fireplace PRO(DFE)";
  const listItems = [
    "Most realistic flames on the market.",
    "Highest flame on the market.",
    "Longest flame width on the market(50mm longer line of fire on all our models).",
    "20 hours burning time (largest standard Ethanol Fuel tank on the market).",
    "Starts fastest of all automatic ethanol fireplaces on the market, starting as soon as you press the start button.",
    "Remote Control is standard.",
    "Is very operationally safe and simple to service, best on the market.",
    "It can be built in anywhere and is safe and easy to use.",
    "The best choice and most for your money if you want real fire and cosiness in your apartment or house.",
  ];
  const aboutParagraph =
    "Install a DFE in your old open fireplace to create a cozy and warm feeling with no smoke.You can design and get the style and look you want, as standard. We make your fireplace, according to your tastes and dreams";
  const paragraphs = [
    "It can be made in length from DFE500mm, DFE700mm, DFE1000mm, DFE1200mm and not standart up to DFE2400mm",
    " We can build fireplaces to meet 100% of your needs, in concrete or handmade steel casings in lengths from 560mm, 760mm, 1060mm, and 1260mm, with heights of 500mm, and depth of 350mm (only), with openings on all sides or 1-3 sides.",
    "You decide for yourself the decoration from the large selection of luxury hand made Accessories",
  ];

  const advantageItemsLeft = [
    "High safety thanks to a digitally controlled pump with safety sensors. Superior and safer design than standard hand filled ethanol fireplaces",
    "Beautiful real hot orange fire, that is alive and provides just as much heat as a real Wood stove",
    "High level of heat output:DFE500 = 3.6kW, DFE700 = 5.76kW, DFE1000 = 8.64kW,DFE1200 = 10.08kW and DFE2400 = 21.06kW",
    "Market's Largest Ethanol FuelTank as standard, that provides up to over 20 hours of burning time. We can make ethanol fuel tanks to any size you need",
    "DFE bio-ethanol fuel burns clean and makes the sound of real flames. We also sell the market's best quality bio-ethanol fuel",
    "Child lock",
  ];
  const advantageItemsRight = [
    "Fireplaces provade voice info about when to refual and messages about any service nejds",

    "Cheap to install. Can be built anywhere you want a fireplace indoors. Requires only 220V",
    "You do not have to spend money on a chimney or gas system as bottles, pipes, and cabinet. It will save you more than DFE costs you in purchasing",
    "All our fireplaces are tested and packed to the highest standard, so we know they work and come to you without you having to spend time on problems.Read the manual and then plug and play",
    "It can be controlled via SHS (smart home system) (Optional) and works on all control systems such as KNX",
    "Best customer support on the market. We help you all the way, even after warranty has expired",
  ];
  return (
    <div id="bio" className="my-4">
      <Row className=" flex-wrap-reverse" xs={1} md={1} lg={2} xl={2}>
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

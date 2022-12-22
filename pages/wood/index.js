import { useEffect, useContext } from "react";
import Navibar from "../../containers/navbar/Navbar";
import PhotosGrid from "../../components/PhotosGrid.js/PhotosGrid";
import AboutSection from "../../components/AboutSection/AboutSection";
import SSRProvider from "react-bootstrap/SSRProvider";
import axios from "axios";
import Footer from "../../containers/footer/Footer";
import { Col, Row, Figure, Button, Badge } from "react-bootstrap";
import WoodCustomizer from "../../components/WoodCustomizer/WoodCustomizer";
import { LanguageContext } from "../../components/context/language-context";
const Wood = (props) => {
  const { language } = useContext(LanguageContext);

  const title = "Wood Fireplace";
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

  return (
    <div className="main">
      <Navibar />

      <WoodCustomizer
        decorations={props.decorations}
        fireplace={props.woodFireplaces}
      />
      <Footer />
    </div>
  );
};
export default Wood;
export async function getStaticProps(context) {
  const crud = {
    auth: {
      username: "ck_b143b31c7842e4a628279fe7b097980c311f08d5",
      password: "cs_b2d20befae8f292ec5e96fd4052f85c40ee7480e",
    },
  };
  const decoURL =
    "https://designfires.pl/wp-json/wc/v3/products?category=20&per_page=20&orderby=price&order=desc";
  const woodURL =
    "https://designfires.pl/wp-json/wc/v3/products?category=31&per_page=50";
  const accessoriesURL =
    "https://designfires.pl/wp-json/wc/v3/products?category=21";
  const fireplacesURL =
    "https://designfires.pl/wp-json/wc/v3/products?category=26";
  const boxesUrl = "https://designfires.pl/wp-json/wc/v3/products?category=30";
  const fuelUrl = "https://designfires.pl/wp-json/wc/v3/products?category=29";
  // ck ck_b143b31c7842e4a628279fe7b097980c311f08d5
  // cs cs_b2d20befae8f292ec5e96fd4052f85c40ee7480e

  const decorations = await axios.get(decoURL, crud);
  const woodFetch = await axios.get(woodURL, crud);

  // console.log(fireplacess);
  const [deco, wood] = await Promise.all([decorations.data, woodFetch.data]);
  //let d;
  //addVariants(cases, crud).then((res) => console.log(res));
  // console.log(d);

  // const casings = await addVariants(casingFetch.data, crud);
  //const accessories = await addVariants(cases, crud);
  //const test = JSON.parse(accessories);
  //console.log(cases[0].variations);
  /* const repos = await axios.get(
    `https://designfires.pl/wp-json/wc/v3/products/${cases[0].id}/variations`,
    crud
  );
  console.log(repos.data);*/
  // console.log(addVariants(cases, crud));
  //console.log(cases);
  //const fireplacess = await addVariants(fireplaceFetch.data, crud);

  return {
    props: {
      decorations: deco,
      woodFireplaces: wood,
      // language: LanguageChecker(),
      //test: accessories,
    },
    revalidate: 3600,
  };
}
/*

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
      </div>

      */

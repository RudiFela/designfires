import PhotosGrid from "../PhotosGrid.js/PhotosGrid";
import AboutSection from "../AboutSection/AboutSection";
import Advantage from "../Advantage/Advantage";

const Mystic = (props) => {
  const title = "Mystic SteamFire Pro (DFM)";
  const listItems = [
    "The best illusion of fire from all angles on the market",
    "Longest Fire / Widest Fire length on the market in one device",
    "Longest operating time, can run 24/7 up to 1 year, before service",
    "Very operationally safe and simple to service, best on the market",
    "Can be built in anywhere and is safe and easy to use",
    "Can be naked fire or with ceramic wood on the same device",
    "The best choice and most for your money, if you want coziness and warmth, without it getting hot in your apartment or house",
    "SHS and Remote Control is standard",
  ];
  const aboutParagraph =
    "DesignFires is the market leader in building professional water vapor fireplaces SteamFire. Mystic SteamFire is an illusion of fire, made with cold water steam and LED light + a little warm and a small fan. You can design and get the style and look you want, as standard we make your fireplace, according to your tastes and dreams.";
  const paragraphs = [
    "Can be made in length from 500mm, 700mm, 1000mm,1200mm, 1500mm up to 3500mm, we can build around it for you in hand made Steel Casing With openings on all sides or only 1 side or 2 or 3 sides open or in concrete, 100% according to your needs. You decide for yourself the decoration from the large selection of luxury hand made Accessories.",
    "Mystic SteamFire can even self tank water from a can, or a water pipe, so you can spend your time on other things than getting water on your fireplace.",
    "Since water does not cost as much money as Wood and Gas or Ethanol and is used to put out fires, it is completely safe and very economical and environmentally friendly. It is even good for the indoor climate with water vapors, which in modern houses is too dry in Scandinavia.",
    "All it needs is water and 220V electricity, no extra supply air or chimney is needed. Mystic SteamFire can provide coziness in a fire place that often looks very boring in public environments or in private houses.",
  ];
  const price = 3006;

  const advantageItemsLeft = [
    "Cheap to use as it runs on water",
    "Does not gives heat",
    "The water vapor is good for within the house climate and us humans. (As the air is often too dry in Scandinavia, especially in winter)",
    "100% Fireproof",
    "100% Children safe",
    "Can be built in anywhere you want the illusion of fireplace indoor",
    "Can automatic refuel itself from a extern water tank or a pressure water pipe in the house",
    "Mystic SteamFire is standard 500-3000mm long (250mm wide and 225mm high)",
  ];
  const advantageItemsRight = [
    "Remote control with display",
    "Display with control",
    "SHS (smart home system) works on all control systems such as example KNX",
    "3 level on the flame",
    "Best customer support on the market, we help you all the way, even after warranty has expired",
    "Sounds with info about example water filling or faults to be made example sensor cleaning",
    "Fireplace sound",
    ,
    "All our fireplaces are tested and packed to the highest standard, so we know they work and come to you without, you having to spend time on problems.Read the manual and then it plug and play",
  ];
  return (
    <div id="steamfire">
      <div className="flex-container">
        <div className="item1">
          <PhotosGrid
            image1="https://designfires.pl/wp-content/uploads/2022/06/mystic1.jpg"
            image2="https://designfires.pl/wp-content/uploads/2022/06/mystic2.jpg"
            image3="https://designfires.pl/wp-content/uploads/2022/06/mystic3.jpg"
            image4="https://designfires.pl/wp-content/uploads/2022/06/mystic4.jpg"
            image5="https://designfires.pl/wp-content/uploads/2022/06/mystic5.jpg"
            image6="https://designfires.pl/wp-content/uploads/2022/06/mystic6.jpg"
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
          image="https://designfires.pl/wp-content/uploads/2022/06/mysticadvantage.jpg"
          shortName="DFM"
          itemsLeft={advantageItemsLeft}
          itemsRight={advantageItemsRight}
        />
      </div>
    </div>
  );
};
export default Mystic;

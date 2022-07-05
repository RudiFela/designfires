import PhotosGrid from "../PhotosGrid.js/PhotosGrid";
import AboutSection from "../AboutSection/AboutSection";
import Advantage from "../Advantage/Advantage";

const Mystic = () => {
  const title = "Mystic SteamFire Pro (DFM)";
  const listItems = [
    "The best illusion of fire from all angles on the market",
    "Longest Fire / Widest Fire length on the market in one device",
    "Longest operating time, can run 24/7 up to 1 year, before service",
    "Very operationally safe and simple to service, Best on the market",
    "Can be built in anywhere and is safe and easy to use",
    "Can be naked fire or with ceramic wood on the same device",
    "The best choice and most for your money, If you want coziness and warmth, without it getting hot in your apartment or house",
    "SHS and Remote Control is standard",
  ];
  const paragraphs = [
    "DesignFires is the market leader in building professional water vapor fireplaces SteamFire. Mystic SteamFire is an illusion of fire, made with cold water steam and LED light + a little warm and a small fan. You can design and get the style and look you want, as standard we make your fireplace, according to your tastes and dreams.",
    "Can be made in length from 500mm, 700mm, 1000mm,1200mm, 1500mm up to 3500mm, We can build around it for you in hand made Steel Casing With openings on all sides or only 1 side or 2 or 3 sides open or in concrete, 100% according to your needs. You decide for yourself the decoration from the large selection of luxury hand made Accessories.",
    "Mystic SteamFire can even self tank water from a can, or a water pipe, so you can spend your time on other things than getting water on your fireplace.",
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
    "Best customer support on the market, We help you all the way, even after warranty has expired",
    "Sounds with info about example water filling or faults to be made example sensor cleaning",
    "Fireplace sound",
  ];
  return (
    <div id="steamfire">
      <div className="flex-container">
        <div className="item1">
          <PhotosGrid
            image1="http://designfires.pl/wp-content/uploads/2022/06/mystic1.jpg"
            image2="http://designfires.pl/wp-content/uploads/2022/06/mystic2.jpg"
            image3="http://designfires.pl/wp-content/uploads/2022/06/mystic3.jpg"
            image4="http://designfires.pl/wp-content/uploads/2022/06/mystic4.jpg"
            image5="http://designfires.pl/wp-content/uploads/2022/06/mystic5.jpg"
            image6="http://designfires.pl/wp-content/uploads/2022/06/mystic6.jpg"
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
            price={price}
          />
        </div>
      </div>
      <div className="item3">
        <Advantage
          image="http://designfires.pl/wp-content/uploads/2022/06/mysticadvantage.jpg"
          shortName="DFM"
          itemsLeft={advantageItemsLeft}
          itemsRight={advantageItemsRight}
        />
      </div>
    </div>
  );
};
export default Mystic;

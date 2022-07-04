import PhotosGrid from "../PhotosGrid.js/PhotosGrid";
import AboutSection from "../AboutSection/AboutSection";
import Advantage from "../Advantage/Advantage";

const Mystic = () => {
  const title = "Mystic SteamFire (DFM)";
  const listItems = [
    "Need only Water and 220V electricity,",
    "High safety,",
    "Can even self tank water from a water pipe or just a can,",
    "You can design and get the style and look you want,",
    "Good for the indoor climate,",
  ];
  const paragraph =
    "Is an illusion of fire, made with cold water steam and LED light + a little warm and a small fan.Since water does not cost as much money as Wood and Gas or Ethanol and is used to put out fires, it is completely safe and very economical and environmentally friendly";
  const price = 3000;
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
            paragraph={paragraph}
            price={price}
          />
        </div>
      </div>
      <div className="item3">
        <Advantage
          image="http://designfires.pl/wp-content/uploads/2022/06/mysticadvantage.jpg"
          shortName="DFM"
        />
      </div>
    </div>
  );
};
export default Mystic;

import PhotosGrid from "../PhotosGrid.js/PhotosGrid";
import AboutSection from "../AboutSection/AboutSection";
import Advantage from "../Advantage/Advantage";

const Ethanol = () => {
  const title = "Bio-Ethanol Fireplace(DFE)";
  const listItems = [
    "One of best on the market,",
    "High safety,",
    "You can design and get the style and look you want,",
    "Beautiful real hot orange fire, that is alive and provides just as much heat as a real wood stove,",
    "Burns clean and does not smell,",
  ];
  const paragraph =
    "DFE provides cosiness & warmth in a fire place that often looks very boring in private houses or in public environments. It can be built in anywhere and is safe and easy to use. You do not have to spend money on a chimney.";
  const price = 2000;
  return (
    <div id="bio">
      <div className="flex-container">
        <div className="item1">
          <PhotosGrid
            image1="http://designfires.pl/wp-content/uploads/2022/06/etanol1.jpg"
            image2="http://designfires.pl/wp-content/uploads/2022/06/etanol2.jpg"
            image3="http://designfires.pl/wp-content/uploads/2022/06/etanol3.jpg"
            image4="http://designfires.pl/wp-content/uploads/2022/06/etanol4.jpg"
            image5="http://designfires.pl/wp-content/uploads/2022/06/etanol5.jpeg"
            image6="http://designfires.pl/wp-content/uploads/2022/06/etanol6.jpg"
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
          image="http://designfires.pl/wp-content/uploads/2022/06/Rectangle4.png"
          shortName={"DFE"}
        />
      </div>
    </div>
  );
};
export default Ethanol;

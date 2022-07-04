import AboutSection from "../AboutSection/AboutSection";
import Advantage from "../Advantage/Advantage";
import PhotosGrid from "../PhotosGrid.js/PhotosGrid";

const Section = () => {
  return (
    <div>
      <div className="flex-container">
        <div className="item1">
          <PhotosGrid />
        </div>
        <div className="item2">
          <AboutSection />
        </div>
      </div>
      <div className="item3">
        <Advantage />
      </div>
    </div>
  );
};
export default Section;

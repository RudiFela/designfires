import PhotoCard from "../PhotoCard/PhotoCard";

const PhotosGrid = (props) => {
  return (
    <>
      <div className="cardbox">
        <div className="photocard-container">
          <PhotoCard image={props.image1} imagebig={props.image1} />
          <PhotoCard image={props.image2} imagebig={props.image2} />
          <PhotoCard image={props.image3} imagebig={props.image3} />
        </div>
        <div className="photocard-container-1">
          <PhotoCard image={props.image4} imagebig={props.image4} />
          <PhotoCard image={props.image5} imagebig={props.image5} />
          <PhotoCard image={props.image6} imagebig={props.image6} />
        </div>
      </div>
    </>
  );
};
export default PhotosGrid;

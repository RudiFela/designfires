import Image from "next/image";
const PhotoCard = (props) => {
  //return <div className="photo-card">{props.children}</div>;

  return (
    <div className="photo">
      <Image
        className="photo-image"
        alt="photocard-picture"
        src={props.image}
        width={300}
        height={200}
      />
    </div>
  );
};
export default PhotoCard;
// <img src={props.image} />

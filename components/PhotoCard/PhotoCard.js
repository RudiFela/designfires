const PhotoCard = (props) => {
  //return <div className="photo-card">{props.children}</div>;

  return (
    <div className="photo">
      <img src={props.image} />
    </div>
  );
};
export default PhotoCard;

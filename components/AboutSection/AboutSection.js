const AboutSection = (props) => {
  const list = props.listItem.map((item) => {
    return <li>{item}</li>;
  });
  const paragraphs = props.paragraph.map((item) => {
    return <p>{item}</p>;
  });
  return (
    <div className="about-section">
      <h2>{props.title}</h2>
      <ul>{list}</ul>

      {paragraphs}
      <h3>from: {props.price}€</h3>
      <h3></h3>
    </div>
  );
};
export default AboutSection;

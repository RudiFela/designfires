import { Accordion } from "react-bootstrap";
const AboutSection = (props) => {
  const list = props.listItem.map((item) => {
    return <li key={Math.random()}>{item}</li>;
  });
  const paragraphs = props.paragraph.map((item) => {
    return <p key={Math.random()}>{item}</p>;
  });
  return (
    <div className="about-section">
      <h2>{props.title}</h2>
      <ul>{list}</ul>
      <p>{props.aboutParagraph}</p>
      <Accordion color="success" className="mt-3">
        <Accordion.Item className="bg-primary text-white" eventKey="0">
          <Accordion.Header className="bg-primary text-white text-center p-0 ">
            Read More
          </Accordion.Header>
          <Accordion.Body>{paragraphs}</Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <h3>from: {props.price}€</h3>
      <h3></h3>
    </div>
  );
};
export default AboutSection;

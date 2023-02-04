import Navibar from "../../containers/navbar/Navbar";
import SSRProvider from "react-bootstrap/SSRProvider";
import axios from "axios";
import Footer from "../../containers/footer/Footer";
import WoodCustomizer from "../../components/WoodCustomizer/WoodCustomizer";
import * as Const from "../../graphql/woodFireplaces/const";
const Wood = (props) => {
  return (
    <SSRProvider>
      <div className="main">
        <Navibar />

        <WoodCustomizer
          decorations={props.decorations}
          fireplace={props.woodFireplaces}
        />
        <Footer />
      </div>
    </SSRProvider>
  );
};
export default Wood;
export async function getStaticProps(context) {
  const queryResult = await axios.post(Const.GRAPHQL, {
    query: Const.GET_WOOD_FIREPLACES,
  });
  const result = queryResult.data.data.products.nodes;

  return {
    props: {
      woodFireplaces: result,
    },
    revalidate: 3600,
  };
}
/*

 <div id="bio" className="my-4">
        <Row className=" flex-wrap-reverse" xs={1} md={1} lg={2} xl={2}>
          <Col className="align-self-center mt-3">
            <PhotosGrid
              //image1="https://designfires.pl/wp-content/uploads/2022/06/etanol1.jpg"
              image1="https://designfires.pl/wp-content/uploads/2022/07/Ethanol1-2.png"
              image2="https://designfires.pl/wp-content/uploads/2022/07/Ethanol2-2.png"
              image3="https://designfires.pl/wp-content/uploads/2022/07/Ethanol3-2.png"
              image8="https://designfires.pl/wp-content/uploads/2022/07/Ethanol4-2.png"
              image5="https://designfires.pl/wp-content/uploads/2022/07/Ethanol5-2.png"
              image6="https://designfires.pl/wp-content/uploads/2022/07/Ethanol6-2.png"
              image7="https://designfires.pl/wp-content/uploads/2022/07/Ethanol7-2.png"
              image4="https://designfires.pl/wp-content/uploads/2022/07/Ethanol8-2.png"
              image9="https://designfires.pl/wp-content/uploads/2022/07/Ethanol9-2.png"
              image10="https://designfires.pl/wp-content/uploads/2022/07/Ethanol10-2.png"
            />
          </Col>
          <Col>
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
          </Col>
        </Row>
      </div>

      */

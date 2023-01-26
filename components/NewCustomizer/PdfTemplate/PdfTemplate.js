import React from "react";
import TemplateTable from "./TemplateTable";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
/*Font.register({
  family: "Montserrat",
  src: "https://fonts.gstatic.com/s/montserrat/v25/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtr6Ew-Y3tcoqK5.ttf",
  fontWeight: "normal",
});*/
const styles = StyleSheet.create({
  page: {
    //fontFamily: "Montserrat",
    fontSize: 16,
    // paddingTop: 10,
    // paddingLeft: 30,
    // paddingRight: 30,
    lineHeight: 1.5,
    flexDirection: "column",
    // backgroundColor: "gray",
    fontWeight: "regular",
    color: "white",
  },
  pageBackground: {
    position: "absolute",
    minWidth: "100%",
    minHeight: "100%",
    display: "block",
    height: "100%",
    width: "100%",
    zIndex: -99,
  },
  logo: {
    mariginLeft: "auto",
    mariginRight: "auto",
    borderBottom: 15,
    borderBottomWidth: 2,
    padding: 6,
    margin: 10,
    width: 350,
    alignItems: "center",
    backgroundColor: "#252525",
    borderRadius: 15,
  },
});

const PdfTemplate = (props) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Image
          style={styles.logo}
          src={
            "https://designfires.pl/wp-content/uploads/2022/08/designfiresn.png"
          }
        />
        <TemplateTable
          products={props.products}
          currency={props.currency}
          totalPrice={props.totalPrice}
        />
        <Image
          style={styles.pageBackground}
          src="https://designfires.pl/wp-content/uploads/2022/10/CartBackgroundA4.png"
        />
      </Page>
    </Document>
  );
};
export default PdfTemplate;

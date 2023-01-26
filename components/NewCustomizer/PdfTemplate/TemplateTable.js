import React, { useContext } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import { LanguageContext } from "../../context/language-context";

const TemplateTable = (props) => {
  const lang = useContext(LanguageContext);
  const curr = () => {
    //console.log(props.currency);
    switch (props.currency) {
      case "SEK":
        return rowsSEK;
      case "€":
        return rowsEUR;
      case "kr":
        return rowsDKK;
    }
  };
  const rowTotal = () => {
    switch (props.currency) {
      case "SEK":
        return rowSEK;
      case "€":
        return rowEUR;
      case "kr":
        return rowDKK;
    }
  };
  const styles = StyleSheet.create({
    row: {
      flexDirection: "row",
      backgroundColor: "#252525",
      justifyContent: "space-between",
      padding: 15,
      borderRadius: 15,
      alignItems: "center",
      height: 100,
      fontStyle: "bold",
      margin: 2,
      color: "white",
    },
    image: {
      borderRadius: 15,
      width: "80",
      height: "80px",
    },
    description: {
      width: "35%",
      textAlign: "center",

      //borderRightWidth: 1,
      paddingLeft: 8,
    },
    amount: {
      width: "20%",
      textAlign: "center",
      paddingRight: 8,
      color: "white",
    },
    qty: {
      width: "10%",

      // borderRightWidth: 1,
      //textAlign: "right",
      paddingRight: 8,
      textAlign: "center",
    },

    total: {
      width: "20%",
      //textAlign: "right",
      color: "white",
      textAlign: "center",
      paddingRight: 8,
      // backgroundColor: "#252525",
    },
    titleContainer: {
      flexDirection: "row",
      marginTop: 12,
      justifyContent: "flex-end",

      // paddingLeft: 370,
    },
    reportTitle: {
      fontSize: 18,
      textAlign: "right",
      textTransform: "uppercase",
      backgroundColor: "#252525",
      borderRadius: 10,
      padding: 5,
    },
  });

  const rowsEUR = props.products.map((item) => (
    <View style={styles.row} key={item.id.toString()}>
      <Image style={styles.image} src={item.img} />
      <Text style={styles.description}>{item.name}</Text>

      <Text style={styles.amount}>
        {item.price} {props.currency}
      </Text>

      <Text style={styles.qty}>x {item.quantity}</Text>

      <Text style={styles.total}>
        {item.price * item.quantity} {props.currency}
      </Text>
    </View>
  ));
  const rowsSEK = props.products.map((item) => (
    <View style={styles.row} key={item.id.toString()}>
      <Image style={styles.image} src={item.img} />
      <Text style={styles.description}>{item.name}</Text>

      <Text style={styles.amount}>
        {item.SEK_price.toLocaleString(undefined, {
          maximumFractionDigits: 2,
        })}
        {props.currency}
      </Text>

      <Text style={styles.qty}>x {item.quantity}</Text>

      <Text style={styles.total}>
        {item.SEK_price * item.quantity} {props.currency}
      </Text>
    </View>
  ));
  const rowsDKK = props.products.map((item) => (
    <View style={styles.row} key={item.id.toString()}>
      <Image style={styles.image} src={item.img} />
      <Text style={styles.description}>{item.name}</Text>

      <Text style={styles.amount}>
        {item.DKK_price} {props.currency}
      </Text>

      <Text style={styles.qty}>x {item.quantity}</Text>

      <Text style={styles.total}>
        {item.DKK_price * item.quantity} {props.currency}
      </Text>
    </View>
  ));

  const rowEUR = (
    <View style={styles.titleContainer}>
      <Text style={styles.reportTitle}>
        Total: {props.totalPrice.price} {props.currency}
      </Text>
    </View>
  );
  const rowSEK = (
    <View style={styles.titleContainer}>
      <Text style={styles.reportTitle}>
        Total: {props.totalPrice.SEK_price} {props.currency}
      </Text>
    </View>
  );
  const rowDKK = (
    <View style={styles.titleContainer}>
      <Text style={styles.reportTitle}>
        Total: {props.totalPrice.DKK_price} {props.currency}
      </Text>
    </View>
  );

  return (
    <>
      {curr()}
      {rowTotal()}
    </>
  );
};
export default TemplateTable;

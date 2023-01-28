import React, { useContext } from "react";
import { Text, View, StyleSheet, Image } from "@react-pdf/renderer";
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
      width: "20%",
      textAlign: "center",

      //borderRightWidth: 1,
      paddingLeft: 8,
    },
    amount: {
      width: "15%",
      textAlign: "center",
      paddingRight: 8,
      color: "white",
    },
    qty: {
      width: "6%",

      // borderRightWidth: 1,
      //textAlign: "right",
      paddingRight: 8,
      textAlign: "center",
    },

    total: {
      width: "15%",
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
    dim: {
      width: "25%",
      textAlign: "center",
      paddingRight: 8,
      color: "white",
    },
  });

  const rowsEUR = props.products.map((item) => (
    <View style={styles.row} key={item.id.toString()}>
      <Image style={styles.image} src={item.img} alt="product image" />
      <Text style={styles.description}>{item.name}</Text>
      <View style={styles.dim}>
        <Text>
          {item.dimensions.length !== ""
            ? `Length: ${item.dimensions.length} mm`
            : ""}
        </Text>
        <Text>
          {" "}
          {item.dimensions.height !== ""
            ? `Height: ${item.dimensions.height} mm`
            : ""}
        </Text>
        <Text>
          {item.dimensions.width !== ""
            ? `Deep: ${item.dimensions.width} mm`
            : ""}
        </Text>
      </View>
      <Text style={styles.amount}>
        {Number(item.price).toLocaleString()} {props.currency}
      </Text>

      <Text style={styles.qty}>x {item.quantity}</Text>

      <Text style={styles.total}>
        {item.price * item.quantity} {props.currency}
      </Text>
    </View>
  ));
  const rowsSEK = props.products.map((item) => (
    <View style={styles.row} key={item.id.toString()}>
      <Image style={styles.image} src={item.img} alt="product image" />
      <Text style={styles.description}>{item.name}</Text>
      <View style={styles.dim}>
        <Text>
          {item.dimensions.length !== ""
            ? `Length: ${item.dimensions.length} mm`
            : ""}
        </Text>
        <Text>
          {" "}
          {item.dimensions.height !== ""
            ? `Height: ${item.dimensions.height} mm`
            : ""}
        </Text>
        <Text>
          {item.dimensions.width !== ""
            ? `Deep: ${item.dimensions.width} mm`
            : ""}
        </Text>
      </View>
      <Text style={styles.amount}>
        {Number(item.SEK_price).toLocaleString()} {props.currency}
      </Text>

      <Text style={styles.qty}>x {item.quantity}</Text>

      <Text style={styles.total}>
        {Number(item.SEK_price * item.quantity).toLocaleString()}{" "}
        {props.currency}
      </Text>
    </View>
  ));
  const rowsDKK = props.products.map((item) => (
    <View style={styles.row} key={item.id.toString()}>
      <Image style={styles.image} src={item.img} alt="product image" />
      <Text style={styles.description}>{item.name}</Text>
      <View style={styles.dim}>
        <Text>
          {item.dimensions.length !== ""
            ? `Length: ${item.dimensions.length} mm`
            : ""}
        </Text>
        <Text>
          {" "}
          {item.dimensions.height !== ""
            ? `Height: ${item.dimensions.height} mm`
            : ""}
        </Text>
        <Text>
          {item.dimensions.width !== ""
            ? `Deep: ${item.dimensions.width} mm`
            : ""}
        </Text>
      </View>
      <Text style={styles.amount}>
        {Number(item.DKK_price).toLocaleString()} {props.currency}
      </Text>

      <Text style={styles.qty}>x {item.quantity}</Text>

      <Text style={styles.total}>
        {Number(item.DKK_price * item.quantity).toLocaleString()}{" "}
        {props.currency}
      </Text>
    </View>
  ));

  const rowEUR = (
    <View style={styles.titleContainer}>
      <Text style={styles.reportTitle}>
        Total: {Number(props.totalPrice.price).toLocaleString()}{" "}
        {props.currency}
      </Text>
    </View>
  );
  const rowSEK = (
    <View style={styles.titleContainer}>
      <Text style={styles.reportTitle}>
        Total: {Number(props.totalPrice.SEK_price).toLocaleString()}{" "}
        {props.currency}
      </Text>
    </View>
  );
  const rowDKK = (
    <View style={styles.titleContainer}>
      <Text style={styles.reportTitle}>
        Total: {Number(props.totalPrice.DKK_price).toLocaleString()}{" "}
        {props.currency}
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

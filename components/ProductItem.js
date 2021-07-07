import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";
import { addItems } from "../store/actions/cart";
import { deleteProduct } from "../store/actions/products";

const ProductItem = ({ prod, nav, isUserProd }) => {
  const dispatch = useDispatch();

  const deleteHandler = () => {
    Alert.alert("Delete Item", "Are you sure you want to delete the item?", [
      {
        text: "YES",
        onPress: () => {
          dispatch(deleteProduct(prod.item.id));
        },
      },
      { text: "NO", style: "default" },
    ]);
  };

  return (
    <View style={styles.prodContainer}>
      <TouchableOpacity
        onPress={() => {
          nav.navigate("ProductDetails", {
            id: prod.item.id,
          });
        }}
      >
        <Image
          source={{ uri: prod.item.imageUrl, height: 200, width: "100%" }}
        />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={{ fontFamily: "open-sans-bold" }}>{prod.item.title}</Text>
        <Text style={{ fontFamily: "open-sans" }}>
          {"₹" + parseInt(prod.item.price) * 20}
        </Text>
      </View>
      {!isUserProd ? (
        <View style={styles.btnContainer}>
          <Button
            title="View Details"
            onPress={() => {
              nav.navigate("ProductDetails", {
                id: prod.item.id,
              });
            }}
          />
          <Button
            title="To Cart"
            onPress={() => {
              dispatch(addItems(prod.item));
            }}
          />
        </View>
      ) : (
        <View style={styles.btnContainer}>
          <Button
            title="Edit"
            onPress={() => {
              nav.navigate("EditProducts", {
                id: prod.item.id,
              });
            }}
          />
          <Button
            title="Delete"
            onPress={() => {
              deleteHandler();
            }}
          />
        </View>
      )}
    </View>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  prodContainer: {
    width: 370,
    margin: 20,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
    // Shadow Properties
    shadowColor: "#ccc",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.26,
    backgroundColor: "white",
    shadowRadius: 2,
    elevation: 8,
    overflow: "hidden",
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 20,
  },
  textContainer: {
    alignItems: "center",
    paddingVertical: 10,
  },
});

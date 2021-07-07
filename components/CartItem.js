import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { deleteItems } from "../store/actions/cart";

const CartItem = ({ item, isOrdered }) => {
  const dispatch = useDispatch();
  return (
    <View style={styles.itemContainer}>
      <View style={styles.first}>
        <Text style={styles.quantity}>{item.quantity}</Text>
        <Text style={styles.title}>{item.title}</Text>
      </View>
      <View style={styles.last}>
        <Text style={styles.sum}>₹{item.sum}</Text>
        {!isOrdered && (
          <TouchableOpacity onPress={() => dispatch(deleteItems(item.id))}>
            <Ionicons name="ios-trash" color="red" size={28} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  itemContainer: {
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  first: {
    flexDirection: "row",
    alignItems: "center",
  },
  last: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  quantity: {
    fontFamily: "open-sans",
    color: "#888",
    fontSize: 16,
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
    marginHorizontal: 5,
  },
  sum: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
    marginHorizontal: 10,
  },
});

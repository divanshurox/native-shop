import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import CartItem from "./CartItem";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { deleteOrder } from "../store/actions/orders";

import Swipeout from "react-native-swipeout";

const OrderItem = ({ order }) => {
  const dispatch = useDispatch();
  const swiperSettings = {
    autoClose: true,
    onClose: () => {},
    onOpen: () => {},
    right: [
      {
        onPress: () => dispatch(deleteOrder(order.id)),
        text: "Delete",
        type: "delete",
      },
    ],
    backgroundColor: "white",
    sectionId: 1,
  };
  const [showDetails, setDetails] = useState(false);
  return (
    <Swipeout {...swiperSettings}>
      <View style={styles.orderItem}>
        <View style={styles.summary}>
          <Text style={styles.amount}>
            <Text style={{ color: "#888", fontFamily: "open-sans" }}>
              Price:
            </Text>{" "}
            ₹{order.totalAmount}
          </Text>
          <Text style={styles.date}>
            <Text style={{ color: "#888" }}>Date:</Text> {order.date}
          </Text>
        </View>
        {showDetails && (
          <View style={{ width: "100%" }}>
            {order.items.map((ele, id) => {
              return <CartItem key={id} item={ele} isOrdered={true} />;
            })}
          </View>
        )}
        {!showDetails ? (
          <TouchableOpacity onPress={() => setDetails(true)}>
            <MaterialIcons name="expand-more" size={24} color="black" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setDetails(false)}>
            <MaterialIcons name="expand-less" size={24} color="black" />
          </TouchableOpacity>
        )}
      </View>
    </Swipeout>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  orderItem: {
    shadowColor: "#ccc",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    borderRadius: 10,
    shadowOpacity: 0.26,
    shadowRadius: 10,
    backgroundColor: "white",
    elevation: 8,
    margin: 20,
    padding: 10,
    alignItems: "center",
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
    width: "100%",
  },
  amount: {
    fontSize: 17,
    fontFamily: "open-sans-bold",
  },
  date: {
    fontSize: 15,
    fontFamily: "open-sans",
  },
});

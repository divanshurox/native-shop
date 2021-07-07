import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "../../components/CartItem";
import { addOrder } from "../../store/actions/orders";

const CartScreen = ({ navigation }) => {
  const [load, setLoad] = useState(false);
  const availableItems = useSelector((state) => state.products.availProducts);
  const cartItems = useSelector((state) => {
    const tranformedCartItems = [];
    for (let key in state.cart.items) {
      const item = availableItems.find(
        (ele) => ele.id === state.cart.items[key].id
      );
      tranformedCartItems.push({
        ...state.cart.items[key],
        ...item,
      });
    }
    return tranformedCartItems.sort((a, b) => (a.id > b.id ? 1 : -1));
  });
  const totalAmount = useSelector((state) => state.cart.totalPrice);
  const dispatch = useDispatch();
  const renderItems = (itemData) => {
    return <CartItem item={itemData.item} isOrdered={false} />;
  };

  const addOrderHandler = (cartItems, totalAmount) => {
    setLoad(true);
    dispatch(addOrder(cartItems, totalAmount)).then(() => {
      setLoad(false);
    });
  };

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total Amount: <Text style={styles.amount}>₹{totalAmount}</Text>
        </Text>
        <Button
          title="Order Now"
          disabled={cartItems.length === 0}
          onPress={() => addOrderHandler(cartItems, totalAmount)}
        />
      </View>
      <View>
        <FlatList
          keyExtractor={(ele) => ele.id}
          data={cartItems}
          renderItem={renderItems}
        />
      </View>
      {load && (
        <View style={styles.centered}>
          <ActivityIndicator color="dodgerblue" size="large" />
        </View>
      )}
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  screen: {
    margin: 15,
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 300,
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 20,
    padding: 10,
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
  summaryText: {
    fontFamily: "open-sans-bold",
    fontSize: 17,
    marginRight: 10,
  },
  amount: {
    color: "dodgerblue",
  },
});

import React, { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { setOrders } from "../../store/actions/orders";
import HeaderButton from "../../components/HeaderButton";
import OrderItem from "../../components/OrderItem";

const OrdersScreen = (props) => {
  const orders = useSelector((state) => state.order.orders);
  const [load, setLoad] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoad(true);
    dispatch(setOrders()).then(() => setLoad(false));
  }, [dispatch]);

  props.navigation.setOptions({
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          iconName="ios-menu"
          onPress={() => {
            props.navigation.toggleDrawer();
          }}
          title="Menu"
        />
      </HeaderButtons>
    ),
  });

  if (load) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator color="dodgerblue" size="large" />
      </View>
    );
  }

  if (orders.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>Go order something!!</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <FlatList
        keyExtractor={(ele) => ele.id}
        data={orders}
        renderItem={(itemData) => <OrderItem order={itemData.item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default OrdersScreen;

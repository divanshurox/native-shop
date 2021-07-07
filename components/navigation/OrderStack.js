import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import OrdersScreen from "../../screens/shop/OrdersScreen";

const OrderStack = createStackNavigator();

const OrderStackScreen = () => {
  return (
    <OrderStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "dodgerblue" },
        headerTintColor: "white",
        headerTitle: "Your Orders",
      }}
    >
      <OrderStack.Screen name="Orders" component={OrdersScreen} />
    </OrderStack.Navigator>
  );
};

export default OrderStackScreen;

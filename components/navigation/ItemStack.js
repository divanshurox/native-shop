import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProductsOverviewScreen from "../../screens/shop/ProductsOverviewScreen";
import ProductDetailScreen from "../../screens/shop/ProductDetailScreen";
import CartScreen from "../../screens/shop/CartScreen";

const Stack = createStackNavigator();

const ItemStackScreen = () => {
  return (
    <Stack.Navigator
      initialRouteName="ProductOverview"
      screenOptions={{
        headerStyle: { backgroundColor: "dodgerblue" },
        headerTintColor: "white",
      }}
    >
      <Stack.Screen
        name="ProductOverview"
        component={ProductsOverviewScreen}
        options={{
          title: "All Products",
        }}
      />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="ProductDetails" component={ProductDetailScreen} />
    </Stack.Navigator>
  );
};

export default ItemStackScreen;

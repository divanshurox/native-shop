import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import UserProductsScreen from "../../screens/user/UserProductsScreen";
import EditProductScreen from "../../screens/user/EditProductScreen";

const UserStack = createStackNavigator();

const UserStackScreen = () => {
  return (
    <UserStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "dodgerblue" },
        headerTintColor: "white",
        headerTitle: "Your Products",
      }}
    >
      <UserStack.Screen name="UserProducts" component={UserProductsScreen} />
      <UserStack.Screen
        name="EditProducts"
        component={EditProductScreen}
        options={{
          headerTitle: "Edit Product",
        }}
      />
    </UserStack.Navigator>
  );
};

export default UserStackScreen;

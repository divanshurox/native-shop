import React from "react";
import ItemStackScreen from "./ItemStack";
import OrdersStackScreen from "./OrderStack";
import UserStackScreen from "./UserStack";
import { Button, SafeAreaView, View } from "react-native";
import { useDispatch } from "react-redux";
import { logOut } from "../../store/actions/auth";

import {
  createDrawerNavigator,
  DrawerItemList,
  DrawerContentScrollView,
} from "@react-navigation/drawer";

import { Ionicons } from "@expo/vector-icons";

const Drawer = createDrawerNavigator();

const DrawerScreen = () => {
  const dispatch = useDispatch();
  return (
    <Drawer.Navigator
      drawerStyle="slide"
      drawerContentOptions={{ activeTintColor: "orange" }}
      drawerContent={(props) => (
        <View style={{ flex: 1 }}>
          <DrawerContentScrollView>
            <DrawerItemList {...props} />
            <View style={{ margin: 10, borderRadius: 10, overflow: "hidden" }}>
              <Button
                title="Logout"
                color="tomato"
                onPress={() => dispatch(logOut())}
              />
            </View>
          </DrawerContentScrollView>
        </View>
      )}
    >
      <Drawer.Screen
        name="Items"
        component={ItemStackScreen}
        options={{
          drawerIcon: (drawerConfig) => (
            <Ionicons name="ios-list" size={23} color={drawerConfig.color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Order"
        component={OrdersStackScreen}
        options={{
          drawerIcon: (drawerConfig) => (
            <Ionicons name="ios-cart" size={23} color={drawerConfig.color} />
          ),
        }}
      />
      <Drawer.Screen
        name="UserProducts"
        component={UserStackScreen}
        options={{
          drawerIcon: (drawerConfig) => (
            <Ionicons name="ios-create" size={23} color={drawerConfig.color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerScreen;

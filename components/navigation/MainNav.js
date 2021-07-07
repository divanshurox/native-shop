import React from "react";
import DrawerScreen from "./Drawer";
import { useSelector } from "react-redux";
import AuthScreen from "../../screens/user/AuthScreen";
import StartUpScreen from "../../screens/StartUpScreen";

import { createStackNavigator } from "@react-navigation/stack";

const AuthStack = createStackNavigator();

const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "dodgerblue" },
        headerTintColor: "white",
      }}
    >
      <AuthStack.Screen name="Start" component={StartUpScreen} />
      <AuthStack.Screen name="Auth" component={AuthScreen} />
    </AuthStack.Navigator>
  );
};

const MainNav = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  if (isAuth) {
    return <DrawerScreen />;
  } else {
    return <AuthStackScreen />;
  }
};

export default MainNav;

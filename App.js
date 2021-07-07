import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import * as Font from "expo-font";
import { AppLoading } from "expo";

import ProductReducer from "./store/reducers/products";
import CartReducer from "./store/reducers/cart";
import OrderReducer from "./store/reducers/orders";
import AuthReducer from "./store/reducers/auth";

import { NavigationContainer } from "@react-navigation/native";

// Importing Main Navigation Component
import MainNav from "./components/navigation/MainNav";

import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = combineReducers({
  products: ProductReducer,
  cart: CartReducer,
  order: OrderReducer,
  auth: AuthReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/Fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/Fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [load, isLoad] = useState(false);
  if (!load) {
    return <AppLoading startAsync={fetchFonts} onFinish={() => isLoad(true)} />;
  }
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainNav />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

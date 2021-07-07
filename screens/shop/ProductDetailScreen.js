import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Button,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import HeaderButton from "../../components/HeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { addItems } from "../../store/actions/cart";

const ProductDetailScreen = ({ navigation, route }) => {
  const PRODUCTS = useSelector((state) => state.products.availProducts);
  const selectedProduct = PRODUCTS.find((ele) => ele.id === route.params.id);
  const dispatch = useDispatch();

  const confirmAddHandler = () => {
    return Alert.alert(
      "Add To Cart",
      "Are you sure you want to add the item?",
      [
        {
          text: "Cancel",
        },
        {
          text: "Yes",
          onPress: () => dispatch(addItems(selectedProduct)),
        },
      ]
    );
  };

  navigation.setOptions({
    title: selectedProduct.title,
    headerRight: () => {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Cart"
            iconName="ios-cart"
            onPress={() => {
              navigation.navigate("Cart");
            }}
          />
        </HeaderButtons>
      );
    },
  });
  return (
    <ScrollView>
      <Image
        source={{ uri: selectedProduct.imageUrl, height: 300, width: "100%" }}
      />
      <View style={styles.btn}>
        <Button title="Add to Cart" onPress={() => confirmAddHandler()} />
      </View>
      <Text style={styles.price}>₹{parseInt(selectedProduct.price) * 20}</Text>
      <Text style={styles.desc}>{selectedProduct.description}</Text>
    </ScrollView>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  price: {
    fontSize: 20,
    color: "#888",
    textAlign: "center",
    fontFamily: "open-sans-bold",
    marginBottom: 10,
  },
  desc: {
    fontSize: 14,
    textAlign: "center",
    fontFamily: "open-sans",
  },
  btn: {
    marginBottom: 20,
  },
});

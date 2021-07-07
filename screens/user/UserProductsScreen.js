import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import ProductItem from "../../components/ProductItem";
import { useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/HeaderButton";

const UserProductsScreen = (props) => {
  const userProducts = useSelector((state) => state.products.userProducts);
  props.navigation.setOptions({
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          iconName="ios-create"
          onPress={() => {
            props.navigation.navigate("EditProducts", {
              id: "none",
            });
          }}
          title="Create"
        />
      </HeaderButtons>
    ),
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          iconName="ios-menu"
          onPress={() => {
            props.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  });
  return (
    <FlatList
      data={userProducts}
      keyExtractor={(ele) => ele.id}
      renderItem={(itemData) => (
        <ProductItem prod={itemData} nav={props.navigation} isUserProd={true} />
      )}
    />
  );
};

export default UserProductsScreen;

const styles = StyleSheet.create({});

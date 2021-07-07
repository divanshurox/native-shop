import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  FlatList,
  Text,
  View,
  ActivityIndicator,
  Button,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../components/ProductItem";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/HeaderButton";
import { fetchProducts } from "../../store/actions/products";

const ProductsOverviewScreen = ({ navigation }) => {
  const products = useSelector((state) => state.products.availProducts);
  const [err, setErr] = useState();

  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);

  const loadProducts = useCallback(() => {
    setErr(null);
    setLoad(true);
    dispatch(fetchProducts())
      .then(() => {
        setLoad(false);
      })
      .catch((err) => {
        setErr(err.message);
        setLoad(false);
      });
  }, [dispatch]);

  useEffect(() => {
    const willFocusSub = navigation.addListener("willFocus", loadProducts);
    return willFocusSub;
  }, [loadProducts]);

  useEffect(() => {
    loadProducts();
  }, [dispatch, loadProducts]);

  navigation.setOptions({
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          iconName="ios-cart"
          onPress={() => {
            navigation.navigate("Cart");
          }}
          title="Cart"
        />
      </HeaderButtons>
    ),
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          iconName="ios-menu"
          onPress={() => {
            navigation.toggleDrawer();
          }}
          title="Menu"
        />
      </HeaderButtons>
    ),
  });
  const renderProduct = (itemData) => {
    return <ProductItem prod={itemData} nav={navigation} isUserProd={false} />;
  };

  if (err) {
    return (
      <View style={styles.screen}>
        <Text>There is some error, Please try again!</Text>
        <Button title="Try Again" onPress={loadProducts} />
      </View>
    );
  }

  if (load) {
    return (
      <View style={styles.screen}>
        <ActivityIndicator size="large" color="dodgerblue" />
      </View>
    );
  }

  if (!load && products.length === 0) {
    return (
      <View style={styles.screen}>
        <Text>There is some error, Please try again!</Text>
      </View>
    );
  }
  return (
    <FlatList
      onRefresh={loadProducts}
      refreshing={load}
      keyExtractor={(ele) => ele.id}
      data={products}
      renderItem={renderProduct}
      contentContainerStyle={{ alignItems: "center" }}
    />
  );
};

export default ProductsOverviewScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

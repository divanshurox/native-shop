import React, { useState, useReducer, useEffect } from "react";
import {
  StyleSheet,
  View,
  Alert,
  ScrollView,
  ActivityIndicator,
  TextPropTypes,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/HeaderButton";
import { useSelector, useDispatch } from "react-redux";
import { addProduct, editProduct } from "../../store/actions/products";
import Input from "../../components/Input";

const formReducer = (state, action) => {
  if (action.type === "UPDATE") {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      if (!updatedValidities[key]) {
        updatedFormIsValid = false;
      }
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const EditProductScreen = ({ route, navigation }) => {
  let userProduct;
  const [err, setErr] = useState();
  const [load, setLoad] = useState(false);
  const dispatch = useDispatch();

  if (route.params.id !== "none") {
    const id = route.params.id;
    userProduct = useSelector((state) =>
      state.products.userProducts.find((ele) => ele.id === id)
    );
  }

  useEffect(() => {
    if (err) {
      Alert.alert("An error occured", err, [{ text: "OK" }]);
    }
  }, [err]);

  const [formState, formDispatch] = useReducer(formReducer, {
    inputValues: {
      title: route.params.id !== "none" ? userProduct.title : "",
      img: route.params.id !== "none" ? userProduct.imageUrl : "",
      price:
        route.params.id !== "none"
          ? (parseInt(userProduct.price) * 20).toString()
          : "",
      desc: route.params.id !== "none" ? userProduct.description : "",
    },
    inputValidities: {
      title: route.params.id !== "none" ? true : false,
      img: route.params.id !== "none" ? true : false,
      price: route.params.id !== "none" ? true : false,
      desc: route.params.id !== "none" ? true : false,
    },
    formIsValid: route.params.id !== "none" ? true : false,
  });

  navigation.setOptions({
    headerTitle: route.params.id !== "none" ? "Edit Product" : "Add Product",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          iconName="ios-checkmark"
          onPress={() => {
            submitHandler(route.params.id);
          }}
          title="Create"
          disabled={!formState.formIsValid}
        />
      </HeaderButtons>
    ),
  });

  const submitHandler = async (id) => {
    const userProduct = {
      title: formState.inputValues.title,
      img: formState.inputValues.img,
      desc: formState.inputValues.desc,
    };
    const availProduct = {
      title: formState.inputValues.title,
      img: formState.inputValues.img,
      price: formState.inputValues.price,
      desc: formState.inputValues.desc,
    };
    setLoad(true);
    setErr(null);
    try {
      if (id !== "none") {
        await dispatch(editProduct(id, userProduct));
      } else {
        await dispatch(addProduct(availProduct));
      }
      setLoad(false);
      navigation.navigate("UserProducts");
    } catch (err) {
      setErr(err.message);
    }
  };

  const textChangeHandler = (text, input) => {
    let isValid = true;
    if (text.trim().length === 0) {
      isValid = false;
    }
    formDispatch({ type: "UPDATE", value: text, isValid, input });
  };

  if (load) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator color="dodgerblue" size="large" />
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.form}>
        <Input
          state={formState}
          textChange={textChangeHandler}
          identifier="title"
          heading="Title"
          keyboard="default"
        />
        <Input
          state={formState}
          textChange={textChangeHandler}
          heading="Image URL"
          identifier="img"
          keyboard="default"
        />
        {!userProduct && (
          <Input
            state={formState}
            textChange={textChangeHandler}
            identifier="price"
            heading="Price"
            keyboard="numeric"
          />
        )}
        <Input
          state={formState}
          textChange={textChangeHandler}
          identifier="desc"
          heading="Description"
          keyboard="default"
        />
      </View>
    </ScrollView>
  );
};

export default EditProductScreen;

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

import axios from "axios";
import Product from "../../models/product";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const EDIT_PRODUCT = "EDIT_PRODUCT";
export const SET_PRODUCT = "SET_PRODUCT";

export const fetchProducts = () => {
  return async (dispatch, getState) => {
    const { userId } = getState().auth;
    try {
      const res = await axios.get(
        "https://react-native-aec52.firebaseio.com/products.json"
      );

      const loadedProducts = [];
      for (let key in res.data) {
        loadedProducts.push(
          new Product(
            key,
            res.data[key].ownerId,
            res.data[key].title,
            res.data[key].img,
            res.data[key].desc,
            res.data[key].price
          )
        );
      }
      dispatch({
        type: SET_PRODUCT,
        products: loadedProducts,
        userProducts: loadedProducts.filter((ele) => ele.ownerId === userId),
      });
    } catch (error) {
      throw err;
    }
  };
};

export const deleteProduct = (id) => {
  return async (dispatch, getState) => {
    const { token } = getState().auth;
    const res = await axios.delete(
      `https://react-native-aec52.firebaseio.com/products/${id}.json?auth=${token}`
    );
    if (res.status !== 200) {
      throw new Error("Somethings wrong!");
    }
    dispatch({
      type: DELETE_PRODUCT,
      id: id,
    });
  };
};

export const addProduct = (prodObj) => {
  return async (dispatch, getState) => {
    const { token, userId } = getState().auth;
    const res = await axios.post(
      `https://react-native-aec52.firebaseio.com/products.json?auth=${token}`,
      {
        ...prodObj,
      }
    );
    if (res.status !== 200) {
      console.log("Error");
      throw new Error("Somethings wrong!");
    }
    dispatch({
      type: ADD_PRODUCT,
      id: res.data.name,
      prod: prodObj,
      userId,
    });
  };
};

export const editProduct = (id, prodObj) => {
  return async (dispatch, getState) => {
    const { token } = getState().auth;
    const res = await axios.patch(
      `https://react-native-aec52.firebaseio.com/products/${id}.json?auth=${token}`,
      {
        ...prodObj,
      }
    );
    if (res.status !== 200) {
      console.log("Error");
      throw new Error("Somethings wrong!");
    }
    dispatch({
      type: EDIT_PRODUCT,
      pid: id,
      prod: prodObj,
    });
  };
};

import axios from "axios";
import moment from "moment";
import Order from "../../models/order";

export const ADD_ORDER = "ADD_ORDER";
export const SET_ORDERS = "SET_ORDERS";
export const DELETE_ORDER = "DELETE_ORDER";

export const addOrder = (cartItems, totalAmount) => {
  return async (dispatch, getState) => {
    const date = new Date();
    const { token, userId } = getState().auth;
    const res = await axios.post(
      `https://react-native-aec52.firebaseio.com/orders/${userId}.json?auth=${token}`,
      {
        cartItems,
        totalAmount,
        date: moment(date).format("MMMM Do YYYY"),
      }
    );
    dispatch({
      type: ADD_ORDER,
      payload: {
        id: res.data.title,
        cartItems,
        totalAmount,
        date,
      },
    });
  };
};

export const setOrders = () => {
  return async (dispatch, getState) => {
    const { userId } = getState().auth;
    const res = await axios.get(
      `https://react-native-aec52.firebaseio.com/orders/${userId}.json`
    );
    const loadedOrders = [];
    for (let key in res.data) {
      const { cartItems } = res.data[key];
      loadedOrders.push(
        new Order(key, cartItems, res.data[key].totalAmount, res.data[key].date)
      );
    }
    dispatch({
      type: SET_ORDERS,
      orders: loadedOrders,
    });
  };
};

export const deleteOrder = (id) => {
  return async (dispatch, getState) => {
    const { token, userId } = getState().auth;
    await axios.delete(
      `https://react-native-aec52.firebaseio.com/orders/${userId}.json?auth=${token}`
    );
    dispatch({
      type: DELETE_ORDER,
      id,
    });
  };
};

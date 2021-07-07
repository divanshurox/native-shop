import { ADD_ORDER, DELETE_ORDER, SET_ORDERS } from "../actions/orders";
import Order from "../../models/order";
import moment from "moment";

const initialState = {
  orders: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER:
      const newOrder = new Order(
        action.payload.id,
        action.payload.cartItems,
        action.payload.totalAmount,
        moment(action.payload.date).format("MMMM Do YYYY")
      );
      return {
        ...state,
      };
    case SET_ORDERS:
      const ordersArr = action.orders;
      return {
        orders: ordersArr,
      };
    case DELETE_ORDER:
      return {
        orders: state.orders.filter((ele) => ele.id !== action.id),
      };
    default:
      return state;
  }
};

export default reducer;

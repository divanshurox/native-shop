import { ADD_ITEMS, DELETE_ITEMS } from "../actions/cart";
import { ADD_ORDER } from "../actions/orders";
import CartItem from "../../models/cart-item";

const initState = {
  items: {},
  totalPrice: 0,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_ITEMS:
      const item = action.product;
      const prodPrice = parseInt(item.price) * 20;
      const prodTitle = item.title;
      if (state.items[item.id]) {
        const updatedItem = new CartItem(
          item.id,
          state.items[item.id].quantity + 1,
          prodPrice,
          prodTitle,
          state.items[item.id].sum + prodPrice
        );
        return {
          ...state,
          items: { ...state.items, [item.id]: updatedItem },
          totalPrice: state.totalPrice + prodPrice,
        };
      } else {
        const newCartItem = new CartItem(
          item.id,
          1,
          prodPrice,
          prodTitle,
          prodPrice
        );
        return {
          ...state,
          items: { ...state.items, [item.id]: newCartItem },
          totalPrice: state.totalPrice + prodPrice,
        };
      }
    case DELETE_ITEMS:
      const selectedItem = state.items[action.id];
      const quantity = selectedItem.quantity;
      const itemPrice = selectedItem.price;
      let updatedCartItem;
      if (quantity > 1) {
        const updatedItem = new CartItem(
          action.id,
          selectedItem.quantity - 1,
          selectedItem.price,
          selectedItem.title,
          selectedItem.sum - itemPrice
        );
        updatedCartItem = { ...state.items, [action.id]: updatedItem };
      } else {
        updatedCartItem = { ...state.items };
        delete updatedCartItem[action.id];
      }
      return {
        ...state,
        items: updatedCartItem,
        totalPrice: state.totalPrice - itemPrice,
      };
    case ADD_ORDER:
      return initState;
    default:
      return state;
  }
};

export default reducer;

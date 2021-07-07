export const ADD_ITEMS = "ADD_ITEMS";
export const DELETE_ITEMS = "DELETE_ITEMS";

export const addItems = (product) => {
  return {
    type: ADD_ITEMS,
    product: product,
  };
};

export const deleteItems = (itemId) => {
  return {
    type: DELETE_ITEMS,
    id: itemId,
  };
};

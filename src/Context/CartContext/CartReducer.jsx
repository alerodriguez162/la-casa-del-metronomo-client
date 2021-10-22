const CartReducer = (globalState, action) => {
  switch (action.type) {
    case "GET_CART":
      return {
        ...globalState,
        cart: action.payload,
      };
    default:
      return globalState;
  }
};

export default CartReducer;

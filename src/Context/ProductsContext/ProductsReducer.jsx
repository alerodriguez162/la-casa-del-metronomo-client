const ProductsReducer = (globalState, action) => {
  switch (action.type) {
    case "GET_ALL_CATEGORIES":
      return {
        ...globalState,
        categories: action.payload,
      };
    case "GET_ALL_PRODUCTS":
      return {
        ...globalState,
        products: action.payload,
      };
    case "GET_ALL_PRODUCTS_FEATURED":
      return {
        ...globalState,
        featuredProducts: action.payload,
      };

    default:
      return globalState;
  }
};

export default ProductsReducer;

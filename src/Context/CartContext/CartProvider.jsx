import React, { useReducer } from "react";
import axiosClient from "../../Config/axios";
import CartContext from "./CartContext";
import CartReducer from "./CartReducer";

const CartProvider = (props) => {
  const initialState = {
    cart: {},
  };

  const [globalState, dispatch] = useReducer(CartReducer, initialState);

  const addToCart = async (product) => {
    try {
      await axiosClient.post("/cart/add", product);
      getCart();
    } catch (error) {
      console.log(error);
    }
  };

  const clearCart = async () => {
    try {
      await axiosClient.delete("/cart/delete");
      getCart();
    } catch (error) {
      console.log(error);
    }
  };

  const removeToCart = async (product) => {
    try {
      await axiosClient.post("/cart/remove", product);
      getCart();
    } catch (error) {
      console.log(error);
    }
  };

  const getCart = async () => {
    try {
      const res = await axiosClient.get("/cart");
      dispatch({
        type: "GET_CART",
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const submitCheckout = async (formData) => {
    try {
      const res = await axiosClient.post("/checkout", formData);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart: globalState.cart,
        addToCart,
        clearCart,
        removeToCart,
        getCart,
        submitCheckout,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;

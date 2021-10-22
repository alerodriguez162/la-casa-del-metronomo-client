import React, { useReducer } from "react";
import { toast } from "react-toastify";
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
      toast.success("Producto agregado con exito", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      getCart();
    } catch (error) {
      toast.error("Ha ocurrido un error, intente nuevamente", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const clearCart = async () => {
    try {
      await axiosClient.delete("/cart/delete");
      getCart();
    } catch (error) {
      toast.error("Ha ocurrido un error, intente nuevamente", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const removeToCart = async (product) => {
    try {
      await axiosClient.post("/cart/remove", product);
      toast.success("Producto eliminado con exito", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      getCart();
    } catch (error) {
      toast.error("Ha ocurrido un error, intente nuevamente", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
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
      toast.error("Ha ocurrido un error, intente nuevamente", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const submitCheckout = async (formData) => {
    try {
      const res = await axiosClient.post("/checkout", formData);
      clearCart();
      return res.data;
    } catch (error) {
      toast.error("Ha ocurrido un error, intente nuevamente", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
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

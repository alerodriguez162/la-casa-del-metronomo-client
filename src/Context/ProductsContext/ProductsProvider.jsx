import axios from "axios";
import React, { useReducer } from "react";
import axiosClient from "../../Config/axios";
import ProductsContext from "./ProductsContext";
import ProductsReducer from "./ProductsReducer";
const ProductsProvider = (props) => {
  const initialState = {
    products: [],
    categories: [],
    featuredProducts: [],
  };

  const [globalState, dispatch] = useReducer(ProductsReducer, initialState);

  const createCategory = async (data) => {
    try {
      await axiosClient.post("/categories/create", data);
      allCategories();
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteCategory = async (id) => {
    try {
      await axiosClient.delete(`/categories/delete/${id}`);
      allCategories();
    } catch (error) {
      console.log(error.message);
    }
  };

  const allCategories = async () => {
    try {
      const res = await axiosClient.get("/categories/all");
      dispatch({
        type: "GET_ALL_CATEGORIES",
        payload: res.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const allProducts = async (data = {}) => {
    try {
      let url = "/plp";

      const res = await axiosClient.post(url, data);
      dispatch({
        type: "GET_ALL_PRODUCTS",
        payload: res.data.products,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const getFeaturedProducts = async (data = {}) => {
    try {
      let url = "/plp";
      const res = await axiosClient.post(url, { featured: true });
      dispatch({
        type: "GET_ALL_PRODUCTS_FEATURED",
        payload: res.data.products,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const createProduct = async (data) => {
    try {
      await axiosClient.post(`/pdp/create`, data);
      allProducts();
    } catch (error) {
      console.log(error.message);
    }
  };

  const uploadImage = async (file) => {
    try {
      const data = new FormData();
      data.append("upload_preset", "t19lojsx");
      data.append("file", file);
      const res = await axios.post(process.env.REACT_APP_CLOUDINARY_URL, data);
      return res.data.secure_url;
    } catch (error) {
      console.log(error.message);
    }
  };

  const removeProduct = async (product) => {
    try {
      await axiosClient.delete(`/pdp/delete/${product._id}`);
      allProducts();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <ProductsContext.Provider
      value={{
        products: globalState.products,
        categories: globalState.categories,
        featuredProducts: globalState.featuredProducts,
        createCategory,
        deleteCategory,
        allCategories,
        getFeaturedProducts,
        allProducts,
        createProduct,
        uploadImage,
        removeProduct,
      }}
    >
      {props.children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;

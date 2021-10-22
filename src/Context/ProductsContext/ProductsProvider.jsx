import axios from "axios";
import React, { useReducer } from "react";
import { toast } from "react-toastify";
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
      toast.success("Categoria generada con exito", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      allCategories();
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

  const deleteCategory = async (id) => {
    try {
      await axiosClient.delete(`/categories/delete/${id}`);
      toast.success("Categoria eliminada con exito", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      allCategories();
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

  const allCategories = async () => {
    try {
      const res = await axiosClient.get("/categories/all");
      dispatch({
        type: "GET_ALL_CATEGORIES",
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

  const allProducts = async (data = {}) => {
    try {
      let url = "/plp";

      const res = await axiosClient.post(url, data);
      dispatch({
        type: "GET_ALL_PRODUCTS",
        payload: res.data.products,
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

  const getFeaturedProducts = async (data = {}) => {
    try {
      let url = "/plp";
      const res = await axiosClient.post(url, { featured: true });
      dispatch({
        type: "GET_ALL_PRODUCTS_FEATURED",
        payload: res.data.products,
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

  const createProduct = async (data) => {
    try {
      await axiosClient.post(`/pdp/create`, data);
      toast.success("Producto creado con exito", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      allProducts();
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

  const uploadImage = async (file) => {
    try {
      const data = new FormData();
      data.append("upload_preset", "t19lojsx");
      data.append("file", file);
      const res = await axios.post(process.env.REACT_APP_CLOUDINARY_URL, data);
      return res.data.secure_url;
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

  const removeProduct = async (product) => {
    try {
      await axiosClient.delete(`/pdp/delete/${product._id}`);
      toast.success("Producto eliminado con exito", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      allProducts();
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

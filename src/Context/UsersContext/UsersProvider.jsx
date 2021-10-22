import React, { useReducer } from "react";
import { toast } from "react-toastify";
import axiosClient from "../../Config/axios";
import UsersContext from "./UsersContext";
import UsersReducer from "./UsersReducer";

const UsersProvider = (props) => {
  const initialState = {
    users: [],
    isLoggedIn: false,
    currentUser: null,
    token: null,
  };

  const [globalState, dispatch] = useReducer(UsersReducer, initialState);

  const logOut = async () => {
    dispatch({
      type: "CLOSE_SESSION",
    });
  };

  const login = async (formData) => {
    try {
      const res = await axiosClient.post("/auth/login", formData);

      const token = res.data.token;
      dispatch({
        type: "SET_TOKEN_USER",
        payload: token,
      });
      return true;
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
      return false;
    }
  };

  const register = async (formData) => {
    try {
      const res = await axiosClient.post("/user/create", formData);

      const token = res.data.token;

      dispatch({
        type: "SET_TOKEN_USER",
        payload: token,
      });
      toast.success("Usuario registrado con exito", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      getCurrentUser();
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

  const checkToken = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch({
        type: "SET_IS_LOGGED_IN",
        payload: token,
      });
    }
  };

  const getCurrentUser = async () => {
    try {
      const res = await axiosClient.get("/user");

      const user = res.data.user;
      dispatch({
        type: "SET_CURRENT_USER",
        payload: user,
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

  const getAllUsers = async () => {
    try {
      const res = await axiosClient.get("/user/all");

      const UsersFromDB = res.data.users;

      dispatch({
        type: "GET_ALL_USERS",
        payload: UsersFromDB,
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

  const removeUser = async (dataForm) => {
    try {
      await axiosClient.delete(`/user/delete/${dataForm.email}`);
      getAllUsers();
      toast.success("Usuario eliminado con exito", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
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

  const changeRole = async (user) => {
    try {
      await axiosClient.post(`/user/edit`, user);
      toast.success("Rol cambiado", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      getAllUsers();
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
    <UsersContext.Provider
      value={{
        users: globalState.users,
        isLoggedIn: globalState.isLoggedIn,
        currentUser: globalState.currentUser,
        token: globalState.token,
        logOut,
        login,
        register,
        getAllUsers,
        removeUser,
        checkToken,
        getCurrentUser,
        changeRole,
      }}
    >
      {props.children}
    </UsersContext.Provider>
  );
};

export default UsersProvider;

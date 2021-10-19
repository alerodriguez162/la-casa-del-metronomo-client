import React, { useReducer } from "react";
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
      console.log(error);
      return false;
    }
  };

  const register = async () => {
    try {
      const res = await axiosClient.get("/auth/login");

      const token = res.data.token;

      dispatch({
        type: "SET_TOKEN_USER",
        payload: token,
      });
      getCurrentUser();
    } catch (error) {
      console.log(error);
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
      console.log(error);
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
      console.log(error);
    }
  };

  const removeUser = async (dataForm) => {
    try {
      await axiosClient.post("/api/Users/create", dataForm);
      return getAllUsers();
    } catch (error) {
      console.log(error);
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
      }}
    >
      {props.children}
    </UsersContext.Provider>
  );
};

export default UsersProvider;

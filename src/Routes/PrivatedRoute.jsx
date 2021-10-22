/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Redirect, Route } from "react-router-dom";
import useAuth from "../Hooks/isLoggedIn";

const PrivateRoute = ({ component: Component, ...props }) => {
  const { isLoggedIn } = useAuth();

  return (
    <Route
      {...props}
      render={(props) => {
        return isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />;
      }}
    />
  );
};

export default PrivateRoute;

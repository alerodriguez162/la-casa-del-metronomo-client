/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Redirect, Route } from "react-router-dom";
import useAuth from "../Hooks/isLoggedIn";

const AuthRoute = ({ component: Component, ...props }) => {
  const { isLoggedIn } = useAuth();

  return (
    <Route
      {...props}
      render={(props) => {
        return isLoggedIn ? <Redirect to="/" /> : <Component {...props} />;
      }}
    />
  );
};

export default AuthRoute;

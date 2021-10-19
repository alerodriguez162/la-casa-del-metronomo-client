/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import Admin from "../components/Admin";
import Categories from "../components/Admin/Categories";
import Products from "../components/Admin/Products";
import Users from "../components/Admin/Users";
import UsersContext from "../Context/UsersContext/UsersContext";

const AdminRoute = ({ ...props }) => {
  const usersCtx = useContext(UsersContext);

  const { currentUser, getCurrentUser } = usersCtx;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const verifyUser = async () => {
      await getCurrentUser();
      if (mounted) setLoading(false);
    };

    if (!currentUser) verifyUser();
    return function cleanup() {
      mounted = false;
    };
  }, [currentUser]);
  return (
    <Route
      {...props}
      render={(routeProps) => {
        if (loading) return null;
        return currentUser && currentUser.roles === "admin" ? (
          <>
            <Admin>
              <Route exact path={`${routeProps.match.url}/users`} component={Users} />
              <Route exact path={`${routeProps.match.url}/categories`} component={Categories} />
              <Route exact path={`${routeProps.match.url}/products`} component={Products} />
            </Admin>
          </>
        ) : (
          <Redirect to="/" />
        );
      }}
    />
  );
};

export default AdminRoute;

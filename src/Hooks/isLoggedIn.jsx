/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import UsersContext from "../Context/UsersContext/UsersContext";

const useAuth = () => {
  const usersCtx = useContext(UsersContext);

  const { isLoggedIn, currentUser, getCurrentUser, checkToken } = usersCtx;

  useEffect(() => {
    const verifyUser = async () => {
      await getCurrentUser();
    };

    const tokenCheck = async () => {
      await checkToken();
    };

    if (!currentUser && isLoggedIn) verifyUser();
    else tokenCheck();
  }, [currentUser, isLoggedIn]);

  return { isLoggedIn, currentUser };
};

export default useAuth;

const UsersReducer = (globalState, action) => {
  switch (action.type) {
    case "GET_ALL_USERS":
      return {
        ...globalState,
        users: action.payload,
      };
    case "SET_TOKEN_USER":
      localStorage.setItem("token", action.payload);

      return {
        ...globalState,
        isLoggedIn: true,
        token: action.payload,
      };
    case "SET_IS_LOGGED_IN":
      return {
        ...globalState,
        isLoggedIn: true,
        token: action.payload,
      };
    case "SET_CURRENT_USER":
      return {
        ...globalState,
        currentUser: action.payload,
      };
    case "CLOSE_SESSION":
      localStorage.removeItem("token");

      return {
        ...globalState,
        currentUser: null,
        isLoggedIn: false,
      };
    default:
      return globalState;
  }
};

export default UsersReducer;

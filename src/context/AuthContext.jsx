import { createContext, useReducer } from "react";

export const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case "SET_AUTH":
      return { isAuthenticated: action.payload };
    default:
      break;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    isAuthenticated: null,
  });

  const localStoredIsAuthenticated = localStorage.getItem("isAuthenticated");

  if (localStoredIsAuthenticated) {
    // setting auth information to global context from local stored auth
    // data
    state.isAuthenticated = JSON.parse(localStoredIsAuthenticated);
  }

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

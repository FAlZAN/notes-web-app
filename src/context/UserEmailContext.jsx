import { createContext, useReducer } from "react";

export const UserEmailContext = createContext();

const userEmailReducer = (state, action) => {
  switch (action.type) {
    case "SET_EMAIL":
      return { email: action.payload };
    default:
      break;
  }
};

export const UserEmailContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userEmailReducer, {
    email: null,
  });

  return (
    <UserEmailContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserEmailContext.Provider>
  );
};

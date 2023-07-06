import { createContext, useReducer } from "react";

export const NoteEditContext = createContext();

const noteEditReducer = (prevState, action) => {
  switch (action.type) {
    case "SET_NOTE":
      return { note: { ...action.payload } };
    case "RESET_NOTE":
      return { note: null };
    default:
      break;
  }
};

export const NoteEditContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(noteEditReducer, {
    note: null,
  });

  return (
    <NoteEditContext.Provider value={{ state, dispatch }}>
      {children}
    </NoteEditContext.Provider>
  );
};

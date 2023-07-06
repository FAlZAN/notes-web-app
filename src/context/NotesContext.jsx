import { createContext, useEffect, useReducer, useContext } from "react";
import axios from "axios";
// other context import
import { AuthContext } from "./AuthContext";

export const NotesContext = createContext();

function notesContextReducer(state, action) {
  switch (action.type) {
    case "SET_NOTES_INITIAL":
      return { notes: action.payload };
    case "SET_NOTES":
      return { notes: [action.payload, ...state.notes] };
    case "DELETE_NOTE":
      return {
        notes: state.notes.filter((note) => note._id !== action.payload._id),
      };
    default:
      break;
  }
}

export const NotesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notesContextReducer, {
    notes: [],
  });

  // auth context
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    async function getNotes() {
      try {
        const response = await axios.get(`/api/notes/${isAuthenticated?._id}`, {
          headers: {
            "x-access-token": isAuthenticated?.token,
          },
        });
        dispatch({ type: "SET_NOTES_INITIAL", payload: response.data });
      } catch (error) {
        console.log(error);
      }
    }

    if (isAuthenticated) {
      getNotes();
    }
  }, [isAuthenticated]);
  return (
    <NotesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </NotesContext.Provider>
  );
};

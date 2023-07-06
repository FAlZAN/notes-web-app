import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// context
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { NotesContextProvider } from "./context/NotesContext.jsx";
import { NoteEditContextProvider } from "./context/NoteEditContext.jsx";
import { UserEmailContextProvider } from "./context/UserEmailContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <UserEmailContextProvider>
        <NotesContextProvider>
          <NoteEditContextProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </NoteEditContextProvider>
        </NotesContextProvider>
      </UserEmailContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

import { useContext } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import "./App.css";
// components
import Nav from "./component/Nav";
import Back from "./component/Back";
// import NoteInput from "./component/NoteInput";
// pages
import Main from "./page/Main";
import Login from "./page/Login";
import Signup from "./page/Signup";
import Verify from "./page/Verify";

// context
import { AuthContext } from "./context/AuthContext";

function App() {
  const location = useLocation().pathname;

  // context
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="h-screen px-5 font-poppins  relative">
      <header>
        {isAuthenticated && <Nav />}
        {location === "/signup" && <Back />}
      </header>

      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? <Main /> : <Navigate replace to={"/login"} />
          }
        />
        <Route
          path="/login"
          element={!isAuthenticated ? <Login /> : <Navigate to={"/"} />}
        />
        <Route
          path="/signup"
          element={!isAuthenticated ? <Signup /> : <Navigate to={"/"} />}
        />
        <Route
          path="/verify"
          element={!isAuthenticated ? <Verify /> : <Navigate to={"/"} />}
        />
      </Routes>
    </div>
  );
}

export default App;

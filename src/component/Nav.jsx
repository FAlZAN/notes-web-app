import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
// context
import { AuthContext } from "../context/AuthContext";

function Nav() {
  const [options, setOptions] = useState(false);
  const navigate = useNavigate();

  // context
  const { isAuthenticated, dispatch } = useContext(AuthContext);

  function handleProfileClick() {
    setOptions(!options);
  }

  function handleLogout() {
    // remove isAuthenticated info from browser storage
    localStorage.removeItem("isAuthenticated");

    // remove isAuthenticated info from global context
    dispatch({ type: "SET_AUTH", payload: null });

    navigate("/login");
  }

  return (
    <div className="w-full  fixed top-0 left-0">
      <div className="bg-base-bg mx-5 py-2.5  relative">
        <div className="flex justify-between items-center gap-4">
          <span className="text-2xl font-medium">
            <p>Hi, {isAuthenticated?.name}</p>
          </span>

          <span
            className="w-14 h-14 rounded-full cursor-pointer"
            onClick={handleProfileClick}
          >
            <img
              className="rounded-full"
              src={`https://api.dicebear.com/6.x/initials/svg?seed=${isAuthenticated.name}`}
              alt="avatar"
            />
          </span>
        </div>

        {options && (
          <nav className="bg-base-bg text-xl py-1 rounded-md shadow hover:shadow-md shadow-accent-bg/20  absolute top-16 right-0">
            <ul>
              <li>
                <button
                  type="button"
                  className="px-10 py-2 hover:bg-balanced-bg/50"
                  onClick={handleLogout}
                >
                  logout
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
}

export default Nav;

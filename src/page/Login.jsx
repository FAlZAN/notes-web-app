import { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
// third-party import
import axios from "axios";
// context
import { UserEmailContext } from "../context/UserEmailContext";

function Login() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const { dispatch } = useContext(UserEmailContext);
  const navigate = useNavigate();
  const emailRef = useRef();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  function handleSignup() {
    navigate("/signup");
  }

  async function requestForOTP(email) {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/login`,
        {
          email: email,
        }
      );

      if (response.status === 200) {
        navigate("/verify");
      }
    } catch (error) {
      setError(error.response.data.error);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    requestForOTP(email);
    dispatch({ type: "SET_EMAIL", payload: email });
  }

  return (
    <main className="h-screen  flex justify-center items-center">
      <div className="w-full max-w-lg  flex flex-col gap-20">
        <p className="text-4xl font-medium">
          Welcome back! Glad to see you, Again!
        </p>

        <form
          className="text-xl font-medium  flex flex-col gap-5"
          onSubmit={(event) => handleSubmit(event)}
        >
          <input
            className="px-5 py-4 border-2 border-balanced-bg rounded-lg focus:outline-none"
            type="email"
            placeholder="Email"
            ref={emailRef}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {error && (
            <div className="py-2 bg-red-100 border border-red-200 text-base rounded-md text-center pointer-events-none">
              {error}
            </div>
          )}

          <input
            className="bg-accent-bg py-4 text-base-bg rounded-lg cursor-pointer"
            type="submit"
            value={!email ? "Login" : "Send Code"}
          />
        </form>

        <p className="text-center font-medium">
          <span className="text-accent-bg/60">Dont have an account ?</span>{" "}
          <button onClick={handleSignup}> Sign up</button>
        </p>
      </div>
    </main>
  );
}

export default Login;

import { useRef, useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
// third-party import
import axios from "axios";
// context
import { UserEmailContext } from "../context/UserEmailContext";

function Signup() {
  const firstNameRef = useRef();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const { dispatch } = useContext(UserEmailContext);
  const navigate = useNavigate();

  useEffect(() => {
    firstNameRef.current.focus();
  }, []);

  async function handleSignup(event) {
    event.preventDefault();
    console.log("sign up form submitted.");
    requestForSignup({
      firstName,
      lastName,
      email,
    });
  }

  async function requestForSignup(data) {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/signup`,
        { ...data }
      );
      console.log(response);

      if (response.status === 201) {
        console.log("this is after successfull signup");
        requestForLogin(data.email);
        // setting email on global context for verification process
        dispatch({ type: "SET_EMAIL", payload: data.email });
        // navigating to verify page
        navigate("/verify");
      }
    } catch (error) {
      console.log(error);
      setError(error.response.data.error);
    }
  }

  async function requestForLogin(email) {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/login`,
        { email }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main className="h-screen  flex justify-center items-center">
      <div className="w-full max-w-lg  flex flex-col gap-10">
        <p className="text-4xl font-medium">Welcome! It’s good to see you!</p>

        <form
          className="text-xl font-medium  flex flex-col gap-5"
          onSubmit={handleSignup}
        >
          <input
            className="px-5 py-4 border-2 border-balanced-bg rounded-lg focus:outline-none"
            type="text"
            placeholder="First Name"
            required
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            ref={firstNameRef}
          />
          <input
            className="px-5 py-4 border-2 border-balanced-bg rounded-lg focus:outline-none"
            type="text"
            placeholder="Last Name"
            required
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
          <input
            className="px-5 py-4 border-2 border-balanced-bg rounded-lg focus:outline-none"
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          {error && (
            <div className="py-2 bg-red-100 border border-red-200 text-base rounded-md text-center pointer-events-none">
              {error}
            </div>
          )}

          <input
            className="bg-accent-bg py-4 text-base-bg rounded-lg cursor-pointer"
            type="submit"
            value="Sign up"
          />
        </form>
      </div>
    </main>
  );
}

export default Signup;

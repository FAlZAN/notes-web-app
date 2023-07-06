import { useRef, useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
// third-party import
import axios from "axios";
// context
import { UserEmailContext } from "../context/UserEmailContext";
import { AuthContext } from "../context/AuthContext";

function Verify() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  // context
  const { email } = useContext(UserEmailContext);
  const { dispatch } = useContext(AuthContext);
  // ref
  const submitBtnRef = useRef();

  useEffect(() => {
    if (otp.length === 6) {
      submitBtnRef.current.removeAttribute("disabled");
    } else {
      submitBtnRef.current.setAttribute("disabled", "");
    }
  }, [otp]);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await axios.post("/api/users/login/verify", {
        email,
        otp,
      });

      if (response.status === 200) {
        // setting auth information to global context
        dispatch({ type: "SET_AUTH", payload: response.data });

        // storing auth information to browser storage, so that user does not
        // have to login again unless logged out
        localStorage.setItem("isAuthenticated", JSON.stringify(response.data));

        // navigating to main page after auth information is set to global
        // context as user is authenticated
        navigate("/");
      }
    } catch (error) {
      setError(error.response.data.error);
      console.log(error);
    }
  }

  return (
    <main className="h-screen  flex justify-center items-center">
      <div className="w-full max-w-lg  flex flex-col gap-10">
        <div className="flex flex-col gap-5">
          <p className="text-4xl font-medium">OTP Verification</p>
          <p className="text-accent-bg/60 text-xl font-medium">
            Enter the verification code we just sent on your email address.
          </p>
        </div>

        <form
          className="text-xl font-medium  flex flex-col gap-5"
          onSubmit={handleSubmit}
        >
          <div className="flex justify-between">
            <input
              className="w-full py-4 text-center border-2 border-balanced-bg rounded-md focus:outline-none"
              type="text"
              maxLength={6}
              placeholder="- - - - - -"
              value={otp}
              onChange={(event) => setOtp(event.target.value)}
            />
          </div>

          {error && (
            <div className="py-2 bg-red-100 border border-red-200 text-base rounded-md text-center pointer-events-none">
              {error}
            </div>
          )}

          <input
            className={`${
              otp.length < 6
                ? "bg-balanced-bg cursor-not-allowed"
                : "bg-accent-bg cursor-pointer"
            } py-4 text-base-bg rounded-md`}
            type="submit"
            value="Continue"
            disabled
            ref={submitBtnRef}
          />
        </form>
      </div>
    </main>
  );
}

export default Verify;

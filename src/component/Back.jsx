import { useNavigate } from "react-router-dom";
// asset
import back from "../assets/back-dark.svg";

function Back() {
  const navigate = useNavigate();

  function handleBack() {
    navigate("/");
  }

  return (
    <div className="w-full  fixed top-0 left-0">
      <div className="bg-base-bg mx-5 py-2.5">
        <div className="flex items-center gap-4">
          <button
            className="w-16 h-16 rounded-md  flex justify-start items-center"
            type="button"
            onClick={handleBack}
          >
            <img src={back} alt="back button" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Back;

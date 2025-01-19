import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, reset } from "../features/auth/authSlice";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [userScore, setUserScore] = useState(null); // State to store user score
  const [loading, setLoading] = useState(true); // State for loading

  const onLogout = () => {
    toast.success("Logged out successfully");
    setTimeout(() => {
      dispatch(logout());
      dispatch(reset());

      navigate("/login");
    }, 2000);
  };

  // Extract `name` and `avatar` or set defaults
  const userName = user?.name || "Guest";
  const avatar = user?.avatar || "/default-avatar.png"; // Default avatar if none provided

  useEffect(() => {
    const fetchUserScore = async () => {
      try {
        // API call to fetch the user score

        const response = await axios.get(
          `https://quiz-app-backend-black.vercel.app/score/?userName=${user?.name}`
        );

        setUserScore(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user score:", error);
        setLoading(false);
      }
    };

    if (user?._id) {
      fetchUserScore();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center mt-28 items-center flex-col">
        <div className="loader border-t-4 border-blue-500 border-solid rounded-full w-16 h-16 animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col text-center items-center justify-center mt-28 ">
      <ToastContainer />
      <div>
        <img src={avatar} alt="" className="w-48 rounded-full" />
      </div>

      <div>
        <h4 className="text-3xl uppercase dark:text-pink-500 font-bold mt-5">
          {userName}
        </h4>

        {userScore ? (
          <p className="mt-4 text-lg font-bold dark:text-sky-500">
            Current score: <span className="font-bold">{userScore.score}</span>
          </p>
        ) : (
          <p className="mt-4 text-lg dark:text-gray-400">
            Score data not available
          </p>
        )}

        <button
          type="button"
          onClick={onLogout}
          className="focus:outline-none mt-7 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-bold rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          LogOut
        </button>
      </div>
    </div>
  );
}

export default Profile;

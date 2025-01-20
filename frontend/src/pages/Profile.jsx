/* eslint-disable no-unused-vars */
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
  const [leaderboard, setLeaderboard] = useState([]); // State to store leaderboard data
  const [userRank, setUserRank] = useState(null); // State to store user rank
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
    const fetchUserData = async () => {
      try {
        // Fetch user score
        const scoreResponse = await axios.get(
          `https://quiz-app-backend-black.vercel.app/score/?userName=${user?.name}`
        );
        setUserScore(scoreResponse.data);

        // Fetch leaderboard data
        const leaderboardResponse = await axios.get(
          `https://quiz-app-backend-black.vercel.app/leaderboard`
        );
        setLeaderboard(leaderboardResponse.data);

        // Determine user rank
        const sortedLeaderboard = leaderboardResponse.data.sort(
          (a, b) => b.score - a.score
        );
        const rank = sortedLeaderboard.findIndex(
          (entry) => entry.userName === user?.name
        );
        setUserRank(rank + 1); 

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    if (user?._id) {
      fetchUserData();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex h-screen justify-center items-center flex-col">
        <div className="loader border-t-4 border-blue-500 border-solid rounded-full w-16 h-16 animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen text-center items-center justify-center">
      <ToastContainer />
      <div>
        <img src={avatar} alt="user_avatar" className="w-48 rounded-full" />
      </div>

      <div>
        <h4 className="text-3xl uppercase dark:text-pink-500 font-bold mt-5">
          {userName}
        </h4>

        {userScore ? (
          <>
            <p className="mt-4 text-lg md:text-3xl font-bold text-sky-500">
              Current score: <span className="font-bold">{userScore.score}</span>
            </p>
            {userRank ? (
              <p className="mt-2 text-lg md:text-3xl font-bold text-green-500">
                Your ranking: #{userRank}
              </p>
            ) : (
              <p className="mt-2 text-lg text-gray-400">
                Ranking data not available
              </p>
            )}
          </>
        ) : (
          <p className="mt-4 text-lg dark:text-pink-400">
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

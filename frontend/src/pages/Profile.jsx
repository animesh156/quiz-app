/* eslint-disable no-unused-vars */
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import API from '../utils/api'
import { toast, ToastContainer } from "react-toastify";

function Profile() {
 
  const navigate = useNavigate();
  

  const [userScore, setUserScore] = useState(null); // State to store user score
  const [leaderboard, setLeaderboard] = useState([]); // State to store leaderboard data
  const [userRank, setUserRank] = useState(null); // State to store user rank
  const [loading, setLoading] = useState(true); // State for loading

  const onLogout = async() => {

    try {
   await API.post('user/logout', {},{withCredentials:true})
      toast.success("Logged out successfully");

      localStorage.removeItem("isAuthenticated");
     localStorage.removeItem("avatar")
      localStorage.removeItem("userName");

      setTimeout(() => {
      
        navigate("/login");
      }, 2000);
      
    } catch (error) {
      toast.error("Logout failed. Please try again");
     
      console.log(error)
    }
   
  };

  // Extract `name` and `avatar` or set defaults
  const userName =  localStorage.getItem("userName") || "Guest";
  const avatar = localStorage.getItem("avatar") || "/default-avatar.png"; // Default avatar if none provided

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user score
        const scoreResponse = await API.get(
          `/score/?userName=${userName}`
        );
        setUserScore(scoreResponse.data);

        // Fetch leaderboard data
        const leaderboardResponse = await API.get(
          `/leaderboard`
        );
        setLeaderboard(leaderboardResponse.data);

        // Determine user rank
        const sortedLeaderboard = leaderboardResponse.data.sort(
          (a, b) => b.score - a.score
        );
        const rank = sortedLeaderboard.findIndex(
          (entry) => entry.userName === userName
        );
        setUserRank(rank + 1); 

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    // if (user?._id) {
    //   fetchUserData();
    // }
    fetchUserData()
  }, []);

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

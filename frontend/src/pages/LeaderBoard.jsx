import { FaTrophy } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import { BorderBeam } from "@stianlarsen/border-beam";

function LeaderBoard() {
  const [userScores, setUserScores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserScore = async () => {
      try {
        const response = await axios.get(
          "https://quiz-app-backend-black.vercel.app/leaderboard"
        );

        if (!response.data) throw new Error("client error");
        setUserScores(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching quiz data:", err);
      }
    };
    getUserScore();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader border-t-4 border-blue-500 border-solid rounded-full w-16 h-16 animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="h-screen  p-4 md:p-0">
      <div className="m-auto mt-8 flex items-center justify-center gap-x-4 w-auto rounded-3xl border-2  bg-gradient-to-r from-blue-400 to-sky-700 py-4  md:max-w-lg  text-black">
      <FaTrophy className=" text-yellow-400" size={28} />
        <p className="text-center text-2xl font-extrabold">LeaderBoard</p>
      </div>

      <div className="m-auto mt-6 md:max-w-5xl h-96 mb-3 overflow-y-scroll px-2 dark:text-orange-400">
        {userScores.map((user, index) => (
          <li
            key={index}
            className="mt-8 relative m-auto flex justify-evenly items-center rounded-xl border-2 mb-4 dark:border-black dark:bg-neutral-900 py-2 text-center bg-gradient-to-r from-cyan-500 to-cyan-200 dark:text-orange-500 overflow-hidden"
          >
            {/* Restrict BorderBeam Overflow */}
            <div className="absolute inset-0 overflow-hidden">
              <BorderBeam duration={10} size={400} borderWidth={3} />
            </div>
            <div className="flex flex-row items-center basis-1/4 flex-shrink-0 gap-x-1">
              <div className="w-9 rounded-full  font-bold bg-slate-900  text-white text-center flex-shrink-0 flex-grow-0">
                {index + 1}
              </div>
              {index === 0 && (
                <div className="py-3 px-2 flex-shrink-0 flex-grow-0">
                  <FaTrophy className="size-5 text-yellow-400" />
                </div>
              )}
            </div>

            <div className="text-1xl text-neutral-950 font-bold basis-1/4 uppercase font-serif text-center">
              {user.userName}
            </div>

            <div className="rounded-2xl basis-1/4 border-2  border-black bg-pink-200 font-bold dark:bg-slate-900 text-center">
              {user.score}
            </div>
          </li>
        ))}
      </div>
    </div>
  );
}

export default LeaderBoard

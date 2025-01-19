/* eslint-disable react/prop-types */
import { MdCelebration } from "react-icons/md";
import { ImSad } from "react-icons/im";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";


const Result = ({ score, totalQuestions }) => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  
  return (
    <div className="text-center min-h-screen flex justify-center items-center mx-auto  flex-col overflow-hidden">
      {/* Confetti Effect for Every Score */}
      <Confetti className="w-full" />

      {score === totalQuestions ? (
        <div>
          <p className="text-4xl -mt-5 mb-7 font-extrabold text-green-700">
            Congratulations {user?.name || "Player"}!
          </p>
          <MdCelebration className="m-auto size-20 text-pink-600" />
        </div>
      ) : (
        <div>
          <p className="text-4xl -mt-5 mb-7 font-extrabold text-red-600">
            Better Luck Next Time, {user?.name || "Player"}!
          </p>
          <ImSad className="m-auto size-20 text-red-500" />
        </div>
      )}

      <p className="text-3xl font-bold mt-12 dark:text-cyan-300">
        Your Score: {score}/{totalQuestions}
      </p>

      <button
        type="button"
        className="text-white font-bold w-36 bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 shadow-lg shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 rounded-lg text-sm px-5 py-2.5 text-center mt-10 me-2"
        onClick={() => navigate("/dashboard")}
      >
        Play Again
      </button>
    </div>
  );
};

export default Result;

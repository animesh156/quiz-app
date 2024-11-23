import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { TypeAnimation } from "react-type-animation";

function Home() {
  const navigate = useNavigate();
  const [textColor, setTextColor] = useState("red");

  function handleClick() {
    navigate('/register');
  }

  return (
    <div className="flex flex-col items-center md:flex-row justify-around h-screen "> {/* Flexbox for centering */}
      <div className="text-center">
        <h1 className="text-5xl mt-5 font-extrabold md:text-6xl  " style={{color: textColor}}>Quizie</h1>
        {/* Animated Text */}
        <div
          style={{ color: textColor,width: "300px" }}
          className="h-24 text-2xl mt-12 font-light  md:font-medium"
        >
          <TypeAnimation
            sequence={[
              "Quiz. Play. Win!",
              1000,
              () => setTextColor("blue"),
              "Challenge your brain!",
              1000,
              () => setTextColor("deeppink"),
              "Fun quizzes, fast results!",
              1000,
              () => setTextColor("orange"),
              "Your quiz journey starts!"
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </div>

        {/* Login Button */}
        <button
          type="button"
          onClick={handleClick}
          className="text-white font-bold bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80  rounded-lg text-sm px-5 py-2.5 mt-5"
        >
          Play Now
        </button>
      </div>

      <div>
      <img
          src="/home.webp"
          alt="Light Mode"
          className="w-80 dark:hidden" // Shown in light mode
        />
        <img
          src="/dark_home.png"
          alt="Dark Mode"
          className="w-80 hidden dark:block" // Shown in dark mode
        />
      </div>
    </div>
  );
}

export default Home;
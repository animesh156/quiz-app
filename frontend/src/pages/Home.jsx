import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { TypeAnimation } from "react-type-animation";
import {useSelector} from 'react-redux'

function Home() {
  const navigate = useNavigate();
  const {user} = useSelector((state) => state.auth)
  const [textColor, setTextColor] = useState("red");

  if(user) navigate('/dashboard')

  function handleClick() {
    navigate('/register');
  }



  return (
    <div className="flex  w-full flex-col bg-cover bg-center items-center md:flex-row justify-around h-screen"
    style={{backgroundImage:"url('/home.jpg')"}}
    > {/* Flexbox for centering */}
      <div className="text-center">
        <h1 className="text-5xl mt-5 font-extrabold md:text-8xl text-white" >Quizie</h1>
        {/* Animated Text */}
        <div
  style={{
    color: textColor,
    width: "300px",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)", // Add subtle shadow
  }}
  className="h-24 text-2xl mt-12 font-light md:font-medium"
>
  <TypeAnimation
    sequence={[
      "Quiz. Play. Win!",
      1000,
      () => setTextColor("white"), // Vibrant color
      "Challenge your brain!",
      1000,
      () => setTextColor("yellow"), // Eye-catching color
      "Fun quizzes, fast results!",
      1000,
      () => setTextColor("lightpink"), // Light tone
      "Your quiz journey starts!",
    ]}
    wrapper="span"
    speed={50}
    repeat={Infinity}
  />
</div>


<button
  type="button"
  onClick={handleClick}
  className="text-white font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-yellow-300 shadow-lg rounded-lg text-sm px-5 py-2.5 mt-5"
>
  Play Now
</button>

      </div>

      <div>
      <img
          src="/chest.png"
          alt="Light Mode"
          className="w-80" 
        />
       
      </div>
    </div>
  );
}

export default Home;
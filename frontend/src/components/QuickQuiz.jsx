import { quickQuizData } from "../utils/quickQuizData";
import { motion } from "framer-motion";
import useQuizStore from "../store";
import { useNavigate } from "react-router-dom";

function QuickQuiz() {
  const { setCategory, setDifficulty, setTotalQuestions, setType } =
    useQuizStore();

  const animationSettings = {
    initial: { x: -200, opacity: 0 }, // Start off-screen to the left and invisible
    animate: { x: 0, opacity: 1 }, // Move into view and become visible
    transition: { type: "spring", stiffness: 50 }, // Spring animation
  };

  const navigate = useNavigate();

  const handleClick = (val) => {
    // Set quiz options in one go
    setCategory(val);
    setDifficulty("easy");
    setType("multiple");
    setTotalQuestions(5);

    // console.log(val);

    navigate("/quiz");

    // Optional: reset category after 3s if really needed
    setTimeout(() => {
      setCategory("17");
    }, 3000);
  };

  return (
    <>
      <div className="flex flex-wrap gap-x-8 gap-y-4   justify-center ">
        {quickQuizData.map((quizData, index) => (
          <motion.div
            className="card cursor-pointer  bg-neutral-900 hover:shadow-lg hover:shadow-cyan-500 mb-7 md:h-72 md:w-80 shadow-xl"
            onClick={() => handleClick(quizData.category)}
            key={index}
            {...animationSettings}
            transition={{
              ...animationSettings.transition,
              delay: 0.6 + index * 0.1, // Stagger each card animation
            }}
          >
            <figure className="px-10 pt-7">
              <img
                src={quizData.image}
                alt="sports_img"
                className="w-40 h-40"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title text-sky-500 text-2xl font-bold">
                {quizData.title}
              </h2>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}

export default QuickQuiz;

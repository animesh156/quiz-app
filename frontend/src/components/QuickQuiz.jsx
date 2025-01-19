import { quickQuizData } from "../utils/quickQuizData";
import { motion } from "framer-motion";

function QuickQuiz() {
  const animationSettings = {
    initial: { x: -200, opacity: 0 }, // Start off-screen to the left and invisible
    animate: { x: 0, opacity: 1 }, // Move into view and become visible
    transition: { type: "spring", stiffness: 50 }, // Spring animation
  };

  return (
    <div className="h-screen mt-11">

<div className="flex flex-wrap gap-x-8 gap-y-4   justify-center ">
      {quickQuizData.map((quizData, index) => (
        <motion.div
          className="card cursor-pointer  bg-neutral-900 hover:shadow-lg hover:shadow-cyan-500 mb-7 md:h-72 md:w-80 shadow-xl"
          key={index}
          {...animationSettings}
          transition={{
            ...animationSettings.transition,
            delay: 0.6 + index * 0.1, // Stagger each card animation
          }}
        >
          <figure className="px-10 pt-7">
            <img src={quizData.image} alt="sports_img" className="w-40 h-40" />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title text-sky-500 text-2xl font-bold">
              {quizData.title}
            </h2>
          </div>
        </motion.div>
      ))}
    </div>

    </div>
   
  );
}

export default QuickQuiz;

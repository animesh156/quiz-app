/* eslint-disable react/prop-types */
import { MdCelebration } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ImSad } from "react-icons/im";


const Result = ({ score, totalQuestions }) => {
    const { user } = useSelector((state) => state.auth)

    
    const navigate = useNavigate()
  
      
    
    
  return (
    <>
   
    <div>
      <h2 className="text-2xl dark:text-violet-800">Quiz Completed!</h2>
      {score === totalQuestions ? <div >
        <p className="text-3xl mt-10 mb-5 font-bold text-green-700">Congratulations {user.name}</p> 
        <MdCelebration className="m-auto size-20 text-pink-600" />
      </div> 
        : <div>
            <p className="text-2xl mt-10 mb-5 font-bold text-red-600">Bad Luck {user.name}</p>
                <ImSad className="m-auto size-20 text-red-500" />
            </div>
            }

      <p className="text-3xl font-bold mt-12 dark:text-cyan-300">Your Score: {score}/{totalQuestions}</p>
    </div>

    
    <button type="button" className="text-white font-serif bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 shadow-lg shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-10 me-2 " onClick={() => navigate('/') }>Play Again</button>
    </>
  );
};

export default Result;

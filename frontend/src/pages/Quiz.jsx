/* eslint-disable react/prop-types */
import  { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Result from '../components/Result'
import Spinner from '../components/Spinner';
import axios from 'axios';



const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [timer, setTimer] = useState(15);


   const category = useSelector((state) => state.quizOptions.category);
  const difficulty = useSelector((state) => state.quizOptions.difficulty);
  const totalQuestion = useSelector((state) => state.quizOptions.totalQuestion);
  const type = useSelector((state) => state.quizOptions.type);


  // Shuffle function for the answers
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const handleQuizCompletion = () => {
    setIsQuizFinished(true);
  setUserScore(score);
  };

  // Fetch quiz data when the component mounts
  useEffect(() => {
    const getQuizData = async () => {
      try {
        const response =  await axios.get(`http://localhost:4000/quiz?amount=${totalQuestion}&category=${category}&difficulty=${difficulty}&type=${type}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        if(!response.data) throw new Error('client error')
          
        const quizQuestions = response.data.results
       

        if (quizQuestions && Array.isArray(quizQuestions)) {
          const formattedQuestions = quizQuestions.map((question) => {
            const answers = shuffleArray([
              ...question.incorrect_answers,
              question.correct_answer,
            ]);
            return { ...question, answers };
          });

          setQuestions(formattedQuestions);
        } else {
          console.error("Quiz data is not in the expected format.");
        }

      } catch (err) {
        console.error("Error fetching quiz data:", err);
      }
    };

    getQuizData();
  }, []);  


  useEffect(() => {
    if (timer === 0) {
      
      handleNextQuestion();
      return;
    }

    const countdown = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    // Cleanup the interval when the component unmounts or when the timer is reset
    return () => clearInterval(countdown);
  }, [timer]);

  useEffect(() => {
    setTimer(15);
  }, [currentQuestionIndex,questions]);





  // Handle the user's answer selection
  const handleAnswer = (isCorrect,index) => {
   
    if (isCorrect) setScore(score + 1);
  
    handleNextQuestion(index)

  }

    // Move to the next question or finish the quiz
    const handleNextQuestion = () => {

   
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
              
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      handleQuizCompletion()
    }
  }

    const getToken = () => {
    const user = localStorage.getItem('user');  // Retrieve the user object from localStorage
    if (user) {
      const parsedUser = JSON.parse(user);      // Parse the JSON string back into an object
      return parsedUser.token;                  // Access the token from the parsed object
    }
    return null;  // Return null if there's no user data
  };
  
  
  
  const token = getToken()

  const user = localStorage.getItem('user')
  const userid = JSON.parse(user)._id
  const userName = JSON.parse(user).name

const setUserScore = async(score) => {
  try {
    const res = await axios.post('http://localhost:4000/score', {score,userid,userName}, {headers: {
     'Authorization': `Bearer ${token}`
   }})
      if(res.data) return true
   } catch (error) {
     console.log(`Error sending user score`,error)
     return false
   }
 }

  

 
  

  if (!questions.length) {
    return <Spinner />
  }



  if (isQuizFinished) {
   
    return <Result score={score} totalQuestions={questions.length} />
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className='border-cyan-50 shadow-md shadow-green-500 border-2 bg-gradient-to-r from-cyan-300 to-pink-400 w-auto m-auto rounded-lg'>
      <h2 className='text-2xl font-bold mt-3'>Question {currentQuestionIndex + 1} of {questions.length}</h2>
      <div className='border-black border-2 mt-8 bg-gray-50 w-auto px-3 py-2 rounded-2xl max-w-md m-auto overflow-auto'>
      <h3 className='dark:text-red-500 font-bold'>{currentQuestion.question}</h3>
      </div>
      
      <div className='grid grid-cols-1 md:grid-cols-2 mt-2 gap-y-5 gap-x-4 content-center max-h-max md:h-60 ' >
        {currentQuestion.answers.map((answer, index) => (
        
          <button
          key={index}
          className='border-cyan-100 hover:shadow-md hover:shadow-orange-400 bg-slate-50  font-semibold dark:text-pink-600 border-2 w-64 max-w-md  overflow-auto px-2 py-2 mt-4 rounded-2xl m-auto'
            
            onClick={() => handleAnswer(answer === currentQuestion.correct_answer,index)}
           
          >
            {answer}
          </button>
          
        ))}
       
      </div>
      <div className=' mb-2 mt-5'>{timer < 4 ? <h3 className='text-5xl font-bold text-red-600 '>{timer}</h3> : <h3 className='text-5xl font-bold dark:text-white '>{timer}</h3>}</div>
    </div>
  );
};

export default Quiz;

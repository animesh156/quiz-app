/* eslint-disable react/prop-types */
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {setCategory, setDifficulty, setTotalQuestions, setType} from '../features/quizSlice'

import Spinner from '../components/Spinner'


import { reset } from '../features/auth/authSlice'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

 


  const { user, isLoading, isError, message } = useSelector((state) => state.auth)
 

  useEffect(() => {
    
    if (!user) {
      navigate('/login')
    }
   
   
    if (isError) {
      console.log(message)
    }
   

   

    return () => {
      dispatch(reset())
    }
  }, [user, navigate,isError,message,  dispatch])

  if (isLoading) {
    return <Spinner />
  }

  const onSubmit = (e) => {
    e.preventDefault()
      
      
    
    navigate('/quiz')
   
  }

  return (
    
    <>
    
    
   

   
    <section className='heading'>
      <h1 className='text-3xl dark:text-rose-700'>Welcome {user && user.name}</h1>
    </section>

    <form className="max-w-md mx-auto border-cyan-300 border-2 px-5 py-3 rounded-2xl shadow-md shadow-pink-400" onSubmit={onSubmit}>
<label
  htmlFor="small"
  className="block mb-2 text-sm  text-gray-900 dark:text-orange-400 font-semibold font-mono"
>
  Category
</label>
<select
  id="small" onChange={(e) => dispatch(setCategory(e.target.value))}
  className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
>
 
<option selected value="17">Science</option>
  <option  value="23">History</option>
 
  <option value="21">Sports</option>
  <option value="27">Animal</option>
  <option value="20">Mythology</option>
 
</select>


<label
  htmlFor="small"
  className="block mb-2 text-sm font-mono text-gray-900 dark:text-orange-400 font-semibold"
>
  Difficulty
</label>
<select
  id="small"
  onChange={(e) => dispatch(setDifficulty(e.target.value))}
  className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
>
 
  <option selected="" value="easy">Easy</option>
  <option value="medium">Medium</option>
  <option value="hard">Hard</option>
 
</select>

<label
  htmlFor="small"
  className="block mb-2 text-sm font-semibold font-mono  text-gray-900 dark:text-orange-400"
>
  Total Question
</label>
<select
  id="small"
  onChange={(e) => dispatch(setTotalQuestions(e.target.value))}
  className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
>

  <option selected="" value="5">5</option>
  <option value="10">10</option>
  <option value="15">15</option>
  <option value="20">20</option>
</select>

<label
  htmlFor="small"
  className="block mb-2 text-sm font-semibold font-mono text-gray-900 dark:text-orange-400"
>
  Type
</label>
<select
  id="small"
  onChange={(e) => dispatch(setType(e.target.value))}
  className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
>

  <option selected="" value="multiple">Multiple Choice</option>
  <option value="boolean">True or False</option>
  
</select>



<button type="submit" className="text-black font-mono bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Start Quiz</button>

</form> 



</>
    
  

  )
}

export default Dashboard

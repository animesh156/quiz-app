import { FaTrophy } from 'react-icons/fa'
import { useEffect,useState } from 'react'
import axios from 'axios'
import Spinner from '../components/Spinner'

function LeaderBoard() {
  const [userScores, setUserScores] = useState([])
  const [loading,setLoading] = useState(true)


  useEffect(() => {
    const getUserScore = async () => {
      try{
        const response = await axios.get('https://quiz-app-backend-black.vercel.app/leaderboard')
     
        if(!response.data) throw new Error('client error')
          setUserScores(response.data)
        setLoading(false)
      } catch (err) {
        console.error("Error fetching quiz data:", err);
      }
   

    }
    getUserScore()
  },[])

if(loading) return <Spinner />
  return (
    <>
    <div className="m-auto mt-5 w-auto rounded-3xl border-2 border-slate-500 bg-slate-100 py-6 md:max-w-lg dark:bg-black dark:text-orange-500">
      <p className="text-center text-2xl font-extrabold">LeaderBoard</p>
    </div>
   
    <div  className="m-auto mt-8  h-96  dark:text-orange-400 overflow-y-auto ">

    {userScores.map((user,index) => (
     <li key={index} className="mb-4 mt-4 md:max-w-lg m-auto flex justify-around  items-center  rounded-xl border-2 border-black py-3 text-center bg-zinc-100 dark:bg-black dark:text-orange-500">
  
     <div className="flex flex-row items-center justify-evenly flex-shrink-0 gap-x-2  ">
       <div className="w-9 rounded-full bg-cyan-200 font-bold dark:bg-slate-900 text-center flex-shrink-0 flex-grow-0">
         {index + 1}
       </div>
       {index === 0 && (
         <div className="py-3 px-2 flex-shrink-0 flex-grow-0">
           <FaTrophy className="size-5 text-yellow-400" />
         </div>

       )}
        <div className="py-3 hidden px-2 flex-shrink-0 flex-grow-0">
           <FaTrophy className="size-5 text-yellow-400" />
         </div>

     </div>
     
     <div className="text-1xl font-bold flex-shrink-0 max-w-60 w-52  text-center">
       {user.userName}
     </div>
     
     <div className="max-w-md w-20 rounded-2xl  border-2 border-black bg-cyan-100 font-bold dark:bg-slate-900 ml-3 flex-shrink-0  text-center">
       {user.score}
     </div>
   </li>
   
    ))}

    </div>

  </>
  
  )
}

export default LeaderBoard

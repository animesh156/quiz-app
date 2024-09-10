import { FaTrophy } from 'react-icons/fa'
import { useEffect,useState } from 'react'
import axios from 'axios'
import Spinner from '../components/Spinner'

function LeaderBoard() {
  const [userScores, setUserScores] = useState([])
  const [loading,setLoading] = useState(true)
  fetch()
  .then(res => res.json())
  .then(data => setUserScores(data))
  .catch(err => console.log(err))

  useEffect(() => {
    const getUserScore = async () => {
      try{
        const response = await axios.get('http://localhost:4000/leaderboard')
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
      <li key={index} className="mb-4 mt-4 md:max-w-lg m-auto  flex justify-around gap-8 items-center rounded-full border-2 border-slate-50 py-3 text-center dark:bg-black dark:text-orange-500">
      
      <div className='flex flex-row items-center grow-0' >
      <div className="w-9 rounded-full bg-slate-100 font-bold dark:bg-slate-900 text-center grow-0">
          {index+1} 
        </div>
        {index === 0 ?  <div className='py-3 px-2 ml-2'><FaTrophy className='size-5 text-yellow-400'/></div> : <></> }
        
        </div>  
        <div className="text-1xl font-bold grow-0">{user.userName}</div>
        <div className="w-20 rounded-2xl border-2 border-black font-bold dark:bg-slate-900 ml-3 grow-0">
          {user.score}
        </div>
      </li>
    ))}

    </div>

  </>
  
  )
}

export default LeaderBoard
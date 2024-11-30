import {  useDispatch } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { logout, reset } from '../features/auth/authSlice'
import { useSelector } from 'react-redux'

function Profile() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    
    navigate('/login')
  }


  // Extract `name` and `avatar` from localStorage or set defaults
  const userName = user?.name || "Guest";
  const avatar = user?.avatar ||  "/default-avatar.png"; // Use a default avatar if none is provided


  return (
    <div className='flex-col flex mt-24 items-center text-center'>

    <div>
      <img src={avatar} alt="" className='w-48' />
    </div>

    <h4 className='text-3xl dark:text-pink-500 font-bold mt-5'>{userName}</h4>
    
    <button
      type="button"
      onClick={onLogout}
      className="focus:outline-none mt-7 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-bold rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
    >
      LogOut
    </button>
    
    </div>
  )
}

export default Profile
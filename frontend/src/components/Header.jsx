import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'


function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  return (
    <header className='header'>
     <div className='logo'>
        {location.pathname === '/leaderBoard' ? (  <Link to='/' className='text-yellow-400'>DashBoard</Link>) : (
            <Link to='/leaderBoard' className='text-yellow-400'>LeaderBoard</Link>
        )
       
        }
      </div>
      <ul>
        {user ? (
          <li>
            <button className='btn text-red-700' onClick={onLogout} >
              <FaSignOutAlt /> Logout
            </button>
          </li>
        ) : (
          <>
            <li >
              <Link to='/login' className='text-cyan-500 :hover:text-cyan-400'>
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li >
              <Link to='/register' className='text-rose-600 hover:text-rose-500'>
                <FaUser /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  )
}

export default Header

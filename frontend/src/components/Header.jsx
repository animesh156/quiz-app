import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'

function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  return (
    <header className='header'>
     <div className='logo'>
        <Link to='/' className='dark:text-yellow-400'>Dashboard</Link>
      </div>
      <ul>
        {user ? (
          <li>
            <button className='btn dark:text-red-700' onClick={onLogout} >
              <FaSignOutAlt /> Logout
            </button>
          </li>
        ) : (
          <>
            <li >
              <Link to='/login' className='dark:text-cyan-500 dark:hover:text-cyan-400'>
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li >
              <Link to='/register' className='dark:text-rose-600 dark:hover:text-rose-500'>
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
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { register, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const { name, email, password } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      console.log(message)
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

   
      const userData = {
        name,
        email,
        password,
      }

      dispatch(register(userData))
    }
  

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1 className='dark:text-pink-500 text-3xl font-bold mb-4' >
          Register
        </h1>
     
      </section>

      <section className='form border-2 border-red-500 px-5 dark:bg-zinc-950 md:max-w-sm py-12 shadow-md shadow-rose-400 rounded-2xl'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='text'
              className='form-control dark:bg-black dark:text-white rounded-3xl dark:caret-white mb-8'
              id='name'
              name='name'
              value={name}
              placeholder='Enter your name'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='email'
              className='form-control dark:bg-black dark:text-white rounded-3xl dark:caret-white mb-8'
              id='email'
              name='email'
              value={email}
              placeholder='Enter your email'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control dark:bg-black dark:text-white rounded-3xl dark:caret-white mb-8'
              id='password'
              name='password'
              value={password}
              placeholder='Enter password'
              onChange={onChange}
            />
          </div>
         
          <div className='form-group'>
          <button type="submit" className="font-bold bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800  rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Sign Up</button>
          </div>

          <div>
           <p className='text-black font-semibold text-1xl dark:text-cyan-300'>Already have an account ? <Link to='/login' className='text-orange-500 font-extrabold '>LogIn</Link></p> 
          </div>
        </form>
      </section>
    </>
  )
}

export default Register

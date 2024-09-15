import axios from 'axios'

const registerRoute = "https://quiz-app-backend-black.vercel.app/user/register"


const loginRoute =    "https://quiz-app-backend-black.vercel.app/user/login"





// Register user
const register = async (userData) => {
  const response = await axios.post(registerRoute, userData)

 

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Login user
const login = async (userData) => {
  const response = await axios.post(loginRoute, userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Logout user
const logout = () => {
  localStorage.removeItem('user')
}

const authService = {
  register,
  logout,
  login,
}

export default authService

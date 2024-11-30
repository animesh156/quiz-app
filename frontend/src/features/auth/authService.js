import axios from 'axios'

const registerRoute = "https://quiz-app-backend-black.vercel.app/user/register"


const loginRoute =    "https://quiz-app-backend-black.vercel.app/user/login"





// Register user
const register = async (userData) => {
  const response = await axios.post(registerRoute, userData)

  return response.data
}

// Login user
const login = async (userData) => {
  const response = await axios.post(loginRoute, userData)

  return response.data
}

// Logout user
const logout = () => {
  return {};
}

const authService = {
  register,
  logout,
  login,
}

export default authService

import axios from "axios";

const API = axios.create({
  // baseURL: "https://quiz-app-backend-black.vercel.app", 

  baseURL: "http://localhost:4000/api", 

  withCredentials: true,
});

export default API;

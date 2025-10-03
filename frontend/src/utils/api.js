import axios from "axios";

const API = axios.create({
  baseURL: "https://quiz-app-backend-black.vercel.app",
  withCredentials: true,
});

export default API;
